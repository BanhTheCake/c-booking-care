const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/connectDB');
const initRouter = require('./routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;

app.use(cookieParser())
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
}

// Connect DB
connectDB();

// Router Init
initRouter(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
