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

// put route to update comment
router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(
      {
        comment: req.body.comment,
      },
      {
        where: {
          id: req.params.id,
          // NOT WORKING preventing others from updating
          user_id: req.session.user_id,
        },
      }
    );

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE one comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        // preventing others from deleting
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
