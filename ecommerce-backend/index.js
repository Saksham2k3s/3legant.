const bodyParser = require('body-parser');
const cartRoute = require('./routes/cartRoute');
const cloudinary = require('cloudinary');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const databaseConnection = require('./config/dbConnet');
const dotenv = require('dotenv');
const express = require('express');
const fileUpload = require('express-fileupload');
const orderRoute = require('./routes/orderRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const wishlistRoute = require('./routes/wishlistRoute');

// Initailize app 
const app = express();
// Config
dotenv.config({ path: './.env' });

// Configure CORS
app.use(cors({
    origin: "https://3legant-frontend.vercel.app",
    methods: 'GET,POST,PUT,DELETE, PATCH', 
    credentials: true, 
  }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://3legant-frontend.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

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
app.use('/api/v1/wishlist', wishlistRoute);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});
