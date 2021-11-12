const { Post, User, Comment } = require("../models");
const router = require("express").Router();
// const withAuth = require("../utils/auth");

// GET all posts for homepage
// TESTED: WORKS
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
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
// TESTED: WORKS
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
// router.get("/????", withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["????"] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render("????", {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// LOGIN route from homepage
// TESTED: DISPLAYS login handlebars
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// SIGN-UP route from homepage
// TESTED: DISPLAYS signup handlebars
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;

// ROUTES NOTES

// **** 1 ***** DONE
// WHEN I visit the site for the first time
// THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
// HOMEROUTES
// => ROUTE: "/" => GET ROUTE: FINDALL() POSTS
