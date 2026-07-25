import jwt from "jsonwebtoken";
import * as config from "../config/config.js"

export const requiredLoggedIn = (req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, config.JWT_SECRET);
  if (!decoded) {
    return res.json({
      error: "Unauthorized Access "
    })
  }
  req.user = decoded;
  next();
  try {

  } catch (error) {
    return res.json({
      error: "invalid Signature  "
    })
  }
}