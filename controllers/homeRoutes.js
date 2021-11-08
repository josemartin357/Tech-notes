const { Post, User, Comment } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

// GET all posts for homepage
router.get("/", async (req, res) => {
  try {
    const dbPostsData = await Post.findAll({
      attributes: ["id", "title", "content", "date_created"],
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

// // GET one post
// router.get("/post/:id", async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       attributes: ["id", "title", "content", "date_created"],
//       include: [
//         {
//           model: User,
//           attributes: ["username"],
//         },
//       ],
//     });

//     if (!postData) {
//       res.status(404).json({ message: "No post found with that id!" });
//       return;
//     }
//     const post = postData.get({ plain: true });

//     res.render("singlePost", {
//       ...post,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
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
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// SIGN-UP route from homepage
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
