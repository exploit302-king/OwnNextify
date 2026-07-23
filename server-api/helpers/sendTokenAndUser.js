import jwt from "jsonwebtoken";
import * as config from "../config/config.js";


const sendTokenAndUserResponse = (req, res, user) =>{
  try {

    const token = jwt.sign( { id:user._id }, config.JWT_SECRET, {expiresIn:'4h'}  )

    const refreshToken = jwt.sign( { id:user._id }, config.JWT_SECRET, {expiresIn:'1w'}  )

    user.password = user.resetPasswordCode = undefined;
    user.resetPasswordCode

    res.json({
      user,
      token,
      refreshToken,
    })

  } catch (error) {
    res.status(500).json({error: "Server error in generating JWT" })
  }
}

export default sendTokenAndUserResponse;