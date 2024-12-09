module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    companyId: String,
    uuid: String,
    role: String,
    name: String,
    email: String,
    phone: String,
    password: String,
    status: Number,
  });

  const User = mongoose.model("user", schema);
  return User;
};
