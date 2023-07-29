"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userschema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    profession: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }
});
exports.userModel = (0, mongoose_1.model)("users", userschema);
