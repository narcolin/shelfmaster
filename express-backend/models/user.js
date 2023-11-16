import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
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
    settings: {
      type: Schema.Types.ObjectId,
      ref: "Settings",
    },
    inventory: {
      type: Schema.Types.ObjectId,
      ref: "Inventory",
    },
  },
  { collection: "users_list" },
);

export default mongoose.model("User", UserSchema);
