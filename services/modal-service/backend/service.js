// Simple in-memory store for modal configurations and actions
const modalConfigs = {
  info: {
    title: "Information",
    content: "<p>This is an information modal with important details.</p>",
    closeButtonText: "Close",
    hasFooter: true,
  },
  configuration: {
    title: "Configuration Settings",
    content: `
        <form id="configForm">
          <div class="form-group">
            <label for="option1">Option 1</label>
            <input type="text" id="option1" name="option1" class="form-control">
          </div>
          <div class="form-group">
            <label for="option2">Option 2</label>
            <select id="option2" name="option2" class="form-control">
              <option value="value1">Value 1</option>
              <option value="value2">Value 2</option>
              <option value="value3">Value 3</option>
            </select>
          </div>
        </form>
      `,
    closeButtonText: "Cancel",
    confirmButtonText: "Save Changes",
    hasFooter: true,
  },
  alert: {
    title: "Warning",
    content:
      "<p>This action cannot be undone. Are you sure you want to proceed?</p>",
    closeButtonText: "Cancel",
    confirmButtonText: "Proceed",
    hasFooter: true,
  },
};

// Track modal actions (in a real app, this would likely use a database)
const modalActions = [];

const modalService = {
  // Get configuration for a specific modal type
  getModalConfig: (type) => {
    // If no type provided, return default
    if (!type) {
      return modalConfigs["info"];
    }

    // Return requested config or default if not found
    return modalConfigs[type] || modalConfigs["info"];
  },

  // Record modal action for analytics/tracking
  recordAction: (modalId, action, metadata = {}) => {
    const actionRecord = {
      modalId,
      action,
      metadata,
      timestamp: new Date().toISOString(),
    };

    modalActions.push(actionRecord);
    console.log(`Modal action recorded: ${action} for modal ${modalId}`);

    return actionRecord;
  },

  // Helper method to get all recorded actions (for debugging/admin)
  getActions: () => {
    return modalActions;
  },
};

module.exports = modalService;
