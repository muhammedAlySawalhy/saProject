import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 4000;
import  patientRoutes  from "./views/patient.js";
app.use(cors());
// Use body-parser to parse incoming JSON data
app.use(bodyParser.json());

// Import and use the routes

app.use("/patient", patientRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
