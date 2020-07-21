import { reposArray } from "./graphs.js";
import { langColorVals } from "./langColors.js";

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
    console.log(repo);
    content.innerHTML = `<div class = "cardContainer">
        <h3><a href = "${repo.html_url}" target = "_blank">${repo.name}</a></h3>
        <p>${repo.description}</p>
        <div class = "languageColor"><i class="fas fa-circle" 
        style="color:${getColor(repo.language)}
        "></i><span>${repo.language}</span>
        <i class="fas fa-star"></i><span>${repo.stargazers_count}</span>
        <i class="fas fa-code-branch"></i><span>${repo.forks_count}</span>
        <span>${repo.size} KB</span>
        </div>
      </div>`;

    repos.appendChild(content);
  });
}
function clearRepos() {
  finalRepoArray.forEach((repo, index) => {
    document.getElementById(`repo${index + 1}`).innerHTML = "";
  });
}
function getColor(language) {
  let circleColor;
  for (let lang in langColorVals) {
    if (lang == language) {
      circleColor = langColorVals[lang];
    }
  }
  return circleColor;
}
export { createRepoGrid, initRepos };
