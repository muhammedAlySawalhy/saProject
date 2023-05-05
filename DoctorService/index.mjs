import DoctorModel from "./models/Doctor.mjs";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createTopic } from "./Controller/createTopic.mjs";
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
// Use body-parser to parse incoming JSON data
app.use(bodyParser.json());
const topic = {
  topic: "permissions_requests",
  partitions: 1,
  replicationFactor: 1,
};
createTopic(topic);
app.post("/permissions", async (req, res) => {
  const { operationType, details } = req.body;
  const doctor = new DoctorModel(
    "John Doe",
    "johndoe@example.com",
    "Cardiology",
    ["patient1"]
  );

  await doctor.requestPermission(operationType, details);
  res.send("Permission request sent successfully");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
