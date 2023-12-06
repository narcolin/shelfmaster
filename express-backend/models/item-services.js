import itemModel from "./item.js";

async function getItems(ids) {
  let result;
  if (ids === undefined) {
    console.log("getItems provided with undefined id");
    result = null;
  } else if (ids) {
    result = await findItemsById(ids);
  }
  return result;
}

async function getItem(id) {
  let result;
  if (id === undefined) {
    console.log("getItem provided with undefined id");
    result = null;
  } else if (id) {
    result = await findItemById(id);
  }
  return result;
}

async function findItemById(id) {
  try {
    return await itemModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function findItemsById(ids) {
  try {
    return await itemModel.find({ _id: { $in: ids } });
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function deleteItemById(id) {
  try {
    return await itemModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addItem(item) {
  try {
    const itemToAdd = new itemModel(item);
    console.log(itemToAdd);
    const savedItem = itemToAdd.save();
    return savedItem;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateItemById(id, item) {
  // Update quantity by increasing to it. Tracking stats added, ensure
  // tracking keeps the 30 latest events
  try {
    if (item.quantity && item.quantity != 0) {
      return await itemModel.updateOne(
        { _id: id },
        {
          $set: {
            name: item.name,
            food_type: item.food_type,
          },
          $inc: {
            quantity: item.quantity,
          },
          $push: {
            delta_quantity: {
              $each: [item.quantity],
              $slice: -30,
            },
            dates_modified: {
              $each: [new Date()],
              $slice: -30,
            },
          },
        },
        { upsert: true, runValidators: true },
      );
    } else {
      return await itemModel.updateOne(
        { _id: id },
        {
          $set: {
            name: item.name,
            food_type: item.food_type,
          },
        },
        { upsert: true, runValidators: true },
      );
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export default {
  getItems,
  getItem,
  findItemById,
  deleteItemById,
  addItem,
  updateItemById,
};
