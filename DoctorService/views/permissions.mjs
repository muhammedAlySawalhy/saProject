import express from "express";
import DoctorModel from "../models/Doctor.mjs";
const router = express.Router();
router.post("/permissions", async (req, res) => {
  const { operationType, details ,email} = req.body;
  const doctor = new DoctorModel(
    "John Doe",
    "johndoe@example.com",
    "123",
    "dentist",
    ["patient_1"]
  );

  doctor.requestPermission(operationType, details,email);
  res.send("Permission request sent successfully");
});
export default router;
