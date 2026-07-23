import mongoose from "mongoose";

const { model, Schema, ObjectId } = mongoose;

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    default: ""
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: [String],
    default: "buyer",
    enum: ["seller", "buyer", "admin"]
  },
  profilePic:{},
  isAdmin: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: true
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    default: "dummy address"
  },
  age:{
    type:Number,
    default: 21
  },
  phone: {
    type: String,
    default: "XXX-XXXXXXXX"
  },
  company:{
    type: String,
    default: "dummy company"
  },

  resetPasswordCode:{ }
  
}, { timestamps: true });

const schemaUser = model("user", userSchema);

export default schemaUser;