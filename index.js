import express from "express";
import cors from "cors";

const app = express();

const users = [];
const tweets = [];

app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const tweet = req.body;
  tweets.push(tweet);
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
