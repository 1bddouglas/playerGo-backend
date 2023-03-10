import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import matrixRouter from "./routes/matrixRouter";
import approvedRulesRouter from "./routes/approvedRulesRouter";
import deniedRulesRouter from "./routes/deniedRulesRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/matrix", matrixRouter);
app.use("/approved", approvedRulesRouter);
app.use("/denied", deniedRulesRouter);
export const api = functions.https.onRequest(app);
