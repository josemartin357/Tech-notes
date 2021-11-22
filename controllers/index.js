// Routes for /api, homeRoutes.js and dashboardRoutes.js
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
// const dashboardRoutes = require("./dashboardRoutes");

// router.use("/dashboard", dashboardRoutes);
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;

// PENDING ELEMENTS FROM USER STORY:

// {{pending-> need to make separate pages for sign-up/log-in}}
// WHEN I click on any other links in the navigation
// THEN I am prompted to either sign up or sign in

// {{pending}}
// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment

// {{pending}}
// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

// {{pending}}
// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard

// {{pending}}
// WHEN I am idle on the site for more than a set time
// THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
