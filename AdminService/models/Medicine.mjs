import { z } from "zod";
import pool from "../controllers/dbController.js";

export const MedicineSchema = z.object({
  medicine_id: z.number(),
  medicine_name: z.string(),
  medicine_description: z.string(),
  medicine_category: z.string(),
});

class Medicine {
  medicine_id;
  medicine_name;
  medicine_description;
  medicine_category;

  constructor(data) {
    const validatedData = MedicineSchema.parse(data);
    this.medicine_id = validatedData.medicine_id;
    this.medicine_name = validatedData.medicine_name;
    this.medicine_description = validatedData.medicine_description;
    this.medicine_category = validatedData.medicine_category;
  }

  static async getAllmedicine() {
    try {
      const query = "select * from medicine";
      const { rows } = await pool.query(query);
      return {
        success: true,
        data: rows[0],
      };
    } catch (err) {
      console.error(err);
    }
  }

  static async create_medicine(medicine_name, medicine_category, quantity) {
    try {
      const query =
        "INSERT INTO medicine(medicine_name, medicine_category, quantity) VALUES($1,$2,$3)";
      const values = [medicine_name, medicine_category, quantity];

      await pool.query(query, values);
    } catch (err) {
      console.error(err);
    }
  }

  // functions

  static async edit_medicine(name, newName) {
    const query = "UPDATE medicine SET name = $1 WHERE name = $1";
    const values = [newName, name];
    try {
      const { rows } = await pool.query(query);
      return {
        success: true,
        data: rows[0],
      };
    } catch (err) {
      console.error(err);
    }
  }

  static async delete_medicine(medicine_name) {
    try {
      const query = "DELETE FROM medicine WHERE medicine_name = $1";
      const values = [medicine_name];

      const { rows } = await pool.query(query);
      return {
        success: true,
        data: rows[0],
      };
    } catch (err) {
      console.error(err);
    }
  }

  async search_medicine(name) {
    try {
      const query = "select * from medicine where name= $1";
      const values = [name];
      const { rows } = await pool.query(query, values);
      return {
        success: true,
        data: rows[0],
      };
    } catch (err) {
      console.error(err);
    }
  }
}
export const getMedByCateg = async (categoryName) => {
  // Query the category ID from the category name
  const categoryQuery = "SELECT id FROM category WHERE name = $1";
  const categoryResult = await pool.query(categoryQuery, [categoryName]);

  const categoryId = categoryResult.rows[0].id;

  // Query all medicines that belong to the specified category ID
  const medicineQuery =
    "SELECT id, name, quantity FROM medicine WHERE category_id = $1";
  const medicineResult = await pool.query(medicineQuery, [categoryId]);
  return medicineResult;
};
export default Medicine;
