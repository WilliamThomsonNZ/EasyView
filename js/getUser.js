export function getUser(input, ID, secret) {
  document.querySelector("title").textContent = `Easy View | ${input}`;

  async function getUserData() {
    const response = await fetch(
      `https://api.github.com/users/${input}?client_id=${ID}&client_secret=${secret}`
    );
    const data = await response.json();
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
  }

  getUserData();
}

//Inserts header content to DOM
function createHeader(avatar, joinDate, githubUrl, name, currentLocation) {
  const url = document.getElementById("githubUrl");
  document.getElementById("avatar").src = avatar;
  document.getElementById("name").textContent = name;
  document.getElementById("location").textContent = currentLocation;
  url.textContent = `@${githubUrl.slice(19)}`;
  url.href = githubUrl;
  document.getElementById("joined").textContent = `Joined, ${joinDate}`;
}

//Inserts follower/repo content to dom and creates animated counter
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
