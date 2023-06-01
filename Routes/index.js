"use strict";

const stripeRoutesForUser = require("./stripeRoutesForUser");
const demo = require("./demo");



const all = [].concat(
    stripeRoutesForUser,
    demo,
);

module.exports = all;
