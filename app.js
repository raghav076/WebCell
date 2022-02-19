require('dotenv').config();
require('express-async-errors');

const cookieParser = require('cookie-parser')
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const xss = require('xss-clean');


const express = require('express')
const app = express()

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/auth');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post')
const indexRouter = require('./routes/front')
const infoRouter = require('./routes/users')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.set('view engine', 'ejs');

app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // limit each IP to 100 requests per windowMs
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'))
app.use(cors());
app.use(xss());


//api routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', authenticateUser, postRouter);
app.use('/api/v1/info/', authenticateUser, infoRouter);


app.use(indexRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, ()=> {
            console.log(`Server is listening on port ${PORT}`)
        });
    } catch (error) {
        console.log(error);
    }
}

start();


