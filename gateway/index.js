const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

// Proxy requests to admin-service
app.use(
  "/admin",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
  })
);

// Proxy requests to patient-service
app.use(
  "/patient",
  createProxyMiddleware({
    target: "http://localhost:4000",
    changeOrigin: true,
  })
);

app.listen(5000, () => {
  console.log("Gateway service listening on port 5000");
});
