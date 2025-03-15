// controller.js
const modalService = require("./service");

const modalController = {
  // Get modal configuration based on type
  getModalConfig: (req, res) => {
    try {
      const { type } = req.query;
      const config = modalService.getModalConfig(type);

      return res.status(200).json({
        success: true,
        data: config,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve modal configuration",
        error: error.message,
      });
    }
  },

  // Handle modal actions (open, close, etc.)
  handleModalAction: (req, res) => {
    try {
      const { action, modalId, metadata } = req.body;

      modalService.recordAction(modalId, action, metadata);

      return res.status(200).json({
        success: true,
        message: "Modal action recorded successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to process modal action",
        error: error.message,
      });
    }
  },
};

module.exports = modalController;
