import { Modal } from "../services/modal-service/frontend/modal.js";

document.addEventListener("DOMContentLoaded", () => {
  // Create the modal elements
  setupModalElements();

  // Initialize modal instances after elements are created
  const modals = initializeModals();

  // Store modal instances globally for easy access
  window.modals = modals;

  // Set up click handlers for modal trigger buttons
  setupModalTriggers(modals);
});

// Function to create modal HTML elements in the DOM
function setupModalElements() {
  const modalContainer = document.getElementById("modal-container");

  // Create modal elements for our three types
  const modalTypes = ["info", "configuration", "alert"];

  modalTypes.forEach((type) => {
    const modalElement = document.createElement("div");
    modalElement.className = "modal-container";
    modalElement.id = `${type}Modal`;
    modalElement.style.display = "none";

    modalElement.innerHTML = `
        <div class="modal-content">
          <span class="close-button">&times;</span>
          <h2 class="modal-title">${capitalizeFirstLetter(type)} Modal</h2>
          <div class="modal-body">
            <!-- Content will be loaded dynamically -->
          </div>
          <div class="modal-footer">
            <!-- Buttons will be added dynamically if needed -->
          </div>
        </div>
      `;

    modalContainer.appendChild(modalElement);
  });
}

// Function to initialize Modal instances
function initializeModals() {
  return {
    info: new Modal("infoModal"),
    configuration: new Modal("configurationModal"),
    alert: new Modal("alertModal"),
  };
}

// Function to set up click handlers for modal triggers
function setupModalTriggers(modals) {
  // Get all modal trigger buttons
  const modalTriggers = document.querySelectorAll("[data-modal-type]");

  // Add click event listeners to trigger buttons
  modalTriggers.forEach((button) => {
    button.addEventListener("click", async () => {
      const modalType = button.getAttribute("data-modal-type");
      const modalSize = button.getAttribute("data-modal-size") || "medium";

      // Get the corresponding modal instance
      const modal = modals[modalType];

      if (!modal) {
        console.error(`Modal type "${modalType}" not found`);
        return;
      }

      try {
        // Fetch configuration from backend
        const config = await fetchModalConfig(modalType);
        updateModalConent(modalType, config);

        // Open the modal
        modal.open();

        // Record the action
        recordModalAction(modalType, "open", { size: modalSize });
      } catch (error) {
        console.error("Error opening modal: ", error);
      }
    });
  });
}
