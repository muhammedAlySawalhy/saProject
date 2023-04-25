require = require("esm");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
// Use body-parser to parse incoming JSON data
app.use(bodyParser.json());

// Import and use the routes

const adminRoutes = require("./views/admin");

app.use("/api/admins", adminRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
