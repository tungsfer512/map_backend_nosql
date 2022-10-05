import express from 'express';
import 'dotenv/config';

import configResources from './config/resources';
import initWebRouters from './routes/index';
import connectDB from './config/connectDB';

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configResources(app);
initWebRouters(app);

connectDB();

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('running on port: ' + PORT);
});
