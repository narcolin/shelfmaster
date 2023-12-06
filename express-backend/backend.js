import express from "express";
import cors from "cors";

import userServices from "./models/user-services.js";
import inventoryServices from "./models/inventory-services.js";
import itemServices from "./models/item-services.js";
import { router as recipe_router } from "./models/recipes.js";

const app = express();
const APP_VERSION = "1.0.0";
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/recipes", recipe_router);

app.get("/users", async (req, res) => {
  const id = req.query["id"];
  const name = req.query["name"];
  try {
    const result = await userServices.getUsers(id, name);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ users_list: result });
  }
});

app.post("/users", async (req, res) => {
  const user = req.body;
  const savedUser = await userServices.addUser(user);
  if (savedUser) res.status(201).send(savedUser);
  else res.status(500).end();
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params["id"]; //or req.params.id
  const result = await userServices.deleteUserById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.status(204).end();
  }
});

app.get("/inventories/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await inventoryServices.findInventoryById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ inventories: result });
  }
});

app.patch("/inventories/:id", async (req, res) => {
  console.log("test1");
  console.log(req.body.data);
  const id = req.params["id"];
  const item_id = req.body.data;
  const result = await inventoryServices.addItemIdToInventory(id, item_id);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).end();
  }
});

app.delete("/inventories/:id", async (req, res) => {
  const id = req.params["id"]; //or req.params.id
  const result = await inventoryServices.deleteInvetoryById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.status(204).end();
  }
});

app.get("/items/", async (req, res) => {
  // List of all items from an inventoryId
  const inventoryId = req.query["inventoryId"];
  const inventory = await inventoryServices.findInventoryById(inventoryId);
  if (inventory === undefined || inventory === null) {
    res.status(404).send("Resource not found.");
  } else {
    try {
      const itemIds = inventory.items;
      console.log(inventory);
      console.log(itemIds);
      const result = await itemServices.getItems(itemIds);
      res.send({ inventory: result });
    } catch (error) {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    }
  }
});

app.get("/items/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await itemServices.findItemById(id);
  if (result === undefined || result === null) {
    res.status(404).send("Resource not found.");
  } else {
    res.send({ item: result });
  }
});

app.post("/items/", async (req, res) => {
  // For creating new item. Call PATCH /inventories/:id with the returned item in body
  const item = req.body;
  const savedItem = await itemServices.addItem(item);
  if (savedItem) res.status(201).send(savedItem);
  else res.status(500).end();
});

app.patch("/items/:id", async (req, res) => {
  // For updating an item
  console.log("test2");
  console.log(req.body);
  const id = req.params["id"];
  const item = req.body;
  const result = await itemServices.updateItemById(id, item);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(500).end();
  }
});

app.delete("/items/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await itemServices.deleteItemById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.status(204).end();
  }
});

app.listen(process.env.PORT || port, () => {
  if (process.env.PORT) {
    console.log(
      `REST API Version ${APP_VERSION} is listening with process.env.PORT on port: ${process.env.PORT}.`,
    );
  } else {
    console.log(
      `REST API Version ${APP_VERSION} is listening on port: ${port}.`,
    );
  }
});
