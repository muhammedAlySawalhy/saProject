
import pool from "../controllers/dbController";
import UserModel from "./UserModel";
class AdminModel extends UserModel {
  constructor(username, password, email) {
    super(username, password, email);
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


  
  static async createPatient(username, password, email) {
    try {
      const query =
        "INSERT INTO patient(username, password, email) VALUES($1, $2,$3)";
      const values = [username, password, email];

      await pool.query(query, values);
    } catch (err) {
      console.error(err);
    }
  }

  static async editPatient(email, newPassword) {
    try {
      const query = "UPDATE patient SET  password = $2 WHERE email = $3";
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
      const query = "SELECT * FROM patient WHERE username ILIKE $1";
      const values = [`${username}%`];

      const result = await pool.query(query, values);

      return result.rows;
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
