const db = require("../models");
const User = db.user;
const Company = db.company;
const authHelper = require("../helpers/auth.helper.js");
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
  console.log("newCompany :>> ", newCompany);
  //Company Approver
  //   var shippingAddress;
  //   if (req.body.shippingAddress) {
  //     const shippingAddressData = req.body.shippingAddress;
  //     shippingAddressData.companyId = newCompany.id;
  //     shippingAddress = await CompanyAddress.save(shippingAddressData);
  //   } else {
  //     const address = authHelper.buildShippingAddress(req, newCompany);
  //     shippingAddress = await CompanyAddress.save(address);
  //   }
  //   if (req.body.shippingInfo) {
  //     const shippingInfo = req.body.shippingInfo;
  //     await CompanyAddress.update(
  //       {
  //         coreSize: shippingInfo.coreSize,
  //         defaultOD: shippingInfo.defaultOD,
  //         copyPosition: shippingInfo.copyPosition,
  //       },
  //       {
  //         where: {
  //           id: shippingAddress.id,
  //         },
  //       }
  //     );
  //   }

  //User
  const user = authHelper.buildUser(req, newCompany);
  console.log("user :>> ", user);
  const newUser = await authHelper.createUser(user);
  const returnData = [];
  returnData.companyId = newCompany.id;
  returnData.user = newUser;
  console.log("returnData :>> ", returnData);
  res.status(200).send(returnData);
};

exports.login = async (req, res) => {
  const userData = await User.findOne({ email: req.body.email, password: req.body.password });
  console.log("userData :>> ", userData);
  if (userData) {
    res.status(200).send(userData);
  } else {
    res.status(500).send({ message: "email or password is not correct." });
  }
  // Save Tutorial in the database
};

exports.getInfo = async (req, res) => {
  const userData = await User.find();
  console.log("userData :>> ", userData);
  res.status(200).send(userData);
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
