import mongoose, { Document, Schema, Model, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define the interface for the user document
interface IUser extends Document {
  userid:String
  emailid: string;
  password: string;
  upiid:{type:String,unique:true,required:true};
  
  secret: string;
}

// Create the user schema
const userSchema: Schema<IUser> = new Schema({
 userid: { type: String, unique: true, default: uuidv4() }, // Generate a new UUID for the user ID
  emailid: { type: String, required: true },
  password: { type: String, required: true },
  upiid: { type: String, unique: true, required: true }, 
  
  secret: { type: String, required: true }
});

// Create the model using the schema and interface
const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
