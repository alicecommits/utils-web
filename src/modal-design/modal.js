// Modal functionality
export class Modal {
  constructor(modalId) {
    // Store references to DOM elements
    this.modal = document.getElementById(modalId);
    this.closeButton = this.modal.querySelector(".close-button");

    // Bind methods to this instance
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    // Set up event listeners
    this.closeButton.addEventListener("click", this.close);
    this.modal.addEventListener("click", this.handleOutsideClick);
  }

  open() {
    // Display the modal with flex layout to center content
    this.modal.style.display = "flex";
    // Prevent scrolling on the body while modal is open
    document.body.style.overflow = "hidden";
  }

  close() {
    this.modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  handleOutsideClick(event) {
    // Close modal when clicking outside content area
    // Note: hallucination? Here I reversed the === to !==
    if (event.target !== this.modal) {
      this.close();
    }
  }
}
