import express from "express";
import bodyParser from "body-parser";
import request from "request";

const app = express();
const port = 3000;

app.listen(3000, function () {
  console.log("server is running");
});
