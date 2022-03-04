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
    // select * from user where username=firstname and pswd = pswd;
    const user_Object = await User.find({
      firstName: username,
      password: password,
    });
    if (user_Object.length == 1) {
      res.send('{"result":"OK"}');
      console.log(user_Object);
    } else {
      res.status(503);
      res.send('{"result":"Authentication failed"}');
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
router.delete("/user/:firstname", async(req, res) => {
  const first_name_parameter = req.params["firstname"];
  User.deleteOne({firstName:first_name_parameter},function(err,result){
    if(err)
    {
        res.send(err);
    }
    else{ 
        res.send("deleted");
    }
});
});
router.put("/user/:firstname",async function(req,res,next){
  User.findOneAndUpdate({firstName:req.params["firstname"]},req.body).then(function(user){
    User.findOne({firstName:req.params.firstname}).then(function(user){
      res.send(user);
    });
  });
});
 
module.exports = router;
