module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: Boolean, default: true },
    shippingMethod: { type: String },
    terms: { type: String },
    notes: { type: String },
  });

  const Company = mongoose.model("company", schema);
  return Company;
};
