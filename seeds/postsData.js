const { Post } = require("../models");

const postsData = [
  {
    title: "Test 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    user_id: 1,
  },
  {
    title: "Test 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    user_id: 2,
  },
  {
    title: "Test 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postsData);

module.exports = seedPosts;
