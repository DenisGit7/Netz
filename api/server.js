// require("dotenv").config();
import {} from "dotenv/config";
import express from "express";
import cors from "cors";
import uploadRoute from "./routes/uploadRoute.js";
import getListRoute from "./routes/getListRoute.js";
import removeRoute from "./routes/removeRoute.js";
import downloadRoute from "./routes/downloadRoute.js";

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

// // Multer setup
// const storage = multer.memoryStorage(); // Using memory storage for req.body
// const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Account Manager App");
});

app.use("/files/upload", uploadRoute);
app.use("/files/getlist", getListRoute);
app.use("/files/remove", removeRoute);
app.use("/files/download", downloadRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
