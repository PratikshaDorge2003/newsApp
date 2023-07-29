"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const route_type_1 = require("./route.type");
const user_router_1 = __importDefault(require("../user/user.router"));
const auth_routes_1 = __importDefault(require("../auth/auth.routes"));
exports.routes = [
    new route_type_1.Routes("/user", user_router_1.default),
    new route_type_1.Routes("/auth", auth_routes_1.default)
];
