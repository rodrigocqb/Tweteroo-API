import express from "express";
import cors from "cors";

const app = express();

const users = [];
const tweets = [];

app.use(cors());
app.use(express.json());

function userExists(username) {
  return users.some((value) => value.username === username);
}

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  if (
    !username ||
    !(avatar.startsWith("https://") || avatar.startsWith("http://"))
  ) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  users.push({ username, avatar });
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const username = req.headers.user;
  if (!username || !tweet || !userExists(username)) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  tweets.push({ username, tweet });
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  let page = parseInt(req.query.page);
  if (page < 1) {
    return res.status(400).send("Informe uma página válida!");
  }
  if (!page) {
    page = 1;
  }
  let newTweets;
  if (page === 1) {
    newTweets = tweets
      .slice(-10 * page)
      .map((tweet) => {
        const avatar = users.find(
          (user) => user.username === tweet.username
        ).avatar;
        return { ...tweet, avatar };
      })
      .reverse();
  } else {
    newTweets = tweets
      .slice(-10 * page, -((page - 1) * 10))
      .map((tweet) => {
        const avatar = users.find(
          (user) => user.username === tweet.username
        ).avatar;
        return { ...tweet, avatar };
      })
      .reverse();
  }

  res.send(newTweets);
});

app.get("/tweets/:username", (req, res) => {
  const { username } = req.params;
  const userTweets = tweets
    .filter((value) => value.username === username)
    .map((tweet) => {
      const avatar = users.find(
        (user) => user.username === tweet.username
      ).avatar;
      return { ...tweet, avatar };
    })
    .reverse();
  res.send(userTweets);
});

app.listen(5000, () => console.log("Listening on port 5000"));
