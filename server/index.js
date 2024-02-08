const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/database");
const UserRouter = require("./routers/UserRoute");
const PostRouter = require("./routers/PostRoute");
const CommentRouter = require("./routers/CommentRouter");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

connectDB();

const localhost = "http://localhost:5173";
const deployed = "https://social-earist-forum.vercel.app";

app.use(express.json());
app.use(
  cors({
    origin: deployed,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/", UserRouter);
app.use("/", PostRouter);
app.use("/", CommentRouter);

const PORT = 4200;
app.listen(PORT, () => {
  console.log(`Server opened at PORT:${PORT} !`);
});

module.exports = app;
