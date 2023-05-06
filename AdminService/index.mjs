import { startListening } from "./utils/permissions.mjs";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 3000;
import adminRoutes from "./views/admin.mjs";
app.use(cors());
// Use body-parser to parse incoming JSON data
app.use(bodyParser.json());

await startListening();
// Import and use the routes

app.use("/admin/", adminRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
