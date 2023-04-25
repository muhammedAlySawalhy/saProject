const express = require("express");

import medicine from "../models/medicine";
import patientModel from "../models/patientModel";
const router = express.Router();

router.post("/medicine", async (req, res) => {
  const result = await medicine.getAllmedicine();
  res.send(result);
});

router.post("/add_medicine", async (req, res) => {
  const { name, patient } = req.body;
  const p = new patientModel(patient);
  const result = await p.addMedicine(name);
  res.send(result);
});
router.post("/delete_medicine", async (req, res) => {
  const { name, patient } = req.body;
  const p = new patientModel(patient);
  const result = await p.deleteMedicine(name);
  res.send(result);
});
router.post("/request_help", async (req, res) => {
  const { patient, messages } = req.body;
  const p = new patientModel(patient);
  const result = await p.requestHelp(messages);
  res.send(result);
});
router.post("/search_medicine", async (req, res) => {
  const { medicine_name } = req.body;
  const result = await medicine.search_medicine(medicine_name);
  res.send(result);
});

module.exports = router;
