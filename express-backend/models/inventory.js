import mongoose from "mongoose";
const Schema = mongoose.Schema;

const InventorySchema = new Schema(
  {
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  { collection: "inventories" }
);

export default mongoose.model("Inventory", InventorySchema);
