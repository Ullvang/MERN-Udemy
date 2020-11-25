const express = require("express");
const app = express();
const morgan = require("morgan");

// bring in routes
const { getPosts } = require("./routes/post");

app.use(morgan("dev"));

app.get("/", getPosts);

const port = 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
