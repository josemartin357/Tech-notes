// Routes for /api, homeRoutes.js and dashboardRoutes.js
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");

router.use("/", homeRoutes);
router.use("/", dashboardRoutes);
router.use("/api", apiRoutes);

module.exports = router;
