require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileUpload");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//config env

require("dotenv").config({
  path: "env/.env",
});

//router

app.use("/user", require("./routes/userRouter"));

//connect to mongodb

const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

app.use("/", (req, res, next) => {
  res.json({ msg: "Hello I'm Nudo Dev" });
});

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
