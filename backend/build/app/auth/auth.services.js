"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = void 0;
const user_services_1 = __importDefault(require("../user/user.services"));
const bcryptjs_1 = require("bcryptjs");
const encryptPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield (0, bcryptjs_1.genSalt)(10);
    const hpassword = yield (0, bcryptjs_1.hash)(user.password, salt);
    user.password = hpassword;
    return user;
});
exports.encryptPassword = encryptPassword;
const Register = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const olduser = yield user_services_1.default.findone({ username: user.username });
        console.log(olduser);
        if (olduser)
            throw ("Username already exists");
        const email = yield user_services_1.default.findone({ email: user.email });
        if (email)
            throw ("EMAIL Already Exist");
        user = yield (0, exports.encryptPassword)(user);
        const details = yield user_services_1.default.addone(user);
        return details;
    }
    catch (error) {
        throw error;
    }
});
const Login = (Credentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_services_1.default.findone({ username: Credentials.username });
        if (!user)
            throw ("Username not exists");
        const PasswordMatch = yield (0, bcryptjs_1.compare)(Credentials.password, user.password);
        if (!PasswordMatch)
            throw ("Wrong password");
        return (user);
    }
    catch (error) {
        throw error;
    }
});
exports.default = {
    Register, Login
};
