/*
function sayHello() {
    alert("Welcome to your GitHub-hosted site!");
}
*/

const contentMap = {
  movies: `
    <h2>Movies</h2>
    <p>Movies offer a rich, immersive storytelling experience, often encapsulated in a 90–180 minute format. This section contains feature films that span genres and cultures.</p>
    <ul>
      <li><input type="checkbox"> Inception (2010)</li>
      <li><input type="checkbox"> The Grand Budapest Hotel (2014)</li>
      <li><input type="checkbox"> Parasite (2019)</li>
      <li><input type="checkbox"> Blade Runner 2049 (2017)</li>
    </ul>
  `,
  series: `
    <h2>Series</h2>
    <p>TV and web series offer long-form storytelling, allowing for deep character and plot development across episodes or seasons. They are ideal for sustained engagement.</p>
    <ul>
      <li><input type="checkbox"> Breaking Bad</li>
      <li><input type="checkbox"> Chernobyl</li>
      <li><input type="checkbox"> Stranger Things</li>
      <li><input type="checkbox"> True Detective (Season 1)</li>
    </ul>
  `,
  anime: `
    <h2>Anime</h2>
    <p>Anime is a Japanese animation style with unique visual aesthetics and narratives. This section includes both classic and modern titles, often with deep themes or action.</p>
    <ul>
      <li><input type="checkbox"> Death Note</li>
      <li><input type="checkbox"> Attack on Titan</li>
      <li><input type="checkbox"> Neon Genesis Evangelion</li>
      <li><input type="checkbox"> Steins;Gate</li>
    </ul>
  `
};

function showContent(section) {
  document.getElementById('content-area').innerHTML = contentMap[section];
}

