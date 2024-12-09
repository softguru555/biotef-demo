const db = require("../models");
const User = db.user;
const Company = db.company;
const emailExists = async function (email) {
  email = email.toLowerCase();
  let user = await User.findOne({
    email: email,
  });
  return user;
};

const companyExists = async function (companyName) {
  companyName = companyName.toLowerCase();
  let CompanyInfo = await Company.findOne({
    name: companyName,
  });
  return CompanyInfo;
  // if (CompanyInfo) throw { status: 400, message: 'Company already exists.' }
};

const buildCompany = function (req) {
  let c = req.body;
  let company = {
    name: c.companyName,
    contactName: c.contactName,
    phone: c.phone,
    email: c.email,
    address: c.address,
  };
  if (c.terms && c.shippingMethod) {
    company.terms = c.terms;
    company.shippingMethod = c.shippingMethod;
  }
  return company;
};

const createCompany = async function (company) {
  const companyData = new Company(company);
  const newCompany = await companyData.save();
  if (!newCompany) throw { status: 400, message: "Cannot create company." };
  return newCompany;
};

const buildShippingAddress = function (req, company) {
  const {
    billCompanyName: companyName,
    billContactName: contactName,
    billPhone: phone,
    billEmail: email,
    billAddress: address,
  } = req.body;

  return {
    companyId: company.id,
    companyName,
    contactName,
    phone,
    email,
    address,
    isDefault: true,
  };
};

const createUser = async function (user) {
  console.log("user :>> ", user);
  var userData = new User(user);
  //   user.password = await hashPassword(user.password);
  let newUser = await userData.save();

  if (!newUser) throw { status: 400, message: "Cannot create user" };

  return newUser;
};

const buildUser = function (req, company) {
  console.log("req.body :>> ", req.body);
  const { password, email, phone, contactName, companyName } = req.body;
  console.log("contactName, email, phone :>> ", contactName, email, phone);
  return {
    companyId: company._id,
    name: contactName,
    email: email,
    phone: phone,
    password: password,
    role: "admin",
  };
};

module.exports = {
  emailExists,
  companyExists,
  createCompany,
  buildShippingAddress,
  buildCompany,
  createUser,
  buildUser,
};
