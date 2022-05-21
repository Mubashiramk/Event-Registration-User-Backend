// import mongoose from "mongoose";
const userData = require("../models/registrationModels");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await userData.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ users });
};

module.exports = getAllUsers;
