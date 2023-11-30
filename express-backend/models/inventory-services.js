import inventoryModel from "./inventory.js";

async function getItemsIds(id) {
  let result;
  if (id === undefined) {
    result = await inventoryModel.find();
  } else if (id) {
    result = await findInventoryById(id);
  }
  return result;
}

async function addInventory() {
  try {
    const inventoryToAdd = new inventoryModel();
    const savedInventory = await inventoryToAdd.save();
    return savedInventory;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addItemIdToInventory(id, item_id) {
  try {
    return await inventoryModel.updateOne(
      { _id: id },
      {
        $push: {
          items: item_id,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteInvetoryById(id) {
  try {
    return await inventoryModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function findInventoryById(id) {
  return await inventoryModel.findOne({ _id: id });
}

export default {
  getItemsIds,
  addInventory,
  addItemIdToInventory,
  deleteInvetoryById,
  findInventoryById,
};
