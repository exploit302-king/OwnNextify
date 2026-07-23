import mongoose from 'mongoose';
import { MONGODB_CLOUD } from './config.js';

const dbConfig = () =>{
  mongoose.connect(MONGODB_CLOUD)
  .then(conn => console.log(`MongoDB database is successfully connected with ${conn.connection.host}`))
  .catch(err => console.log(`DB connection Failed ${err.message}` ))
}

export default dbConfig;