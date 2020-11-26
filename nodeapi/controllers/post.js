exports.getPosts = (req, res) => {
  res.json({
    post: [{ title: "first post" }, { title: "second post" }],
  });
};
