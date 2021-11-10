const { Post, User, Comment } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

// GET route withAuth to find all posts including comment in the "/" route
router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostsData = await Post.findAll(req.session.user_id, {
      attributes: ["id", "title", "content", "date_created"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id", "dated_created"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = dbPostsData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts, loggedIn: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

// ROUTES NOTES:

// ***** 1 ******
// WHEN I click on the dashboard option in the navigation
// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
// =>GET ROUTE AT "/", FINDALL()
// DASHBOARDROUTES
