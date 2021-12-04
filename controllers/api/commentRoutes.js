const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Post route for comment if user is logged in
router.post("/", withAuth, async (req, res) => {
  try {
    console.log(req.body, req.params);
    const newComment = await Comment.create({
      comment: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.body.id,
    });
    console.log(newComment);
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// // route to get all comments at /comments
// router.get("/", withAuth, async (req, res) => {
//   const dbCommentData = await Comment.findAll().catch((err) => {
//     res.json(err);
//   });

//   const comments = dbCommentData.map((comment) =>
//     comment.get({
//       plain: true,
//     })
//   );
//   res.render("all", {
//     comments,
//   });
// });

// // get comments by post_id
// //get comments by post_id at comments/post_id
// router.get("/:post_id", withAuth, async (req, res) => {
//   try {
//     const commentsData = await Comment.findbyPK(req.params.post_id);
//     const comments = commentsData.get({
//       plain: true,
//     });
//     res.render("singlePost", {
//       comments,
//       // logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/:id", (req, res) => {
//   Comment.findAll({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbCommentData) => res.json(dbCommentData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// POST route for comment
// router.post("/", withAuth, async (req, res) => {
//   try {
//     const newComment = await Comment.create({
//       comment: req.body.comment,
//       // post_id: req.body.post_id,
//       // date_created: req.body.date_created,
//       // user_id: req.session.user_id,
//     });
//     res.status(200).json(newComment);
//     console.log(newComment);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;

//

// NOTES FOR ROUTES
//  **** 1 *****

// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
// => POST ROUTE AT "/" (withAuth)
// COMMENTROUTES
