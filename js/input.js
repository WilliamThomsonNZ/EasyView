//Dom elements
const input = document.getElementById("profile"),
  viewProfile = document.getElementById("viewProfile");

//obtain userName input
viewProfile.addEventListener("click", () => {
  if (input.value == "") {
    alert("please enter a Github username");
  } else {
    searchUser();
  }
});
input.addEventListener("keydown", () => {
  if (event.keyCode === 13) {
    searchUser();
  }
});

function searchUser() {
  let userName = input.value;
  sessionStorage.setItem("username", userName);
  window.location.href = "profile.html";
  input.value = "";
}
