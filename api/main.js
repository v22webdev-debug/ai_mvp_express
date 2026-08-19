import express from "express";
import cors from "cors";
import promptRoutes from "./router/promptRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL;
const port = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

console.log("starting servers");

app.use("/api", promptRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});