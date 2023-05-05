const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const apiProxy = httpProxy.createProxyServer();

// Route for admin service
app.all("/admin/*", (req, res) => {
  console.log("req", req);
  apiProxy.web(req, res, { target: "http://admin:3000" });
});

// Route for patient service
app.all("/patient/*", (req, res) => {
  apiProxy.web(req, res, { target: "http://patient:4000" });
});

// Catch-all route for invalid requests
app.all("/*", (req, res) => {
  res.status(404).send("Not found");
});

// Start the API gateway
app.listen(5000, () => {
  console.log("API Gateway listening on port 5000");
});
