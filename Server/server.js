import { app } from "./app.js";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`this server is running in the port ${process.env.PORT}`);
  connectDb();
});

