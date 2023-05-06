import UserModel from "../config/UserModel.js";
import kafka from "kafka-node";

class DoctorModel extends UserModel {
  constructor(username, email, password, department, patients) {
    super({ username, email, password });
    this.department = department;
    this.patients = patients;
  }

  requestPermission = (operationType, details, email) => {
    const message = {
      doctorEmail: email,
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
  };
}

export default DoctorModel;
