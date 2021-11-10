const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

module.exports = router;

// ROUTES NOTES

//  **** 1 *****

// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
// => GET ROUTE "/:ID"
// POSTROUTES

// ***** 2 *****

// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
// => POST ROUTE AT "/" (withAuth)
// POSTROUTES

// ***** 3 ******
// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post
// GOES WITH BELOW??????

// ***** 4 ******
// WHEN I click on the button to create a new blog post
// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
// => POST ROUTE AT "/", withAuth
// POSTROUTES

// ***** 5 ******
// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard
// => PUT ROUTE AT ':ID'
// => DELETE ROUTE AT '/:ID'
// POSTROUTES
