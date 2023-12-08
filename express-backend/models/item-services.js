import itemModel from "./item.js";

async function getItems(ids) {
  let result;
  if (ids === undefined) {
    console.log("getItems provided with undefined id");
    result = null;
  } else if (ids !== undefined) {
    result = await findItemsById(ids);
  }
  return result;
}

async function getItem(id) {
  let result;
  if (id === undefined) {
    console.log("getItem provided with undefined id");
    result = null;
  } else if (id !== undefined) {
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
  const savedItem = await findItemById(id);
  if (savedItem === null || savedItem === undefined) {
    return addItem(item);
  }
  try {
    if (savedItem.quantity === item.quantity) {
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
    } else if (savedItem.quantity !== undefined) {
      const delta = item.quantity - savedItem.quantity;
      return await itemModel.updateOne(
        { _id: id },
        {
          $set: {
            name: item.name,
            food_type: item.food_type,
          },
          $inc: {
            quantity: delta,
          },
          $push: {
            delta_quantity: {
              $each: [delta],
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
  findItemsById,
  deleteItemById,
  addItem,
  updateItemById,
};
