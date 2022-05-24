const { request, response } = require("express");
const express = require("express");
const userData = require("../models/registrationModels");

const getAllUsers = require("../controllers/controller");
const deleteUser = require("../controllers/controller");

const dataRouter = express.Router();

dataRouter.get("/", getAllUsers);
dataRouter.delete("/delete-student/:id", (req, res, next) => {
  userData.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = dataRouter;
