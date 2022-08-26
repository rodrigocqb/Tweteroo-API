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
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const tweet = req.body;
  const avatar = users.find(
    (value) => value.username === tweet.username
  ).avatar;
  tweets.push({ ...tweet, avatar });
  res.send("OK");
});

app.listen(5000, () => console.log("Listening on port 5000"));
