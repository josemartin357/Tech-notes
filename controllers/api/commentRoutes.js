const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

module.exports = router;

// NOTES FOR ROUTES
//  **** 1 *****

// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
// => POST ROUTE AT "/" (withAuth)
// COMMENTROUTES
