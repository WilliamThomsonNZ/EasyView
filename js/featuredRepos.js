import { reposArray } from "./graphs.js";
let finalRepoArray = [];

function createRepoGrid() {
  const select = document.getElementById("sortBy");
  select.addEventListener("change", () => {
    switch (select.value) {
      case "forks":
        sortBy("forks_count");
        clearRepos();
        setRepos();
        console.log(finalRepoArray);
        break;
      case "stars":
        sortBy("stargazers_count");
        clearRepos();
        setRepos();
        break;
      case "size":
        sortBy("size");
        clearRepos();
        setRepos();
        break;
    }
  });
}
function initRepos() {
  sortBy("forks_count");
  setRepos();
}
function sortBy(stat) {
  finalRepoArray = reposArray
    .sort((a, b) => {
      return b[stat] - a[stat];
    })
    .slice(0, 8);
}

function setRepos() {
  finalRepoArray.forEach((repo, index) => {
    let repos = document.getElementById(`repo${index + 1}`);
    let content = document.createElement("div");
    content.innerHTML = `<div class = "cardContainer">
        <h3>${repo.name}</h3>
        <p>${repo.description}</p>
        <i class="fas fa-circle"></i><span>${repo.language}</span>
      </div>`;
    repos.appendChild(content);
  });
}
function clearRepos() {
  finalRepoArray.forEach((repo, index) => {
    document.getElementById(`repo${index + 1}`).innerHTML = "";
  });
}
export { createRepoGrid, initRepos };
