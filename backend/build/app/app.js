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
exports.startServer = void 0;
const mongooseconnect_1 = require("./connection/mongooseconnect");
const routes_1 = require("./route/routes");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const express = require('express');
    const app = express();
    const cors = require('cors');
    app.use(cors({ origin: 'http://localhost:3000' }));
    yield (0, mongooseconnect_1.ConnectMongo)();
    (0, routes_1.registerRoute)(app);
    app.listen(3001, () => {
        console.log("Listening on port 3001");
    });
});
exports.startServer = startServer;
