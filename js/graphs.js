let over100Array = [];
let below100Array = [];
let finalArray = [];

export function getRepos(input, counter, ID, secret) {
  //Recursive function to loop through and get all languages
  function getLanguages(input, counter, ID, secret) {
    fetch(
      `https://api.github.com/users/${input}/repos?per_page=100\&page=${counter}?client_id=${ID}&client_secret=${secret}`
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err))
      .then((data) => {
        if (Object.keys(data).length < 100) {
          below100Array = data.map((repo, index) => {
            return data[index].language;
          });
          finalArray.push(below100Array);
          return finalArray;
        }
        over100Array = data.map((repo, index) => {
          return data[index].language;
        });
        finalArray.push(over100Array);
        counter++;
        getLanguages(input, counter);
      });
  }

  getLanguages(input, counter, ID, secret);
  setTimeout(console.log(finalArray), 10000);
}

// //main graph creating function
// export function getRepos(input) {
//   fetch(`https://api.github.com/users/${input}/repos?per_page=100`)
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       //getting languages used
//       languages = data.map((repo, index) => {
//         return data[index].language;
//       });
//       console.log(languages);
//       //Can  only retreive 100 Repos at once
//       if (Object.keys(data).length == 100) {
//         over100(input);
//       }

//       //need to go through the microtask que/callback que to understand why this is happening
//       //   allLanguages.forEach((language) => {
//       //     counts[language] = (counts[language] || 0) + 1;
//       //   });

//       //   console.log(counts);
//     });
// }
