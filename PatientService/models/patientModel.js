import pool from "../config/dbController";
import UserModel from "../config/UserModel";

class Patient extends UserModel {
  constructor(medicine = []) {
    this.medicine = medicine;
  }

  async addMedicine(medicine_id) {
    try {
      await pool.query(
        "INSERT INTO patient (medicine_id) where patient.name =$1 VALUES ($2)",
        [this.id, medicine_id]
      );

      this.medicine.push({ id: medicine_id });
      const { rows } = await pool.query(query);
      return {
        success: true,
        data: rows[0],
      };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to add medicine");
    }
  }

  async deleteMedicine(medicine) {
    const medicineIndex = this.medicine.findIndex((m) => m.name === medicine);
    if (medicineIndex === -1) {
      throw new Error("Medicine not found");
    }
    try {
      await pool.query("delete medicine from patient where medicine =$1", [
        this.id,
        medicine,
      ]);
      this.medicine[medicineIndex].name = medicine;
      const { rows } = await pool.query(query);
      return {
        success: true,
        data: rows[0],
      };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to edit medicine");
    }
  }

  async requestHelp(message) {
    try {
      await pool.query(
        "INSERT INTO request (patient_id, message) VALUES ($1, $2)",
        [this.id, message]
      );
      const { rows } = await pool.query(query);
      return {
        success: true,
        data: rows[0],
      };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to send help request");
    }
  }
}

export default Patient;
