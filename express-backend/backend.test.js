import dotenv from "dotenv";
import mongoose from "mongoose";
import userServices from "./models/user-services.js";
import inventoryServices from "./models/inventory-services.js";
import itemServices from "./models/item-services.js";
import inventoryModel from "./models/inventory.js";
import itemModel from "./models/item.js";
import { expect, jest, test } from "@jest/globals";

dotenv.config();

describe("Connection", () => {
  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://" +
        process.env.MONGO_USER +
        ":" +
        process.env.MONGO_PWD +
        "@" +
        process.env.MONGO_CLUSTER +
        "/" +
        process.env.MONGO_DB +
        "?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
  });

  test("get inventoryId from userId", async () => {
    const uid = "02b7d18f-06b0-426f-8a9b-5ddb3849355c";
    const inventoryId = "65569d94cd78afe344355f15";
    const result = await userServices.getUsers(uid);

    expect(result["inventory"].toString()).toBe(inventoryId);
  });

  test("get itemIds from inventoryId", async () => {
    const inventoryId = "65569d94cd78afe344355f15";
    const itemIds = [
      "65569deacd78afe344355f1c",
      "65569deacd78afe344355f1c",
      "6556a76bcd78afe344355f31",
    ];
    const result = await inventoryServices.getItemsIds(inventoryId);

    expect(
      result["items"].map((id) => {
        return id.toString();
      }),
    ).toEqual(itemIds);
  });

  test("get itemIds with no inventoryId", async () => {
    const inventoryId = undefined;
    const result = await inventoryServices.getItemsIds(inventoryId);

    expect(Array.isArray(result)).toBe(true);
  });

  test("get items from itemIds", async () => {
    const itemIds = [
      "65569deacd78afe344355f1c",
      "65569deacd78afe344355f1c",
      "6556a76bcd78afe344355f31",
    ];
    const result = await itemServices.getItems(itemIds);

    expect(result[0].name).toBe("cake");
    expect(result[0].quantity).toBe(7414);
    expect(result[0].food_type).toBe("dessert");
    expect(result[0].delta_quantity).toEqual([4, 1, -1, 7410]);
    expect(result[1].name).toBe("steak");
    expect(result[1].quantity).toBe(5);
    expect(result[1].food_type).toBe("protein");
    expect(result[1].delta_quantity).toEqual([5]);
  });

  test("add user non-UID -- will fail", async () => {
    const user = { _id: "123abc" };
    const result = await userServices.addUser(user);

    expect(result).toBeFalsy();
  });

  test("add item negative quantity -- will fail", async () => {
    const item = {
      name: "test-item",
      quantity: -1,
    };

    try {
      await itemServices.addItem(item);
    } catch (error) {
      console.log(error);
      expect(error.toString()).toMatch("ValidationError");
    }
  });

  test("most recent 30 logs items", async () => {
    const item = {
      name: "test-item",
      quantity: 0,
    };
    const savedItem = await itemServices.addItem(item);
    for (let i = 0; i < 30; i++) {
      item.quantity += 1;
      await itemServices.updateItemById(savedItem["_id"], item);
    }
    const result = await itemServices.getItem(savedItem["_id"]);
    const first_date = result.dates_modified[0];
    const first_quantity = result.delta_quantity[0];

    await itemServices.updateItemById(savedItem["_id"], item);
    const result2 = await itemServices.getItem(savedItem["_id"]);
    await itemServices.deleteItemById(savedItem["_id"]);

    expect(result.quantity).toBe(465);
    expect(result.delta_quantity.length).toBe(30);
    expect(result.dates_modified.length).toBe(30);
    expect(result2.quantity).toBe(495);
    expect(result2.delta_quantity.length).toBe(30);
    expect(result2.dates_modified.length).toBe(30);
    expect(result2.delta_quantity).not.toContain(first_quantity);
    expect(result2.dates_modified).not.toContain(first_date);
  });

  test("addInventory: handle errors", async () => {
    const mockedError = new Error("Mocked error");
    jest.spyOn(inventoryModel.prototype, "save").mockImplementationOnce(() => {
      throw mockedError;
    });

    const result = await inventoryServices.addInventory();
    expect(result).toBeFalsy();

    jest.restoreAllMocks();
  });

  test("addItemIdToInventory", async () => {
    const savedInventory = await inventoryServices.addInventory();
    const item = await itemServices.addItem({
      name: "test",
      quantity: 1,
      food_type: "test",
    });

    const result = await inventoryServices.addItemIdToInventory(
      savedInventory._id,
      item._id,
    );

    expect(result.modifiedCount).toBe(1);
  });

  test("addItemIdToInventory: handle errors", async () => {
    const mockedError = new Error("Mocked error");
    jest.spyOn(inventoryModel, "updateOne").mockImplementationOnce(() => {
      throw mockedError;
    });

    const result = await inventoryServices.addItemIdToInventory();
    expect(result).toBeFalsy();

    jest.restoreAllMocks();
  });

  test("removeItemIdFromInventory", async () => {
    const savedInventory = await inventoryServices.addInventory();
    const item = await itemServices.addItem({
      name: "test",
      quantity: 1,
      food_type: "test",
    });

    await inventoryServices.addItemIdToInventory(savedInventory._id, item._id);
    const result = await inventoryServices.removeItemIdFromInventory(
      savedInventory._id,
      item._id,
    );

    const updatedInventory = await inventoryModel.findById(savedInventory._id);
    expect(result.modifiedCount).toBe(1);
    expect(updatedInventory.items).not.toContainEqual(item._id);
  });

  test("removeItemIdFromInventory: handle errors", async () => {
    const mockedError = new Error("Mocked error");
    jest.spyOn(inventoryModel, "updateOne").mockImplementationOnce(() => {
      throw mockedError;
    });

    const result = await inventoryServices.removeItemIdFromInventory();
    expect(result).toBeFalsy();

    jest.restoreAllMocks();
  });

  test("deleteInventoryById", async () => {
    const savedInventory = await inventoryServices.addInventory();

    const result = await inventoryServices.deleteInventoryById(
      savedInventory._id,
    );

    const getInventory = await inventoryServices.findInventoryById(
      savedInventory._id,
    );
    expect(result._id).toEqual(savedInventory._id);
    expect(getInventory).toBeNull();
  });

  test("deleteInventoryById: handle errors", async () => {
    const mockedError = new Error("Mocked error");
    jest
      .spyOn(inventoryModel, "findByIdAndDelete")
      .mockImplementationOnce(() => {
        throw mockedError;
      });

    const result = await inventoryServices.deleteInventoryById();
    expect(result).toBeUndefined();

    jest.restoreAllMocks();
  });

  test("getItems with no itemId", async () => {
    const itemId = undefined;
    const result = await itemServices.getItems(itemId);

    expect(result).toBeNull();
  });

  test("getItem with no itemId", async () => {
    const itemId = undefined;
    const result = await itemServices.getItem(itemId);

    expect(result).toBeNull();
  });

  test("findItemById: handle errors", async () => {
    const mockedError = new Error("Mocked error");
    jest.spyOn(itemModel, "findById").mockImplementationOnce(() => {
      throw mockedError;
    });

    const result = await itemServices.findItemById();
    expect(result).toBeUndefined();

    jest.restoreAllMocks();
  });

  test("findItemsById: handle errors", async () => {
    const mockedError = new Error("Mocked error");
    jest.spyOn(itemModel, "find").mockImplementationOnce(() => {
      throw mockedError;
    });

    const result = await itemServices.findItemsById();
    expect(result).toBeUndefined();

    jest.restoreAllMocks();
  });

  test("deleteItemById: handle errors", async () => {
    const mockedError = new Error("Mocked error");
    jest.spyOn(itemModel, "findByIdAndDelete").mockImplementationOnce(() => {
      throw mockedError;
    });

    const result = await itemServices.deleteItemById();
    expect(result).toBeUndefined();

    jest.restoreAllMocks();
  });

  test("addItem: handle errors", async () => {
    const mockedError = new Error("Mocked error");
    jest.spyOn(itemModel.prototype, "save").mockImplementationOnce(() => {
      throw mockedError;
    });

    const result = await itemServices.addItem();
    expect(result).toBeFalsy();

    jest.restoreAllMocks();
  });

  test("updateItemById new item", async () => {
    const savedInventory = await inventoryServices.addInventory();
    const item = {
      name: "test",
      quantity: 1,
      food_type: "test",
    };

    // using inventory id in place of item id cause it generates a unique id
    await itemServices.updateItemById(savedInventory._id, item);

    const result = await inventoryServices.findInventoryById(
      savedInventory._id,
    );

    expect(result.item).toEqual(item._id);
  });

  test("updateItemById existing item with same quantity", async () => {
    const item = await itemServices.addItem({
      name: "test",
      quantity: 1,
      food_type: "test",
    });
    const updatedItem = {
      name: "test",
      quantity: 1,
      food_type: "test2",
    };

    await itemServices.updateItemById(item._id, updatedItem);

    const result = await itemServices.findItemById(item._id);

    expect(result.quantity).toEqual(1);
    expect(result.food_type).toEqual("test2");
  });

  test("updateItemById same quantity: handle errors", async () => {
    const mockedError = new Error("Mocked error");
    jest.spyOn(itemModel, "updateOne").mockImplementationOnce(() => {
      throw mockedError;
    });

    const item = await itemServices.addItem({
      name: "test",
      quantity: 1,
      food_type: "test",
    });
    const updatedItem = {
      name: "test",
      quantity: 1,
      food_type: "test2",
    };

    await itemServices.updateItemById(item._id, updatedItem);

    const result = await itemServices.findItemById(item._id);

    expect(result).toBeDefined();

    jest.restoreAllMocks();
  });

  test("updateItemById existing item with new quantity", async () => {
    const item = await itemServices.addItem({
      name: "test",
      quantity: 1,
      food_type: "test",
    });
    const updatedItem = {
      name: "test",
      quantity: 3,
      food_type: "test",
    };

    await itemServices.updateItemById(item._id, updatedItem);

    const result = await itemServices.findItemById(item._id);

    expect(result.quantity).toEqual(3);
  });

  test("updateItemById new quantity: handle errors", async () => {
    const mockedError = new Error("Mocked error");
    jest.spyOn(itemModel, "updateOne").mockImplementationOnce(() => {
      throw mockedError;
    });

    const item = await itemServices.addItem({
      name: "test",
      quantity: 1,
      food_type: "test",
    });
    const updatedItem = {
      name: "test",
      quantity: 3,
      food_type: "test",
    };

    await itemServices.updateItemById(item._id, updatedItem);

    const result = await itemServices.findItemById(item._id);

    expect(result).toBeDefined();

    jest.restoreAllMocks();
  });

  afterAll(async () => {
    mongoose.disconnect();
  });
});
