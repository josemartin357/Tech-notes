// const router = require("express").Router();
// const { Comment } = require("../../models");
// const withAuth = require("../../utils/auth");

// // POST route for comment
// router.post("/", withAuth, async (req, res) => {
//   try {
//     const newComment = await Comment.create({
//       comment: req.body.comment,
//       post_id: req.body.post_id,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newComment);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// module.exports = router;

// // NOTES FOR ROUTES
// //  **** 1 *****

// // WHEN I enter a comment and click on the submit button while signed in
// // THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
// // => POST ROUTE AT "/" (withAuth)
// // COMMENTROUTES
