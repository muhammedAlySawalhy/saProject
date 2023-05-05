import kafka from "kafka-node";
import views from "../views/admin.js";
const processPermissionRequest = async (message) => {
  const { doctorEmail, operationType, details } = JSON.parse(message.value);

  // Prompt the admin for confirmation
  console.log(
    `Received permission request from doctor with email ${doctorEmail} for ${operationType} with details ${details}`
  );

  if (confirmed) {
    switch (operationType) {
      case "addPatient":
        await views.createPatient(
          details.username,
          details.password,
          details.email
        );
        break;
      case "editPatient":
        await views.editPatient(details.email, details.newPassword);
        break;
      case "deletePatient":
        await views.deletePatient(details.email);
        break;
      case "searchPatientByName":
        await views.searchPatientByName(details.username);
        break;
      case "replyPatientByName":
        await views.replyPatientByName(details.patientName, details.message);
        break;
      case "addCategory":
        await views.addCategory(details.name);
        break;
      default:
        console.log(`Invalid operation type: ${operationType}`);
    }
    console.log(`Permission granted to doctor with email ${doctorEmail}`);
  } else {
    console.log(`Permission denied to doctor with email ${doctorEmail}`);
  }
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
