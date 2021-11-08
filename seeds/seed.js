// Seeding commentSeed, postSeed,userSeed. Reference: exercise 20, chapter 14

const sequelize = require("../config/connection");
const seedUsers = require("./userSeed");
const seedPosts = require("./postSeed");
const seedComments = require("./commentSeed");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedPosts();

  await seedComments();

  process.exit(0);
};

seedAll();
