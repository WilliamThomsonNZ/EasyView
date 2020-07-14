import { langColor } from "./langColors.js";

// let over100Array = [];
let below100Array = [];
let finalArray = [];
let counts = {};

export function getRepos(input, counter) {
  //Recursive function to loop through and get all languages
  async function getLanguages(input, counter) {
    const response = await fetch(
      `https://api.github.com/users/${input}/repos?per_page=100\&page=${counter}`
    );
    const data = await response.json();
    try {
      if (Object.keys(data).length < 100) {
        below100Array = data.map((repo, index) => {
          return data[index].language;
        });
        finalArray.push(below100Array);
        return;
      }
      below100Array = data.map((repo, index) => {
        return data[index].language;
      });
      finalArray.push(below100Array);
      counter++;
      await getLanguages(input, counter);
    } catch (error) {
      window.location.href = "notFound.html";
    }
  }
  getLanguages(input, counter).then((data) => {
    //getting the length of the array of arrays containing languages
    let arrayLegnth = finalArray.length;

    //joining all arrays together
    const concatArr = finalArray.concat(...finalArray);

    // removing the arrays from the concatenated array
    let newArr = concatArr.slice(arrayLegnth);

    //counting amount of each language from repos
    newArr.forEach((language) => {
      counts[language] = (counts[language] || 0) + 1;
    });
    const languageName = Object.keys(counts);
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
            backgroundColor: langColor,
            borderWidth: 1,
            borderColor: "#fff",
          },
        ],
      },
      options: {
        legend: {
          position: "right",
          align: "start",
          labels: {
            fontSize: 15,
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
