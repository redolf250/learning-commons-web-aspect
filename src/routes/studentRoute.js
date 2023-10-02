const QRCode = require("qrcode");
const fs = require("fs").promises;
const express = require("express");
const Student = require("../model/Student");

const student = express.Router();

student.get("/", async (req, res) => {
  res.render("index", { title: "My Express App" });
});

student.get("/form", async (req, res) => {
  res.render("form", { title: "My Express App" });
});

student.get("/generate", async (req, res) => {
  res.render("generate", { title: "My Express App" });
});

student.get("/information", async (req, res) => {
  res.render("success");
});

student.post("/register", async (req, res) => {
  try {
    student_ = await Student.findByReference(req.body.reference);
    if (student_ == null) {
      if (req.body !== null && req.body !== undefined) {
        if (req.body.expiry_date > req.body.issued_date) {
          Student.createStudent(req);
          res.render("success", {
            alert: "Thank you!",
            message: "Record captured successfully!",
          });
        } else {
          res.render("success", {
            alert: "Oops!",
            message: "Issued and expirey date mismatched!",
          });
        }
      } else {
        res.render("success", {
          alert: "Oops!",
          message: "Invalid student data!",
        });
      }
    } else {
      res.render("success", {
        alert: "Oops!",
        message: "Record already captured!",
      });
    }
  } catch (err) {
    res.render("success", {
      alert: "Oops!",
      message: "Internal server eeror!",
    });
  }
});

student.post("/code", async (req, res) => {
  try {
    const qrCodeData = {
      name: req.body.reference,
    };
    const qrCodeDataString = JSON.stringify(qrCodeData);
    const qrCodeDataURL = await QRCode.toDataURL(qrCodeDataString);
    const filePath = "public/assets/qrcode.png";
    await fs.writeFile(filePath, qrCodeDataURL.split(",")[1], "base64");
    res.render("generate", { imagePath: "/assets/qrcode.png" });
  } catch (error) {
    res.render("success", {
      alert: "Oops!",
      message: "Error generating QR code",
    });
  }
});

module.exports = student;
