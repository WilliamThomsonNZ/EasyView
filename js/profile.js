import * as User from "./getUser.js";
import * as Graph from "./graphs.js";
import * as Repos from "./featuredRepos.js";
//authentication for api
const ID = "d9bf7111318e7d084730",
  secret = "542792b8533a82c48f4b6ee6892bfad7f71138b0";
//Stored Username
const userName = sessionStorage.getItem("username");

//fetching data and building UI
User.getUser(userName, ID, secret);
Graph.getRepos(userName, 1, ID, secret);
Repos.createRepoGrid();
