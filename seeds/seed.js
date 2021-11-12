// Seeding commentSeed, postSeed,userSeed. Reference: exercise 20, chapter 14

const sequelize = require("../config/connection");
const seedUsers = require("./usersData");
const seedPosts = require("./postsData");
const seedComments = require("./commentsData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedPosts();

  await seedComments();

  process.exit(0);
};

seedAll();
