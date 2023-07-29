import { ConnectMongo } from "./connection/mongooseconnect";
import express from "express"
import { registerRoute } from "./route/routes";


export const startServer = async () => {
    const express = require('express');
    const app = express();
    const cors = require('cors');
    app.use(cors({ origin: 'http://localhost:3000' }));

    await ConnectMongo();
     registerRoute(app);
    
    app.listen(3001, () => {
        console.log("Listening on port 3001");
    })
}