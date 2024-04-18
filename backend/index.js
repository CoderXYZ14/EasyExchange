const express = require("express");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index");

const app = express();

app.use("/api/v1", mainRouter);

//as rouets would look like
// /api/v1/users/signin

app.listen(3000);
