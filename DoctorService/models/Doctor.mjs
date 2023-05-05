import UserModel from "../config/UserModel.js";
import kafka from "kafka-node";

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

    const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
    const producer = new kafka.Producer(client);

    producer.on("ready", () => {
      const payloads = [
        {
          topic: "permissions_requests",
          messages: JSON.stringify(message),
        },
      ];
      producer.send(payloads, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(
            `Sent permission request for ${operationType} with details ${details}`
          );
        }
        producer.close();
      });
    });

    producer.on("error", (err) => {
      console.error(err);
    });
  }
}

export default DoctorModel;
