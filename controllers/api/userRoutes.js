const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// TESTED: WORKS! WHEN USER ENTERS USERNAME, EMAIL AND PASSWORD; A USER ACCOUNT IS CREATED AND SAVED AND USER IS REDIRECTED TO HOMEPAG

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

// TESTED: WORKS! WHEN USER CHOOSES TO LOGIN WITH EMAIL + PASSWORD; USER IS LOGGED IN AND REDIRECTED TO HOMEPAGE. OPTION TO LOGOUT APPEARS IN UPPER CORNER
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(userData);
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// TESTED: WORKS! AFTER USER LOGS IN, THEN A LOGOUT BUTTON APPEARS IN UPPER CORNER. WHEN USER CLICKS IT, SESSION IS DESTROYED
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
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
