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
const express_1 = require("express");
const user_services_1 = __importDefault(require("./user.services"));
const response_handle_1 = require("../utility/response.handle");
const nodemailer_1 = __importDefault(require("nodemailer"));
let router = (0, express_1.Router)();
router.delete("/delete", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const details = req.body.username;
        const ans = yield user_services_1.default.removeuser(details);
        res.send(new response_handle_1.ResponseHandler(ans));
    }
    catch (error) {
        next(error);
    }
}));
router.post("/change", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const details = req.body;
        const ans = yield user_services_1.default.change(details);
        res.send(new response_handle_1.ResponseHandler(ans));
    }
    catch (error) {
        next(error);
    }
}));
router.post("/check", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const details = req.body;
        const ans = yield user_services_1.default.check(details);
        res.send(new response_handle_1.ResponseHandler(ans));
    }
    catch (error) {
        next(error);
    }
}));
router.post("/email", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const details = req.body;
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'pratikshadorge05@gmail.com',
            pass: "lfxwicsxrldtwfzn"
        }
    });
    const mailOptions = {
        from: 'pratikshadorge05@gmail.com',
        to: details.recipient,
        subject: details.subject,
        text: details.content
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error');
        }
        else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
}));
exports.default = router;
