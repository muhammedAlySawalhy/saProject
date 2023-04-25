const Kafka = require("../config/Kafka");
const producer = Kafka.producer;

function sendHelpRequest(patient, messages) {
  const payload = [
    { topic: "help_requests", messages: JSON.stringify({ patient, messages }) },
  ];
  producer.send(payload, (error, data) => {
    if (error) {
      console.error("Error sending message:", error);
    } else {
      console.log("Message sent:", data);
    }
  });
}

module.exports = { sendHelpRequest };
