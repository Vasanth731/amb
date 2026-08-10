// Navbar dropdown
const menuIcon = document.getElementById("menuIcon");
const dropdownMenu = document.getElementById("dropdownMenu");
const dropdownLinks = dropdownMenu.querySelectorAll("a");

function closeMenu() {
  menuIcon.classList.remove("active");
  dropdownMenu.classList.remove("active");
}

menuIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  menuIcon.classList.toggle("active");
  dropdownMenu.classList.toggle("active");
});

// Hide dropdown when any link inside it is clicked
dropdownLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("click", function (e) {
  if (!menuIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
    closeMenu();
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



