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

// const localhost = "http://localhost:5173";
const deployed = "https://social-earists-forum.vercel.app";

const corsConfig = {
  origin: deployed,
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
