//runs mongoose and connect to db
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  console.log("DB is running!")
);
