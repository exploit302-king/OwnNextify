import schemaUser from "../models/auth.js";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import * as config from "../config/config.js"
import sendMail from "../helpers/sendMail.js";
import jwt from "jsonwebtoken";
import { uploadToS3 } from "../config/config.js";
import sendTokenAndUserResponse from "../helpers/sendTokenAndUser.js"
import validator from "email-validator"
import multer from "multer";

// Pre-signup for varifing the email by token

// Validation function for password
const isPasswordValid = (password) => {
  // Check password length
  if (password.length < 8 || password.length > 15) return false;

  // Check for at least one uppercase letter, one special character, and one numeric character
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
  return regex.test(password);
};

export const preSignup = async (req, res) => {
  try {

    // required fields
    const { email, password } = req.body;

    // if (!username){
    //   return res.json({ error: "Username is required" }) // Changed to 400
    // }
    if (!email) {
      return res.json({ error: "Email is required" }) // Changed to 400
    }

    if (!password) {
      return res.json({ error: "Password is required" }) // Changed to 400
    }

    if (!isPasswordValid(password)) {
      return res.json({
        error: "Password must be 8-15 chars, with 1 uppercase, 1 special char & 1 number.",
      })
    }

    // email should be unique
    const userExist = await schemaUser.findOne({ email });
    if (userExist) {
      return res.json({
        error: "email already exists, Please try with another email"
      })
    }

    //generate Token 
    const token = jwt.sign({ email, password }, config.JWT_SECRET,
      { expiresIn: '1h' });

    console.log(token);


    // send email with Token
    config.AWSSES.sendEmail(
      sendMail(
        email,
        "Email Verification link for account activation",
        `
        <h2> Email Verification link for account activation </h2>
        <p> Please varify your email address by clicking on the below link </p>
        
        Please click on the following link to verify your email:
        <a href="${config.CLIENT_URL}/auth/verify/${token}">Verify Email </a>
        
        Thanks,
        Nextify Team
        `
      ),
      (err, data) => {
        if (err) {
          console.error("Error sending Email:", err);
          return res.json({
            error: "Failed to send email, please try again later" + err,
            ok: false
          })
        }
        if (data) {
          res.json({
            ok: true,
            data,
            message: "Verification email sent successfully"
          })
        }
      }
    );
  } catch (error) {
    res.json({
      ok: false,
      message: "Srver Error",
      error: error.message
    });
  }
};


// SignUp, create a new account by decoded the given token 
export const signup = async (req, res) => {
  const authToken = req.body.token;

  if (!authToken) {
    return res.json({ ok: false, error: "Token is missing" });
  }
  try {
    // Decode token
    const { email, password } = jwt.verify(authToken, config.JWT_SECRET);
    console.log(email, password);

    // Check if email or password is missing after decoding
    if (!email || !password) {
      return res.json({ ok: false, error: "Token is invalid or missing required fields" });
    }

    // Check if the email already exists
    const userExist = await schemaUser.findOne({ email });
    if (userExist) {
      return res.json({
        error: "email already exists, Please try with another email"
      })
    }

    const hashedPassword = await hashPassword(password);
    /* create new user  */
    const newUser = await schemaUser({
      email,
      password: hashedPassword,
      username: nanoid(8),
    });
    await newUser.save();

    sendTokenAndUserResponse(req, res, newUser);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.json({ ok: false, error: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.json({ ok: false, error: "Token has expired" });
    }
    res.json({ ok: false, error: "Server Error: " + error.message });
  }
};


const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

// Login function to authenticate the user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.json({ error: "Email is required" });
    if (!validator.validate(email)) return res.json({ error: "Email format is incorrect" });
    if (!password) return res.json({ error: "Password is required" });

    if (!isPasswordValid(password)) {
      return res.json({
        error: "Password must be 8-15 characters, with at least 1 uppercase letter, 1 special character, and 1 number",
      });
    }

    const user = await schemaUser.findOne({ email });
    if (!user) {
      return res.json({ error: "User does not exist with the provided email" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.json({ error: "Invalid email or password" });
    }
    sendTokenAndUserResponse(req, res, user);
  } catch (error) {
    res.json({ ok: false, message: "Server Error", error: error.message });
  }
};

// Forget Password 
export const forgetPassword = async (req, res) => {
  try {
    // required fields
    const { email } = req.body;

    if (!email) {
      return res.json({ error: "Email is required" }); // Changed to 400
    }

    // email should be valid
    if (!validator.validate(email)) {
      return res.json({ error: "Invalid email format" });
    }

    // Check if user exists
    const userExist = await schemaUser.findOne({ email });
    if (!userExist) {
      return res.json({
        error: "Email not registered. Please check and try again."
      });
    }

    const resetPasswordCode = nanoid(15)
    userExist.resetPasswordCode = resetPasswordCode;
    userExist.save();
    // Generate Reset Token 
    const resetToken = jwt.sign({ resetPasswordCode }, config.JWT_SECRET, { expiresIn: '1h' });

    console.log(resetToken);

    // send email with reset token
    config.AWSSES.sendEmail(
      sendMail(
        email,
        "Password Reset Request",
        `
        <h2>Password Reset Request</h2>
        <p>If you requested a password reset, please click the link below:</p>
        <a href="${config.CLIENT_URL}/auth/access/${resetToken}">Reset Password Code</a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thanks,<br>Nextify Team</p>
        `
      ),
      (err, data) => {
        if (err) {
          console.error("Error sending email:", err);
          return res.json({
            error: "Failed to send email. Please try again later.",
            ok: false
          });
        }

        if (data) {
          res.json({
            ok: true,
            message: "Password reset email sent successfully."
          });
        }
      }
    );
  } catch (error) {
    res.json({
      ok: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// Access Acount
export const accessAccount = async (req, res) => {
  try {
    const { resetPasswordCode } = jwt.verify(req.body.resetCode, config.JWT_SECRET)

    console.log(resetPasswordCode)
    const user = await schemaUser.findOneAndUpdate(
      { resetPasswordCode },
      { resetPasswordCode: ' ' })

    console.log(user)

    if (!user) {
      return res.json({ error: "No user found or reset code is expired" });
    }
    sendTokenAndUserResponse(req, res, user)


  } catch (error) {
    res.json({
      ok: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// Reset Password 
export const resetPassword = async (req, res) => {
  try {
    // Destructure new password and reset token (resetCode) from the request body
    const { resetCode, newPassword } = req.body;

    // Validate the new password
    if (!newPassword || newPassword.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }

    // Check if resetCode is provided
    if (!resetCode) {
      return res.json({ error: "Reset code must be provided" });
    }

    // Verify the reset token and extract the resetPasswordCode
    let decoded;
    try {
      decoded = jwt.verify(resetCode, config.JWT_SECRET); // Verify the JWT token
    } catch (err) {
      return res.json({ error: "Invalid or expired reset code" }); // Handle invalid or expired token
    }

    // Extract resetPasswordCode from the decoded token
    const { resetPasswordCode } = decoded;

    // Find the user by resetPasswordCode
    const user = await schemaUserUser.findOne({ resetPasswordCode });
    if (!user) {
      return res.json({ error: "Invalid reset code or token expired" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the user's password and clear the reset passcode
    user.password = hashedPassword;
    user.resetPasswordCode = ''; // Remove the reset passcode after successful password update
    await user.save(); // Save the user with the new password

    // Send success response with a message
    res.json({
      message: "Password updated successfully. You can now login with your new password.",
    });

  } catch (error) {
    console.error("Server error during resetPassword:", error);
    res.status(500).json({
      ok: false,
      message: "Server Error",
      error: error.message,
    });
  }
};





// Protected apis -----> secured by email and password

// Fetch logged user ------> GET
export const fetchLoggedUser = async (req, res) => {
  try {
    // const { email } = req.user;
    const user = await schemaUser.findById(req.user.id);
    if (!user) {
      return res.json({
        ok: false,
        error: "You are not loggedIn"
      });
    }
    sendTokenAndUserResponse(req, res, user);

  } catch (error) {
    res.json({
      ok: false,
      error: error.message
    });
  }
}

// Fetch user profile bu username -----> GET //
export const profile = async () => {
  try {

  } catch (error) {
    res.json({
      ok: false,
      error: error.message
    })
  }
}

// Update user Profile ------> PUT //
export const updateProfile = async (req, res) => {
  try {
    const { name, age, phone, email, address, company } = req.body;

    const updatedUser = await schemaUser.findByIdAndUpdate(
      req.user.id,
      {
        name,
        age,
        phone,
        email,
        address,
        company,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

// Change Password
export const changepassword = async (req, res) => {

  try {
    const { email, oldPassword, newPassword } = req.body;
    // Check if both old and new passwords are provided
    if (!oldPassword) {
      return res.json({ message: ' Please enter your old password' });
    }
    if (!newPassword) {
      return res.json({ message: ' Please enter your new password ' });
    }

    //email
    const user = await schemaUser.findOne({ email });

    if (!user) {
      return res.json({ message: 'User not found' });
    }

    // Check if old password matches the current password in the database
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordCorrect) {
      return res.json({ message: 'Old password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    user.password = hashedPassword;
    await user.save();

    return res.json({
      newPassword,
      message: 'Password successfully changed'
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: 'Server error. Could not change password' + err.message,
      error: err.message
    });
  }
};

// Upload Profile Image AWS S3 Simple Storage System: Bucket PUT
export const uploadProfileImage = async (req, res) => {
  try {

    if (!req.file) {
      return res.json({ message: 'No file uploaded' });
    }
    const imageUrl = await uploadToS3(req.file);
    // Save image URL in MongoDB
    const updatedUser = await schemaUser.findByIdAndUpdate(
      req.user.id,
      { profileImage: imageUrl },
      { new: true }
    );
    res.json({
      success: 'Profile image uploaded successfully!',
      imageUrl,
      user: updatedUser,
    });

  } catch (error) {
    console.error(error);
    res.json({
      message: 'Error uploading profile image',
      error: error.message,
    });
  }
};

// Delete User DELETE Profile Image

export const deleteProfileImage = async () => {
  try {

  } catch (error) {
    res.json({
      ok: false,
      error: error.message
    })
  }
}



// Protected Routes en