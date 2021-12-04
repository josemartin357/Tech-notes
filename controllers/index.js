// Routes for /api, homeRoutes.js and dashboardRoutes.js
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
// const dashboardRoutes = require("./dashboardRoutes");

// router.use("/dashboard", dashboardRoutes);
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;

// {{pending}}
// WHEN I am idle on the site for more than a set time
// THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
