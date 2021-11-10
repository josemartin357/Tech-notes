const { User } = require("../models");

const usersData = [
  {
    username: "martin1987",
    password: "martin1234",
  },
  {
    username: "anita1989",
    password: "anita8976",
  },
  {
    username: "erika1978",
    password: "erika6562",
  },
];

const seedUsers = () => User.bulkCreate(usersData);

module.exports = seedUsers;
