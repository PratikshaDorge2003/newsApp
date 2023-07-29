"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoute = void 0;
const route_data_1 = require("./route.data");
const express_1 = require("express");
const response_handle_1 = require("../utility/response.handle");
const registerRoute = (app) => {
    app.use((0, express_1.json)());
    for (let route of route_data_1.routes) {
        app.use(route.path, route.router);
    }
    app.use((error, req, res, next) => {
        res.send(new response_handle_1.ResponseHandler(null, error));
    });
};
exports.registerRoute = registerRoute;
