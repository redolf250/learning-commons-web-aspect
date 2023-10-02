const QRCode = require("qrcode");
const fs = require("fs").promises;
const express = require("express");
const Student = require("../model/Student");

const student = express.Router();

student.get("/", async (req, res) => {
  res.render("index");
});

student.get("/form", async (req, res) => {
  res.render("form");
});

student.get("/generate", async (req, res) => {
  res.render("generate");
});

student.get("/information", async (req, res) => {
  res.render("success");
});

student.get("/record/:reference", async (req, res) => {
  try{ 
    const student = await Student.findByReference(req.params.reference);
    if(student) {
      res.status(302).json(student);
    }else{
      res.status(404).json({message: "Oops! no student record found!"});
    }
  }catch(e){
    res.status(500).json({message: e.message});
  }
});

student.post("/register", async (req, res) => {
  try {
    student_ = await Student.findByReference(req.body.reference);
    if (student_ == null) {
      if (req.body !== null && req.body !== undefined) {
        if (req.body.expiry_date > req.body.issued_date) {
          Student.createStudent(req);
          res.render("generate", {
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
      reference: req.body.reference,
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
