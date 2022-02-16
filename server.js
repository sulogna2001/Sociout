const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet=require('helmet');
const multer=require('multer');
const path = require("path");

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

app.use("/img", express.static(path.join(__dirname, "public/img")));
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    // cb(null, file.originalname);
    cb(null, req.body.name);

  },
});

//upload new post image
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
//edit existing profile
// const updateProfile=multer({storage:storage});
// app.post("/api/edit",updateProfile.single("file"),(req,res) =>{
//   try{
//     return res.status(200).json("Profile updated")
//   }
//   catch(err){
//     console.log(err);
//   }
// })

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.listen(8800, () => {
  console.log("Server is running");
});




