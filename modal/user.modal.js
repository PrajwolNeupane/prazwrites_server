import mongoose from "mongoose";

const UserModal = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model.UserModal || mongoose.model("User", UserModal);
export default User;
