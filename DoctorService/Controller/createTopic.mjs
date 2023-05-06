import kafka from "kafka-node";

export const createTopic = (topic, callback) => {
  const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
  const admin = new kafka.Admin(client);
  admin.createTopics([topic], (error, result) => {
    if (error) {
      console.error(`Failed to create topic: ${error}`);
      if (callback) callback(error);
    } else {
      console.log(`Topic created: ${JSON.stringify(result)}`);
      if (callback) callback(null, result);
    }
  });
};
