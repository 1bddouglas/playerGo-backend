import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import matrixRouter from "./routes/matrixRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/matrix", matrixRouter);
export const api = functions.https.onRequest(app);
