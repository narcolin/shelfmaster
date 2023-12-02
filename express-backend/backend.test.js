import dotenv from "dotenv";
import mongoose from "mongoose";
import userServices from "./models/user-services.js";
import inventoryServices from "./models/inventory-services.js";
import itemServices from "./models/item-services.js";

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

  afterAll(async () => {
    mongoose.disconnect();
  });
});
