import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createTopic } from "./Controller/createTopic.mjs";
import doctorRoutes from "./views/permissions.mjs";
const app = express();
const port = process.env.PORT || 6000;
app.use(cors());
// Use body-parser to parse incoming JSON data
app.use(bodyParser.json());

app.use("/doctor", doctorRoutes);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // console.log(`Server running on port ${port}`);
  // const topic = {
  //   topic: "permissions_requests",
  //   partitions: 1,
  //   replicationFactor: 1,
  // };
  // createTopic(topic, (error, result) => {
  //   if (error) {
  //     console.log("Topic creation failed:", error);
  //   } else {
  //     console.log("Topic created:", result);
  //   }
  // });
});
