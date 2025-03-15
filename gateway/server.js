const express = require("express");
const path = require("path");
const serviceRegistry = require("./serviceRegistry");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Register all services
serviceRegistry.registerServices(app);

// Create a special route to serve the Modal.js file
app.get("/api/modal/widget.js", (req, res) => {
  const modalPath = path.join(
    __dirname,
    "services/modal-service/frontend/modal.js"
  );

  fs.readFile(modalPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error loading modal widget");
    }

    // Modify the file content to make it work as a module
    const moduleCode = `
      // Modal widget served from modal-service
      export ${data}
    `;

    res.setHeader("Content-Type", "application/javascript");
    res.send(moduleCode);
  });
});

// Main app
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Gateway svr running on port ${PORT}`);
});
