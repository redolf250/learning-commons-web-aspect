const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  data: { type: Buffer, required: true },
  size: { type: Number, required: true },
  md5: { type: String, required: true },
  encoding: { type: String, required: true },
  contentType: { type: String, required: true },
});

const studentSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  othername: { type: String, },
  lastname: { type: String, required: true },
  reference: { type: String, required: true },
  index: { type: String, required: true },
  nationality: { type: String, required: true },
  college: { type: String, required: true },
  category: { type: String, required: true },
  gender: { type: String, required: true },
  disabled: { type: String, required: true },
  department: { type: String, required: true },
  faculty: { type: String, required: true },
  validity: { type: String, required: true },
  image: imageSchema,
});

studentSchema.statics.createStudent = function (req) {
    const issued_date = new Date(req.body.issued_date);
    const issued_date_ = issued_date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
    const expiry_date = new Date(req.body.expiry_date);
    const expiry_date_ = expiry_date.toLocaleString('en-US', { month: 'short', year: 'numeric' });

  let requestBody = {
    firstname: req.body.firstname,
    othername: req.body.othername,
    lastname: req.body.lastname,
    reference: req.body.reference,
    index: req.body.index,
    nationality: req.body.nationality,
    college: req.body.college,
    category: req.body.category,
    gender: req.body.gender,
    disabled: req.body.disabled,
    department: req.body.department,
    faculty: req.body.faculty,
    validity: issued_date_+'-'+expiry_date_,
    image: {
      name: req.files.image.name,
      data: req.files.image.data,
      size: req.files.image.size,
      md5: req.files.image.md5,
      encoding: req.files.image.encoding,
      contentType: req.files.image.mimetype,
    },
  };
  return this.create(requestBody);
};

studentSchema.statics.findByReference = function (reference) {
  return this.findOne({ reference: reference });
};

module.exports = mongoose.model("Student", studentSchema);
