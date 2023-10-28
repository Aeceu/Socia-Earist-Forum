const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/database");
const UserRouter = require("./routers/UserRoute");
const PostRouter = require("./routers/PostRoute");
const CommentRouter = require("./routers/CommentRouter");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
const corsConfig = {
  origin: true,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(
  cors({
    origin: ["https://socia-earist-forum.vercel.app"],
    credentials: true, // This allows cookies to be sent along with the request
  })
);

app.use("/", UserRouter);
app.use("/", PostRouter);
app.use("/", CommentRouter);

const PORT = 4200;
app.listen(PORT, () => {
  console.log(`Server opened at PORT:${PORT} !`);
});
