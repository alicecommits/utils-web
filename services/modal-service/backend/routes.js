const express = require("express");
const modalController = require("./controller");

const router = express.Router();

// Service-specific routes
router.get("/", modalController.getModalConfig);
router.post("/action", modalController.handleModalAction);

module.exports = router;
