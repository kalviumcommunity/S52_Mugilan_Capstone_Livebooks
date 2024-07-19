import express from "express";
export const app = express();
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import Userroutes from "./routes/router.js";
import ErrorMiddleware from "./middlewar/Error.js";
import Courserouter from "./routes/cource.routes.js";
import orderRouter from "./routes/order.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import layoutRoutes from "./routes/layout.router.js";
import calenderEventRoute from "./routes/calender.routes.js"; 
// body parser

const allowedOrigins = [
  process.env.ORIGIN,
  process.env.ORIGIN2
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());



// cookies parser
app.use(cookieParser());

// using cors for our http request


app.use("/api/v1",Courserouter, orderRouter, Userroutes, notificationRoutes, analyticsRoutes, layoutRoutes, calenderEventRoute);

// test the routes

app.get("/test", (req, res) => {
  res.status(200).send("API was Working");
});

app.all("*", (req, res) => {
  res.status(404).send(`route${req.originalUrl} was not found`);
});

app.use(ErrorMiddleware);
