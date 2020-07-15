import { langColor, langColorVals } from "./langColors.js";
import { initRepos } from "./featuredRepos.js";

let languageArray = [];
let reposArray = [];
let finalArray = [];
let counts = {};

function getRepos(input, counter) {
  //Recursive function to loop through and get all languages
  async function getLanguages(input, counter) {
    const response = await fetch(
      `https://api.github.com/users/${input}/repos?per_page=100\&page=${counter}`
    );
    const data = await response.json();

    try {
      if (Object.keys(data).length < 100) {
        languageArray = data.map((repo, index) => {
          return data[index].language;
        });
        finalArray.push(languageArray);
        data.forEach((repo) => {
          reposArray.push(repo);
        });
        return;
      }
      languageArray = data.map((repo, index) => {
        return data[index].language;
      });
      data.forEach((repo) => {
        reposArray.push(repo);
      });
      finalArray.push(languageArray);
      counter++;
      await getLanguages(input, counter);
    } catch (error) {
      window.location.href = "notFound.html";
    }
  }
  getLanguages(input, counter).then((data) => {
    //getting the length of the array of arrays containing languages
    let arrayLegnth = finalArray.length;
    initRepos();
    //joining all arrays together
    const concatArr = finalArray.concat(...finalArray);
    // removing the arrays from the concatenated array
    let newArr = concatArr.slice(arrayLegnth);
    //counting amount of each language from repos
    newArr.forEach((language) => {
      counts[language] = (counts[language] || 0) + 1;
    });
    console.log(counts);
    const languageName = Object.keys(counts);
    //setting colors for graph
    let backgroundColors = [];
    languageName.forEach((lang) => {
      backgroundColors.push(langColorVals[lang]);
    });
    const languageValue = Object.values(counts);
    //creating the chart using chart.js
    let myChart = document.getElementById("lGraph").getContext("2d");
    let languageStatsGraph = new Chart(myChart, {
      type: "pie",
      data: {
        labels: languageName,
        datasets: [
          {
            label: "language",
            data: languageValue,
            backgroundColor: backgroundColors,
            borderWidth: 1,
            borderColor: "#fff",
          },
        ],
      },
      options: {
        legend: {
          position: "left",
          align: "center",
          labels: {
            fontSize: 15,
            boxWidth: 10,
          },
        },
        layout: {
          padding: {
            top: 50,
            left: 0,
            right: 0,
            bottom: 0,
          },
        },
        animation: {
          easing: "linear",
          duration: 500,
        },
      },
    });
  });
}

export { reposArray, getRepos };
