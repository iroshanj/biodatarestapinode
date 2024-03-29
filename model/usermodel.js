const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  expected:String,
  blood:String,
  marstatus:String,
  age:Number,
  hobbies:String,
  height:String,
  tob:String,
  pob:String,
  name: String,
  father: String,
  fatherjob: String,
  dob: String,
  mobile: String,
  gender: String,
  email: String,
  password: String,
  education: String,
  profession: String,
  contact: String,
  oficelocation: String,
  address: String,
  role: Number,
  income: String,
  cast: String,
  url: String,
  paystatus: Number,
  transid: String,
});

exports.User = mongoose.model("users", usersSchema);
