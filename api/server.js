// require("dotenv").config();
import {} from "dotenv/config";
import express from "express";
import cors from "cors";
import uploadRoute from "./routes/uploadRoute.js";
import getListRoute from "./routes/getListRoute.js";
import removeRoute from "./routes/removeRoute.js";
import downloadRoute from "./routes/downloadRoute.js";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";
import logoutRoute from "./routes/logoutRoute.js";
import refreshRoute from "./routes/refreshRoute.js";
import usersRoute from "./routes/usersRoute.js";
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.js";

import { jwtVerification } from "./middleware/jwtVerfications.js";

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Account Manager App");
});

app.use("/users/register", registerRoute);
app.use("/users/login", loginRoute);
app.use("/users/logout", logoutRoute);

app.use(jwtVerification);
app.use("/files/upload", uploadRoute);
app.use("/files/getlist", getListRoute);
app.use("/files/remove", removeRoute);
app.use("/files/download", downloadRoute);
app.use("/users/refresh", refreshRoute);
app.use("/customers", usersRoute);

async function start() {
  console.log("connecting...");

  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
