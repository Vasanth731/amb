// Navbar dropdown
const menuIcon = document.getElementById("menuIcon");
const dropdownMenu = document.getElementById("dropdownMenu");

menuIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});

window.addEventListener("click", function (e) {
  if (!menuIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.style.display = "none";
  }
});

// Hero section dropdowns
const dropdownTitles = document.querySelectorAll(".dropdown-title");

dropdownTitles.forEach(title => {
  title.addEventListener("click", (e) => {
    e.stopPropagation();
    const item = title.parentElement;
    item.classList.toggle("active");

    // Optional: scroll into view when opened
    if(item.classList.contains("active")){
      item.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});



