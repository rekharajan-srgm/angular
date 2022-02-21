const express = require("express");
const { contentType } = require("express/lib/response");
const router = express.Router();
const User = require("../models/user");
console.log("waiting for request");

router.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.get("/validate/:username/:password", async (req, res) => {
  const username = req.params.username;
  const password = req.params.password;
  try {
    const result = await User.find({ firstName: username, password: password });
    if (result.length == 1) {
      res.send("{\"result\":\"OK\"}");
    } else {
      res.status(503);
      res.send("{\"result\":\"Authentication failed\"}");
    }
  } catch (err) {
    res.status(501);
    res.send("{'result':'server error occured.'}");
  }
});

router.post("/user", async (req, res) => {
  console.log(req.body);
  const request_user_object = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    acceptTandC: req.body.acceptTandC,
  });

  await request_user_object.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.status(200);
      res.send("Signed up successfully");
    }
  });
});



module.exports = router;
