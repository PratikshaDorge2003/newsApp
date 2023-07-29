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
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./user.schema");
const bcryptjs_1 = require("bcryptjs");
const findone = (filter) => user_schema_1.userModel.findOne(Object.assign(Object.assign({}, filter), { isDeleted: false }));
const addone = (user) => user_schema_1.userModel.create(user);
const update = (filter, data) => user_schema_1.userModel.updateMany(filter, data);
const removeuser = (Username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield update({ username: Username }, { isDeleted: true });
        console.log(result);
        if (result.modifiedCount === 0)
            throw ("Unable to proceed");
        return (result);
    }
    catch (error) {
        throw error;
    }
});
const change = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield (0, bcryptjs_1.genSalt)(10);
        const hpassword = yield (0, bcryptjs_1.hash)(user.password, salt);
        user.password = hpassword;
        const details = yield update({ username: user.username }, { password: user.password });
        return ("Password changed successfully");
    }
    catch (error) {
        throw error;
    }
});
const check = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield findone({ username: user.username });
        if (!result)
            throw (" Username not exists");
        if (result.email !== user.email)
            throw ("Wrong email");
        return result;
    }
    catch (error) {
        throw (error);
    }
});
exports.default = {
    findone, addone, update, removeuser, change, check
};
