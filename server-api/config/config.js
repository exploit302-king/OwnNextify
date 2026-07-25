import SES from "aws-sdk/clients/ses.js";
import S3 from "aws-sdk/clients/s3.js"; // Add S3
// import { S3 } from "aws-sdk"; // Corrected import for S3
import multer from "multer";
import path from "path";
import dotenv from "dotenv";

dotenv.config( );

const SES_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID ;
const SES_SECRET_ACCESS_KEY_ID = process.env.AWS_SECRET_ACCESS_KEY;
const SES_REGION = 'eu-north-1';
const SES_VERSION = "2010-12-01";
export const SES_SENDER_EMAIL = '"Exploit King" <modudmasood111@gmail.com>';
export const CLIENT_URL = 'http://localhost:5173';
// const SES_RECIEVER_EMAIL = "modudmasood143@gmail.com"

const awsConfig = {
  accessKeyId: SES_ACCESS_KEY_ID,
  secretAccessKey: SES_SECRET_ACCESS_KEY_ID,
  region: SES_REGION,
  version: SES_VERSION,
};
export const AWSSES = new SES(awsConfig);
export const PORT = 8080;



const S3_BUCKET_NAME = "modud-assets"; // Replace with your bucket name
const S3_REGION = "eu-north-1"; // Replace with your bucket's region
export const S3_CONFIG = {
  accessKeyId: SES_ACCESS_KEY_ID, // Same access key
  secretAccessKey: SES_SECRET_ACCESS_KEY_ID, // Same secret key
  region: S3_REGION,
};

export const S3_BUCKET = new S3(S3_CONFIG);
const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Set limit to 5 MB
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(file.mimetype);
    if (extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'));
    }
  }
});

// Updated S3 upload logic: function to handle file uploads asynchronously
export const uploadToS3 = async (file) => {
  try {
    const params = {
      Bucket: S3_BUCKET_NAME, // Your S3 bucket name from config
      Key: `${Date.now()}-${file.originalname}`, // Fixed template literal syntax
      Body: file.buffer, // File content
      ContentType: file.mimetype, // File MIME type
      // ACL: 'public-read',  // Ensure image is publicly accessible
    };

    // Upload image to S3
    const s3Response = await S3_BUCKET.upload(params).promise(); // Corrected to S3_BUCKET
    return s3Response.Location; // Return the image URL after successful upload
  } catch (error) {
    throw new Error('S3 upload failed: ' + error.message);
  }
};

// Delete S3 upload images 
export const deleteFromS3 = async (imageUrl) => {
  try {

    if (!imageUrl) return;

    const imageKey = imageUrl.split("/").pop();

    await S3_BUCKET.deleteObject({
      Bucket: "modud-assets",
      Key: imageKey,
    }).promise();

  } catch (error) {
    throw new Error("S3 Delete Failed : " + error.message);
  }
};

// MONGODB_Compass
export const MONGODB_CLOUD = process.env.MONGODB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
