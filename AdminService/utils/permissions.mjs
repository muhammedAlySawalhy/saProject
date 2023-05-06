import kafka from "kafka-node";
import AdminModel from "../models/AdminModel.mjs";
import MedicineModel from "../models/Medicine.mjs";
const processPermissionRequest = async (message) => {
  const { doctorEmail, operationType, details } = JSON.parse(message.value);

  // Prompt the admin for confirmation
  console.log(
    `Received permission request from doctor with email ${doctorEmail} for ${operationType} with details ${details}`
  );
  switch (operationType) {
    case "addPatient":
      await AdminModel.createPatient(
        details.username,
        details.email,
        details.password
      );
      break;
    case "editPatient":
      await AdminModel.editPatient(details.email, details.newPassword);
      break;
    case "deletePatient":
      await AdminModel.deletePatient(details.email);
      break;
    case "searchPatientByName":
      const result = await AdminModel.searchPatientByName(details.username);
      console.log(result);
      break;
    
    case "addCategory":
      await AdminModel.addCategory(details.name);
      break;
    case "createMedicine":
      await MedicineModel.create_medicine(
        details.name,
        details.category,
        details.quantity
      );
      break;
    case "deleteMedicine":
      await MedicineModel.delete_medicine(details.name);
      break;

    default:
      console.log(`Invalid operation type: ${operationType}`);
  }
  console.log(`Permission granted to doctor with email ${doctorEmail}`);
};

export const startListening = async () => {
  const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
  const consumer = new kafka.Consumer(client, [
    { topic: "permissions_requests" },
  ]);

  consumer.on("message", async (message) => {
    await processPermissionRequest(message);
  });
  consumer.on("error", (err) => {
    console.error(err);
  });
  console.log(
    "Kafka consumer is listening for messages on the 'permissions_requests' topic"
  );
};
