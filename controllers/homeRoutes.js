const { Post, User, Comment } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

// GET all posts for homepage
router.get("/", async (req, res) => {
  // console.log("This works!");
  try {
    const dbPostsData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    // Serialize data so the template can read it
    const posts = dbPostsData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get("/post/:id", async (req, res) => {
  console.log("post id works");
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });
    // console.log(postData);
    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      // return;
    }
    const post = postData.get({ plain: true });
    console.log(post);
    /**for(let i = 0;i<post.comments.length;i++){
     * if(req.seesion.user_id===post.comment[i].user_id){
     * post.comment[i].isWriter = true;
     *  }else{
     *    post.comment[i].isWriter = false;
     * }
     * } */
    res.render("singlePost", {
      ...post,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get post by id to then edit
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postInfo = await Post.findByPk(req.params.id);
    if (!postInfo) {
      res.status(400).json("Post not found");
    }
    const singlePost = postInfo.get({ plain: true });
    res.render("editPost", {
      singlePost,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get comment by id to then edit
router.get("/edit-comment/:id", withAuth, async (req, res) => {
  try {
    const commentInfo = await Comment.findByPk(req.params.id);
    if (!commentInfo) {
      res.status(400).json("Comment not found");
    }
    const singleComment = commentInfo.get({ plain: true });
    res.render("editComment", {
      singleComment,
      // logged_in: true,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN route from homepage
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

module.exports = router;
