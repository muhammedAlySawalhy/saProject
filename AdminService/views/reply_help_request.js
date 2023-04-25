const Kafka = require("../../config/Kafka");
const consumer = Kafka.consumer({ groupId: "admin-group" });
const producer = Kafka.producer;

consumer.connect();

consumer.subscribe({ topic: "help_requests" });

consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const helpRequest = JSON.parse(message.value);

    // Process the help request and send a response
    const response = await processHelpRequest(helpRequest);

    // Send the response to the "help_responses" topic
    const payload = [
      { topic: "help_responses", messages: JSON.stringify(response) },
    ];
    producer.send(payload, (error, data) => {
      if (error) {
        console.error("Error sending response:", error);
      } else {
        console.log("Response sent:", data);
      }
    });
  },
});

async function processHelpRequest(helpRequest) {
  // Process the help request and return a response
  // ...
  const response = {
    patient: helpRequest.patient,
    message: "Help request received and being processed",
  };
  return response;
}
