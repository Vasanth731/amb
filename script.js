// // Navbar dropdown
// const menuIcon = document.getElementById("menuIcon");
// const dropdownMenu = document.getElementById("dropdownMenu");

// menuIcon.addEventListener("click", (e) => {
//   e.stopPropagation();
//   dropdownMenu.style.display =
//     dropdownMenu.style.display === "block" ? "none" : "block";
// });

// window.addEventListener("click", function (e) {
//   if (!menuIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
//     dropdownMenu.style.display = "none";
//   }
// });

// // Hero section dropdowns
// const dropdownTitles = document.querySelectorAll(".dropdown-title");

// dropdownTitles.forEach(title => {
//   title.addEventListener("click", (e) => {
//     e.stopPropagation();
//     const item = title.parentElement;
//     item.classList.toggle("active");

//     // Optional: scroll into view when opened
//     if(item.classList.contains("active")){
//       item.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   });
// });



// Minimal interactivity: toggles nav on small screens & simple keyboard navigation
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.main-nav');

  toggle && toggle.addEventListener('click', () => {
    if(!nav) return;
    const isHidden = getComputedStyle(nav).display === 'none';
    nav.style.display = isHidden ? 'block' : 'none';
    toggle.textContent = isHidden ? '✕' : '☰';
  });

  // optional: keyboard to move between project cards (left/right)
  const cards = Array.from(document.querySelectorAll('.project-card'));
  let idx = 0;
  if(cards.length){
    cards[0].tabIndex = 0; // make focusable
    document.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowRight'){ idx = Math.min(cards.length-1, idx+1); cards[idx].focus(); }
      if(e.key === 'ArrowLeft'){ idx = Math.max(0, idx-1); cards[idx].focus(); }
    });
  }
});



