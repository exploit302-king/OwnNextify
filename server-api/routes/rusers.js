import express from 'express';

const authRoute = express.Router();

// import the controllers 
import * as auth from '../controllers/cusers.js'
import { requiredLoggedIn } from '../middlewares/authMiddleware.js';

// combination of endPoints in 1 route // end-point    method  controller
authRoute.route("/pre-signup").post(auth.preSignup)
authRoute.route("/signup").post(auth.signup)
authRoute.route("/login").post(auth.loginUser)
authRoute.route("/forget-password").post(auth.forgetPassword)
authRoute.route("/access-account").post(auth.accessAccount)

// protected Routes
authRoute.route("/fetch-logged-user").get(requiredLoggedIn, auth.fetchLoggedUser)
authRoute.route("/username").get(requiredLoggedIn, auth.profile)
authRoute.route("/reset-password").post(requiredLoggedIn, auth.resetPassword)
authRoute.route("/changepassword").post(auth.changepassword)
authRoute.route("/update-profile").put(requiredLoggedIn, auth.updateProfile)
authRoute.route("/upload-image").put(requiredLoggedIn, auth.uploadProfileImage)
authRoute.route("/delete-image").put(requiredLoggedIn, auth.deleteProfileImage)



export default authRoute;
