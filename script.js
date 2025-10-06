/*
function sayHello() {
    alert("Welcome to your GitHub-hosted site!");
}
*/


// const menuIcon = document.getElementById("menuIcon");
// const dropdownMenu = document.getElementById("dropdownMenu");

// menuIcon.addEventListener("click", () => {
//   dropdownMenu.style.display =
//     dropdownMenu.style.display === "block" ? "none" : "block";
// });

// // Close dropdown if clicked outside
// window.addEventListener("click", function (e) {
//   if (!menuIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
//     dropdownMenu.style.display = "none";
//   }
// });


// Navbar dropdown
const menuIcon = document.getElementById("menuIcon");
const dropdownMenu = document.getElementById("dropdownMenu");

menuIcon.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent triggering window click
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});

// Close navbar dropdown if clicked outside
window.addEventListener("click", function (e) {
  if (!menuIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.style.display = "none";
  }
});

// === Hero section dropdowns ===
const dropdownTitles = document.querySelectorAll(".dropdown-title");

dropdownTitles.forEach(title => {
  title.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent closing by other window click handlers
    const item = title.parentElement;
    item.classList.toggle("active");
  });
});




