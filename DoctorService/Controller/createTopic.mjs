import kafka from "kafka-node";

export const createTopic = (topic) => {
  const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
  const admin = new kafka.Admin(client);
  admin.createTopics([topic], (error, result) => {
    if (error) {
      console.error(`Failed to create topic: ${error}`);
    } else {
      console.log(`Topic created: ${JSON.stringify(result)}`);
    }
  });
};
