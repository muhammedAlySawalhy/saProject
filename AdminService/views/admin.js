import express from "express";
import Medicine from "../models/Medicine.mjs";
import patientModel from "../models/patientModel";
import adminModel from "../models/AdminModel.mjs";

const router = express.Router();

router.get("/medicines", async (req, res) => {
  const result = await medicine.getAllmedicine();
  res.send(result);
});

router.post("/create_patient", async (req, res) => {
  const { name, email, password } = req.body;

  const result = await adminModel.createPatient(name, email, password);
  res.send(result);
});
router.post("/create_doctor", async (req, res) => {
  const { name, email, deparment, patient } = req.body;

  const result = await adminModel.createDoctor(name, email, deparment, patient);
  res.send(result);
});
router.post("/create_medicine", async (req, res) => {
  const { medicine_name, category_id, quantity } = req.body;
  const medicine = new Medicine(medicine_name, category_id, quantity);
  const result = await medicine.create_medicine(
    medicine_name,
    category_id,
    quantity
  );
  res.send(result);
});
router.post("/add_category", async (req, res) => {
  const { name } = req.body;

  const result = await adminModel.addCategory(name);
  res.send(result);
});
router.post("/delete_medicine", async (req, res) => {
  const { name, patient } = req.body;
  const p = new patientModel(patient);
  const result = await p.deleteMedicine(name);
  res.send(result);
});
// router.post("/reply_help", async (req, res) => {
//   const { patient, messages } = req.body;
//   const p = new patientModel(patient);
//   const result = await p.requestHelp(messages);
//   res.send(result);
// });
router.post("/search_medicine", async (req, res) => {
  const { medicine_name } = req.body;
  const result = await medicine.search_medicine(medicine_name);
  res.send(result);
});
router.post("/search_medicine_by", async (req, res) => {
  const { medicine_name } = req.body;
  const result = await medicine.search_medicine(medicine_name);
  res.send(result);
});
router.get("/medicines/:categoryName", async (req, res) => {
  try {
    const { medicine } = req.params;
    const med = new Medicine(medicine);
    const medBYCat = await med.getMedByCateg(caategory);

    res.status(200).json(medBYCat.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;
