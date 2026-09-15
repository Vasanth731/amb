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

// Arcade — RL game popup player
const arcadeModal = document.getElementById("arcadeModal");

if (arcadeModal) {
  const arcadeVideo = document.getElementById("arcadeModalVideo");
  const arcadeTitle = document.getElementById("arcadeModalTitle");
  const arcadeClose = document.getElementById("arcadeModalClose");
  const arcadeCards = document.querySelectorAll(".arcade-card");

  function openArcadeModal(src, title) {
    arcadeTitle.textContent = title;
    arcadeVideo.src = src;
    arcadeModal.classList.add("active");
    arcadeVideo.play();
  }

  function closeArcadeModal() {
    arcadeModal.classList.remove("active");
    arcadeVideo.pause();
    arcadeVideo.removeAttribute("src");
    arcadeVideo.load();
  }

  arcadeCards.forEach(card => {
    card.addEventListener("click", () => {
      openArcadeModal(card.dataset.src, card.dataset.title);
    });
  });

  arcadeClose.addEventListener("click", closeArcadeModal);

  arcadeModal.addEventListener("click", (e) => {
    if (e.target === arcadeModal) {
      closeArcadeModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && arcadeModal.classList.contains("active")) {
      closeArcadeModal();
    }
  });
}



