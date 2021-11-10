const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

// ROUTES NOTES

// ***** 1 ***** DONE
// WHEN I choose to sign up
// THEN I am prompted to create a username and password
// => JS EVENT LISTENER TO CONNECT HANDLEBARS "SIGNUP" TO "SIGNUP"
// USERROUTES

// ***** 2 ****** DONE
// WHEN I click on the sign-up button
// THEN my user credentials are saved and I am logged into the site
// GOES WITH ABOVE: POST ROUTE FOR USERNAME AND PASSWORD (BCRYPTO)
// USERROUTES

// **** 3 ***** DONE
// WHEN I revisit the site at a later time and choose to sign in
// THEN I am prompted to enter my username and password
// => POST ROUTE AT "/LOGIN": FINDONE() TO CHECK FOR USERNAME AND checkPassword TO CHECK PASSWORD
// USERROUTES

// ***** 4 ***** DONE
// WHEN I am signed in to the site
// THEN I see navigation links for the homepage, the dashboard, and the option to log out
// WHEN I click on the logout option in the navigation
// THEN I am signed out of the site
// => POST ROUTE AT "/LOGOUT": REQ.SESSION.DESTROY
// USERROUTES
