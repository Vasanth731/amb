/*
function sayHello() {
    alert("Welcome to your GitHub-hosted site!");
}
*/

function showContent(section) {
  const contentMap = {
    movies: `
      <h2>Movies</h2>
      <p>Brief explanation of movies.</p>
      <ul>
        <li><input type="checkbox"> Inception</li>
        <li><input type="checkbox"> Interstellar</li>
      </ul>
    `,
    series: `
      <h2>Series</h2>
      <p>Brief explanation of series.</p>
      <ul>
        <li><input type="checkbox"> Breaking Bad</li>
        <li><input type="checkbox"> Dark</li>
      </ul>
    `,
    anime: `
      <h2>Anime</h2>
      <p>Brief explanation of anime.</p>
      <ul>
        <li><input type="checkbox"> Death Note</li>
        <li><input type="checkbox"> Naruto</li>
      </ul>
    `
  };

  document.getElementById("content-area").innerHTML = contentMap[section];
}


