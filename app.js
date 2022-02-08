import express from "express";
import bodyParser from "body-parser";
import request from "request";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { Http2ServerRequest } from "http2";
import https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
//const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.htm");
});

app.post("/", function (req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  //console.log(firstName, lastName, email);
  var jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/78cba9deeb";

  const options = {
    method: "POST",
    auth: "sukriti:74b50bf3d9b5fa5aab02e15b91db6fd2-us14",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.htm");
    } else {
      res.sendFile(__dirname + "/failure.htm");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure.htm", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server is running");
});

//78cba9deeb list id
//api key
//2bad108e92ae1b2fb1922dbc1d4db0a7-us14
