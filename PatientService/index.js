require = require("esm")(module /*, options*/);

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
// Use body-parser to parse incoming JSON data
app.use(bodyParser.json());

// Import and use the routes

const patientRoutes = require("./views/patient");

app.use("/api/patients", patientRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
