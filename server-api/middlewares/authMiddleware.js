import jwt from "jsonwebtoken";
import * as config from "../config/config.js"
import schemaUser from "../models/auth.js";

export const requiredLoggedIn = (req, res, next) => {
  try {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.json({
        ok: false,
        message: "Unauthorized Access",
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {

    return res.json({
      ok: false,
      message: "Invalid or Expired Token",
    });

  }
};

export const isAdmin = async (req, res, next) => {
  try {

    const user = await schemaUser.findById(req.user.id);

    if (!user) {
      return res.json({
        ok: false,
        message: "User not found",
      });
    }

    if (!user.role.includes("admin")) {
      return res.json({
        ok: false,
        message: "Admin Access Required",
      });
    }

    next();

  } catch (error) {

    return res.json({
      ok: false,
      message: error.message,
    });

  }
};

export const requiredSellerOrAdmin = (req, res, next) => {
  if (
    req.user?.role?.includes("seller") ||
    req.user?.role?.includes("admin")
  ) {
    return next();
  }

  return res.status(403).json({
    ok: false,
    message: "Only Seller or Admin can perform this action.",
  });
};