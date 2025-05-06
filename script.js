/*
function sayHello() {
    alert("Welcome to your GitHub-hosted site!");
}
*/

document.querySelector('.dropbtn').addEventListener('click', function () {
  document.querySelector('.dropdown').classList.toggle('show');
});

// Optional: close dropdown when clicking outside
window.addEventListener('click', function (e) {
  if (!e.target.matches('.dropbtn')) {
    document.querySelector('.dropdown')?.classList.remove('show');
  }
});



