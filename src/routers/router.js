const express  = require("express");
const router = express.Router();
const adminRouter = require("./admin.router");
const applyRouter = require('./apply.router');

module.exports = () => {

    adminRouter(router);
    applyRouter(router);

    return router;
}
