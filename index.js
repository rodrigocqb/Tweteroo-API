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
  const { username, tweet } = req.body;
  if (!username || !tweet || !userExists(username)) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  tweets.push({ username, tweet });
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const newTweets = tweets.slice(-10).map((tweet) => {
    const avatar = users.find(
      (user) => user.username === tweet.username
    ).avatar;
    return { ...tweet, avatar };
  });
  res.send(newTweets);
});

app.listen(5000, () => console.log("Listening on port 5000"));
