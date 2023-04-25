const express = require("express");

import medicine from "../models/medicine";
import patientModel from "../models/patientModel";
import adminModel from "../models/AdminModel";

const router = express.Router();

router.post("/medicines", async (req, res) => {
  const result = await medicine.getAllmedicine();
  res.send(result);
});

router.post("/add_medicine", async (req, res) => {
  const { medicine_name, category_id, quantity } = req.body;

  const result = await medicine.create_medicine(
    medicine_name,
    category_id,
    quantity
  );
  res.send(result);
});
router.post("/add_category", async (req, res) => {
  const { name } = req.body;

  const result = await adminModel;
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
    const { categoryName } = req.params;

    // Query the category ID from the category name
    const categoryQuery = "SELECT id FROM category WHERE name = $1";
    const categoryResult = await pool.query(categoryQuery, [categoryName]);

    if (categoryResult.rows.length === 0) {
      // Return an error if the category doesn't exist
      return res.status(404).send("Category not found");
    }

    const categoryId = categoryResult.rows[0].id;

    // Query all medicines that belong to the specified category ID
    const medicineQuery =
      "SELECT id, name, quantity FROM medicine WHERE category_id = $1";
    const medicineResult = await pool.query(medicineQuery, [categoryId]);

    res.status(200).json(medicineResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
router.get("/medicine/:name", async (req, res) => {
  try {
    const { name } = req.params;

    // Use a SQL join query to get the category name of a medicine by name
    const query = `
      SELECT category.name
      FROM medicine
      INNER JOIN category
      ON medicine.category_id = category.id
      WHERE medicine.name = $1;
    `;

    const { rows } = await pool.query(query, [name]);

    if (rows.length === 0) {
      return res.status(404).send("Medicine not found");
    }

    const categoryName = rows[0].name;

    res.json({ categoryName });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
module.exports = router;
