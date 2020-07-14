export function getUser(input, ID, secret) {
  fetch(
    `https://api.github.com/users/${input}?client_id=${ID}&client_secret=${secret}`
  )
    .then((res) => {
      return res.json();
    })

    .catch((err) => {
      console.log(err);
    })
    .then((data) => {
      const [
        following,
        repos,
        followers,
        avatar,
        joinDate,
        githubUrl,
        name,
        currentlocation,
      ] = [
        data.following,
        data.public_repos,
        data.followers,
        data.avatar_url,
        data.created_at.slice(0, 10),
        data.html_url,
        data.name,
        data.location,
      ];

      createHeader(avatar, joinDate, githubUrl, name, currentlocation);
      createFollowers(repos, followers, following);
    });
}

function createHeader(avatar, joinDate, githubUrl, name, currentLocation) {
  const url = document.getElementById("githubUrl");
  document.getElementById("avatar").src = avatar;
  document.getElementById("name").textContent = name;
  document.getElementById("location").textContent = currentLocation;
  url.textContent = `@${githubUrl.slice(19)}`;
  url.href = githubUrl;
  document.getElementById("joined").textContent = `Joined, ${joinDate}`;
}

function createFollowers(repos, followers, following) {
  const reposCount = document.getElementById("repoCount");
  const followersCount = document.getElementById("followerCount");
  const followingCount = document.getElementById("followingCount");

  // setting the targets
  reposCount.setAttribute("countTo", repos);
  followersCount.setAttribute("countTo", followers);
  followingCount.setAttribute("countTo", following);
  const speed = 300;

  //Creating the animated counter
  document.querySelectorAll(".counter").forEach((counter) => {
    const counterNumber = +counter.getAttribute("countTo");

    const updateCounter = setInterval(() => {
      const startingCount = +counter.innerText;
      const increaseBy = counterNumber / speed;

      if (startingCount < counterNumber) {
        counter.innerText = Math.ceil(startingCount + increaseBy);
      } else {
        clearInterval(updateCounter);
      }
    }, 1);
  });
}
