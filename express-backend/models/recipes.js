import { config } from "dotenv";
import axios from "axios";
import express from "express";

config();

const router = express.Router();

router.post("/recommend", async (req, res) => {
  const { ingredients } = req.body;
  const options = {
    method: "GET",
    url: "https://tasty.p.rapidapi.com/recipes/list",
    params: {
      from: "0",
      size: "20",
      q: ingredients,
    },
    headers: {
      "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.X_RAPIDAPI_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    res.send({ recommendations: response.data });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

export { router };
