import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
  dark_theme: { type: Boolean, default: false },
  profile_picture: { data: Buffer, contentType: String },
  hide_presence: { type: Boolean, default: false },
});

export default mongoose.model("Settings", SettingsSchema);
