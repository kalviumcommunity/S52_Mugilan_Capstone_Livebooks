import express from "express";
export const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./router.js";
import ErrorMiddleware from "./middlewar/Error.js";

dotenv.config();

// body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.json());
app.use(cors());

// cookies parser
app.use(cookieParser());

// using cors for our http request

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);
app.use("/api", routes);

// test the routes

app.get("/test", (req, res) => {
  res.status(200).send("API was Working");
});

app.all("*", (req, res) => {
  res.status(404).send(`route${req.originalUrl} was not found`);
});

app.use(ErrorMiddleware);
