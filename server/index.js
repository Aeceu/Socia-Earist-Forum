const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/database");
const UserRouter = require("./routers/UserRoute");
const PostRouter = require("./routers/PostRoute");
const CommentRouter = require("./routers/CommentRouter");
const dotenv = require("dotenv");
import helmet from "helmet";
import morgan from "morgan";
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

connectDB();

const corsConfig = {
  origin: "https://socia-earist-forum.vercel.app",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());
app.options("*", cors(corsConfig));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use("/", UserRouter);
app.use("/", PostRouter);
app.use("/", CommentRouter);

const PORT = 4200;
app.listen(PORT, () => {
  console.log(`Server opened at PORT:${PORT} !`);
});
