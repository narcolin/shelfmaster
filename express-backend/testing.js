import dotenv from "dotenv";
import mongoose from "mongoose";
import userServices from "./models/user-services.js";
import inventoryServices from "./models/inventory-services.js";
import itemServices from "./models/item-services.js";
import inventoryModel from "./models/inventory.js";

const inventoryId = "65569d94cd78afe344355f15";
const itemIds = [
  "65569deacd78afe344355f1c",
  "65569deacd78afe344355f1c",
  "6556a76bcd78afe344355f31",
];
const result = await inventoryServices.getItemsIds(inventoryId);

console.log(result);

const inventoryId2 = undefined;
const result2 = await inventoryServices.getItemsIds(inventoryId2);
console.log(result2);
