import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: "UUID",
      required: true,
    },
    name: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { collection: "users_list" },
);

export default mongoose.model("User", UserSchema);
