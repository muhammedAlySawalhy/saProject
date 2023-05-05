import kafka from "kafka-node";

class Kafka {
  constructor() {
    this.client = new kafka.KafkaClient({ kafkaHost: "kafka:9093" });
    this.producer = new kafka.Producer(this.client);
    this.consumer = new kafka.Consumer(
      this.client,
      [{ topic: "help_requests" }, { topic: "permissions_requests" }],
      { autoCommit: false }
    );

    this.producer.on("ready", () => {
      console.log("Kafka producer is ready");
    });
  }
}

export default new Kafka();
