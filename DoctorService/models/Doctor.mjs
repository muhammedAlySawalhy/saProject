import UserModel from "../config/UserModel.js";
import kafka from "../config/kafka.js";

class DoctorModel extends UserModel {
  constructor(name, email, department, patients) {
    super(name, email);
    this.department = department;
    this.patients = patients;
  }

  async requestPermission(operationType, details) {
    const message = {
      doctorEmail: this.email,
      operationType,
      details,
    };

    const payloads = [
      { topic: "permissions_requests", messages: JSON.stringify(message) },
    ];
    kafka.producer.send(payloads, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(
          `Sent permission request for ${operationType} with details ${details}`
        );
      }
    });
  }
}

export default DoctorModel;
