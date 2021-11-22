const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postsData.json");
const commentData = require("./commentsData.json");

const seedDatabase = async () => {
  try {
    //Added try/catch to handle errors and view then in console

    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log("\n----- USERS SEEDED -----\n");

    const seededPosts = await Post.bulkCreate(postData, {
      returning: true,
    });
    console.log("\n----- POSTS SEEDED -----\n");

    const seededComments = await Comment.bulkCreate(commentData, {
      returning: true,
    });
    console.log("\n----- POSTS SEEDED -----\n");

    // for (const project of projectData) {
    //   await Project.create({
    //     ...project,
    //     user_id: users[Math.floor(Math.random() * users.length)].id,
    //   });
    // }

    process.exit(0);
  } catch (err) {
    console.log(err); //console.log the error if there is one
  }
};

seedDatabase();
