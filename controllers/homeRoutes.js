const { Post, User, Comment } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

// GET all posts for homepage
// TESTED: WORKS; WHEN USER ENTERS SITE, THEN ALL POSTS ARE DISPLAYED
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
// TESTED: WORKS!; WHEN USER SELECTS A POST FROM HOMEPAGE; THEN USER IS REDIRECTED TO PAGE WITH SINGLE POST DETAILS
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
          include: [User],
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
    res.render("singlePost", {
      ...post,
      logged_in: req.session.logged_in,
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

// ROUTE FOR UPDATE POST
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

// LOGIN route from homepage
// TESTED: WHEN USER CLICKS ON LOGIN; THEN USER IS REDIRECTED TO LOGIN PAGE
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

module.exports = router;

// SIGN-UP route from homepage
// TESTED: DISPLAYS signup handlebars
// router.get("/signup", (req, res) => {
//   res.render("signup");
// });

// module.exports = router;

// ROUTES NOTES

// **** 1 ***** DONE
// WHEN I visit the site for the first time
// THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
// HOMEROUTES
// => ROUTE: "/" => GET ROUTE: FINDALL() POSTS
