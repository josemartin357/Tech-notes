const { Post } = require("../models");

const postsData = [
  {
    title: "Test 1",
    content:
      "Content for test 1, Content for test 1, Content for test 1, Content for test 1, Content for test 1, Content for test 1,",
    user_id: 1,
  },
  {
    title: "Test 2",
    content:
      "Content for test 2, Content for test 2, Content for test 2, Content for test 2, Content for test 2, Content for test 2, ",
    user_id: 2,
  },
  {
    title: "Test 3",
    content:
      "Content for test 3, Content for test 3, Content for test 3, Content for test 3, Content for test 3, Content for test 3, ",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postsData);

module.exports = seedPosts;
