const express = require('express');
const dotenv = require('dotenv');
const databaseConnection = require('./config/dbConnet');
const userRoute = require('./routes/userRoute');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cartRoute = require('./routes/cartRoute');

const app = express();

// Config
dotenv.config({ path: './.env' });

// Configure CORS
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE', 
    credentials: true, 
  }));



// Connect to Database
databaseConnection();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

// Middleware
app.use(express.json()); 
app.use(cookieParser());
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended : true}));

// Router import
app.use('/api/v1/user', userRoute); 
app.use('/api/v1/product', productRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/cart', cartRoute);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});
