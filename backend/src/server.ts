import express from "express";
import "express-async-errors";
import cors from "cors";
import "./database/connection";
import routes from "./routes";
import path from "path";
import errorHandler from "./errors/handler";

const app = express();

const corsOpt = {
  exposedHeaders: "authorization-token",
};

app.use(cors(corsOpt));
app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(errorHandler);
app.listen(3333);
