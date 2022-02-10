const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
 const helmet=require('helmet')


const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute=require("./routes/post");

dotenv.config();
mongoose.connect(
    'mongodb+srv://socialmedia:swamijipally@cluster0.ha6qb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log('Connected to MongoDB');
    }
  );

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.listen(8800, () => {
  console.log("Server is running");
});




