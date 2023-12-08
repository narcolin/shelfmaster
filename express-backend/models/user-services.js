import mongoose from "mongoose";
import userModel from "./user.js";
import inventoryServices from "./inventory-services.js";

import dotenv from "dotenv";

dotenv.config();

// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);
// console.log(">>mongo cluster: " + process.env.MONGO_CLUSTER);
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    // "mongodb://localhost:27017/users",
    {
      useNewUrlParser: true, //useFindAndModify: false,
      useUnifiedTopology: true,
    },
  )
  .catch((error) => console.log(error));

async function getUsers(id, name) {
  let result;
  if (id === undefined && name === undefined) {
    result = await userModel.find();
  } else if (id && !name) {
    result = await findUserById(id);
  } else if (name && !id) {
    result = await findUserByName(name);
  } else if (name && id) {
    result = await findUserByIdAndName(id, name);
  }
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  const newInventory = await inventoryServices.addInventory();
  try {
    if (newInventory === false) {
      throw new Error("New inventory couldn't be added.");
    }
    const userToAdd = new userModel(user);
    userToAdd.inventory = newInventory._id;
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    if (error.message !== "New inventory couldn't be added.") {
      await inventoryServices.deleteInventoryById(newInventory._id);
    }
    return false;
  }
}

async function deleteUserById(id) {
  try {
    return await userModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function findUserByName(name) {
  return await userModel.find({ name: name });
}

async function findUserByJob(job) {
  return await userModel.find({ job: job });
}

async function findUserByIdAndName(id, name) {
  return await userModel.find({ _id: id, name: name });
}

// async function disconnectDB() {
//   await mongoose.connection.close();
//   await mongoose.disconnect();
// }

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById,
};

// exports.disconnectDB = disconnectDB;
