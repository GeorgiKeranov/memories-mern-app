import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/router.js';

// Setup enviroment variables from '.env' file so they can be used like this 'process.env'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({limit: '10mb'}));
app.use(express.json());
app.use(cors());

// Define all of the routes for our application
app.use('/', router);

// Connect to the database
mongoose.connect(process.env.MONGODB_CONNECTION_URL)
    .then(() => {
        // Successful database connection so run the server
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch(error => {
        console.log(error);
    });
