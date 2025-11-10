const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");
const modal = document.querySelector(".modal");
const overlay = document.getElementById("modalOverlay");

// Hide modal initially
modal.style.display = "none";

// Open modal on button click
openBtn.addEventListener("click", () => {
  modal.style.display = "block";
  overlay.style.display = "block";
});

// Close modal on close button click
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  overlay.style.display = "none";
});

// Close modal if user clicks outside the modal content
document.addEventListener("click", (e) => {
  if (
    modal.style.display === "block" &&
    !modal.contains(e.target) &&
    e.target !== openBtn
  ) {
    modal.style.display = "none";
    overlay.style.display = "none";
  }
});
