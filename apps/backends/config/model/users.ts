import mongoose, { Document, Schema, Model, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define the interface for the user document
interface IUser extends Document {
  userid: string;
  emailid: string;
  password: string;
  username: string;
  secret: string;
}

// Create the user schema
const userSchema: Schema<IUser> = new Schema({
  userid: { type: String, default: () => uuidv4() },
  emailid: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  secret: { type: String, required: true }
});

// Create the model using the schema and interface
const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
