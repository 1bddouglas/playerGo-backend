import express from "express";
import { getClient } from "../db";
import Rule from "../models/Rule";

const approvedRulesRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

// accessing approved rules for display
approvedRulesRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Rule>("approved_rules").find();
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

// adding an approved rule to the approved_rules
approvedRulesRouter.post("/", async (req, res) => {
  const newRule: Rule = req.body;
  try {
    const client = await getClient();
    await client.db().collection<Rule>("approved_rules").insertOne(newRule);
    res.status(201).json(newRule);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default approvedRulesRouter;
