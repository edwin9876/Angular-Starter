const express = require("express");
var bodyParser = require("body-parser");
var db = require("./database.js");
var md5 = require("md5");
var jwt = require("jsonwebtoken");

const app = express();
var cors = require("cors");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(4000, () => {
  console.log("listening on port 4000");
});

app.post("/user/register", function (req, res) {
  const { userName, email, password } = req.body;
  const hashed_password = md5(password.toString());
  let checkUserName = `select userName from user where email = ${email}`;
  db.run(checkUserName, [], (err, rows) => {
    if (!rows) {
      let insert =
        "insert into user (userName, email, password) VALUES ($userName, $email, $password)";
      let params = {
        $userName: userName,
        $email: email,
        $password: hashed_password,
      };
      db.run(insert, params, (err, rows) => {
        let token = jwt.sign({ data: rows }, "secret");
        res.send({ status: 1, data: rows, token: token });
      });
    }
  });
});

app.get("/user", function (req, res) {
  let sql = "select * from user";
  let params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: "success",
      data: rows,
    });
  });
});
