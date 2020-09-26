const express = require("express");
require("dotenv").config();
const cors = require('cors');
require("./db/mongoose"); //runs mongoose.js and connect to DB
const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
