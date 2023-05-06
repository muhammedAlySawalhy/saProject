import pool from "../config/dbController.js";
import UserModel from "../config/UserModel.js";
import { createUser } from "../controller/AuthController.js";
class AdminModel extends UserModel {
  constructor(username, password, email) {
    super({ username, password, email });
  }

  static async createDoctor(name, email, department, patient) {
    try {
      const query =
        "INSERT INTO Doctor(name, email, department,patient) VALUES($1, $2,$3,$4)";
      const values = [name, email, department, patient];

      await pool.query(query, values);
    } catch (err) {
      console.error(err);
    }
  }

  static async createPatient(name, email, password) {
    try {
      // Create user

      const userResult = await createUser({ name, password });

      const userId = userResult.rows[0].id;

      // Create patient
      const query =
        "INSERT INTO patient(name, email, user_id) VALUES($1, $2, $3)";
      const values = [name, email, userId];

      await pool.query(query, values);
    } catch (err) {
      console.error(err);
    }
  }

  static async editPatient(email, newPassword) {
    try {
      const query =
        "UPDATE usertable SET password = $1 WHERE id = (SELECT user_id FROM patient WHERE email = $2)";
      const values = [newPassword, email];

      await pool.query(query, values);
    } catch (err) {
      console.error(err);
    }
  }

  static async deletePatient(email) {
    try {
      const query = "DELETE FROM patient WHERE email = $1";
      const values = [email];

      await pool.query(query, values);
    } catch (err) {
      console.error(err);
    }
  }

  static async searchPatientByName(username) {
    try {
      const query = "SELECT * FROM patient WHERE name ILIKE $1";
      const values = [`${username}%`];

      const result = await pool.query(query, values);

      return { "found with name": result.rows[0].name };
    } catch (err) {
      console.error(err);
    }
  }
  static async replyPatientByName(patient_name, message) {
    try {
      const query = "insert into reply(patient_name,message) values ($1,$2)";
      const values = [patient_name, message];

      const result = await pool.query(query, values);

      return result.rows;
    } catch (err) {
      console.error(err);
    }
  }
  static async addCategory(name) {
    try {
      const query = "insert into category(name) values ($1)";
      const values = [name];

      const result = await pool.query(query, values);

      return result.rows;
    } catch (err) {
      console.error(err);
    }
  }
}

export default AdminModel;
