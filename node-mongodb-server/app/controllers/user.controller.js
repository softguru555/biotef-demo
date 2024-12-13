const db = require("../models");
require("dotenv").config();
const User = db.user;
const Company = db.company;
const authHelper = require("../helpers/auth.helper.js");
const CryptoJS = require("crypto-js");
jwt = require("jsonwebtoken");
// Create and Save a new Tutorial

exports.create = async (req, res) => {
  console.log("req.body :>> ", req.body);
  const userInfo = await authHelper.emailExists(req.body.email);
  if (userInfo) {
    res.status(500).send({ message: "This user already exists." });
    return;
  }
  let company = authHelper.buildCompany(req);
  const newCompany = await authHelper.createCompany(company);
  const user = authHelper.buildUser(req, newCompany);
  const newUser = await authHelper.createUser(user);
  const returnData = [];
  returnData.companyId = newCompany.id;
  returnData.user = newUser;
  res.status(200).send(returnData);
};

exports.login = async (req, res) => {
  // try {
  const decryptedBytes = CryptoJS.AES.decrypt(req.body.credentials, "biotefCredentials");
  const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
  const decryptedCredentials = JSON.parse(decryptedData);
  // validator.exist(decryptedCredentials, ["email", "password"]);
  req.body = decryptedCredentials;
  const userData = await User.findOne({ email: req.body.email, password: req.body.password });
  const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, { expiresIn: "1h" });
  console.log("token :>> ", token);
  if (userData) {
    var data = {};
    data.token = token;
    data.userInfo = userData;
    res.status(200).send(data);
  } else {
    res.status(500).send({ message: "email or password is not correct." });
  }
};

exports.getInfo = async (req, res) => {
  try {
    console.log("req :>> ", req.query);
    let sortField = req.query.active;
    let sortOrder = req.query.direction == "asc" ? 1 : -1;
    let page = req.query.page;
    let limit = req.query.limit;
    let skip = (page - 1) * limit;
    const userData = await User.find()
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);
    const totalDocument = await User.count();
    console.log("totalDocument :>> ", totalDocument);
    const totalPages = Math.ceil(totalDocument / limit);
    res.status(200).send({
      userData,
      pagination: {
        totalDocument,
        totalPages,
        current: page,
      },
    });
  } catch (e) {
    throw { status: 400, message: "something went wrong" };
  }
};

// // Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
//   const title = req.query.title;
//   var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

//   Tutorial.find(condition)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving tutorials.",
//       });
//     });
// };

// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Tutorial.findById(id)
//     .then((data) => {
//       if (!data) res.status(404).send({ message: "Not found Tutorial with id " + id });
//       else res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: "Error retrieving Tutorial with id=" + id });
//     });
// };

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!",
//     });
//   }

//   const id = req.params.id;

//   Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
//         });
//       } else res.send({ message: "Tutorial was updated successfully." });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating Tutorial with id=" + id,
//       });
//     });
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
//         });
//       } else {
//         res.send({
//           message: "Tutorial was deleted successfully!",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Could not delete Tutorial with id=" + id,
//       });
//     });
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: `${data.deletedCount} Tutorials were deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while removing all tutorials.",
//       });
//     });
// };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   Tutorial.find({ published: true })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving tutorials.",
//       });
//     });
// };
