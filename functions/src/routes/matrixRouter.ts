import express from "express";
import { getClient } from "../db";
import Rule from "../models/Rule";

const matrixRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

// accessing the user suggested rules
matrixRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Rule>("holding_collection").find();
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

// adding a rule to the holding_collection collection in MongoDB
matrixRouter.post("/", async (req, res) => {
  const newRule: Rule = req.body;
  try {
    const client = await getClient();
    await client.db().collection<Rule>("holding_collection").insertOne(newRule);
    res.status(201).json(newRule);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default matrixRouter;
