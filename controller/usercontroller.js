const userModel = require("../model/usermodel.js");
const userModelN = userModel.User;
var mongodb = require('mongodb');

exports.getAllUsers = async (req, res) => {
  const allUsers = await userModelN.find();

  res.json(allUsers);
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  res.json({ id: id, message: "user found" });
};

exports.delete = async(req, res) => {
  const allUsers = await userModelN.findByIdAndDelete(req.body.id);
   res.json(allUsers)
}

exports.update = async(req, res) => {
  const allUsers = await userModelN.findByIdAndUpdate(req.body.id,{ url:
    req.body.url,
    tob:req.body.tob,
    dob:req.body.dob,
    pob:req.body.pob,
    mobile:req.body.mobile,
    education:req.body.education,
    profession:req.body.profession,
    contact:req.body.contact,
    oficelocation:req.body.oficelocation,
    address:req.body.address,
    income:req.body.income,
    cast:req.body.cast,
    height:req.body.height,
    expected:req.body.expected,
    marstatus:req.body.marstatus
   });
   res.json(allUsers)
}

exports.addNewUser = (req, res) => {
  const newu = new userModelN(req.body);

  newu
    .save()
    .then(() => {
      console.log("Message has been saved successfully in the database");
      console.log("This is a post request");
      console.log("Req body: ", req.body);
      res.json({ message: "user added successfully", status: 200 });
    })
    .catch((err) => {
      console.log("There was an error saving the msg object to the database");
      console.log("Sending 500 status code");
      res.json({ message: "Error", status: 500 });
    });
};

exports.login = async (req, res) => {
  const allUsers = await userModelN.find(req.body);
  if (allUsers.length > 0) {
    res.json({ user: allUsers, status: 200 });
  } else {
    res.json({ status: 500 });
  }

  /*
  const resss = newu.find({email:'demo'})
   console.log(resss);*/
};
