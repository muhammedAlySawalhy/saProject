import pool from "../config/dbController";
class Medicine {
  medicine_id;
  medicine_name;
  medicine_description;
  medicine_category;
  constructor() {
    medicine_id;
    medicine_name;
    medicine_category;
    medicine_description;
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
      const { rows } = await pool.query(query);
      return {
        success: true,
        data: rows[0],
      };
    } catch (err) {
      console.error(err);
    }
  }
}
export default Medicine;