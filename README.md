# E-Commerce Platform

## Overview

This project is a full-fledged e-commerce platform built with a React frontend and a Node.js/Express backend. The platform allows users to browse products, add items to their cart, and manage their orders. Authentication and role-based authorization are implemented to ensure secure access to various features.

## Features

- User Authentication (Login/Register)
- Role-Based Access Control (Admin/User)
- Product Browsing and Filtering
- Add to Cart, Remove from Cart, and Quantity Management
- Admin Dashboard for Product Management
- Responsive Design
- Integration with Backend APIs for Cart and Product Management
- Error Handling and Toast Notifications

## Tech Stack

### Frontend
- React.js
- Redux (State Management)
- Axios (API Calls)
- TailwindCSS (Styling)
- Zod
- React-icons

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- JWT (Authentication)
- bcrypt.js (Password Hashing)

## Installation

### Prerequisites

- Node.js
- npm or yarn
- MongoDB (or a MongoDB Atlas account)

### Setup Instructions

1. **Fork repository:**

   - Click on the Fork button at the top right of the repository page.
   - This will create a copy of the repository under your GitHub profile.

2. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```

3. **Install dependencies:**

    Navigate to the frontend and backend directories and install the required packages.

    ```bash
    cd ecommerce-frontend
    npm install
    ```

    ```bash
    cd ecommerce-backend
    npm install
    ```

4. **Environment Variables:**

    Create a `.env` file in the `backend` directory with the following content:

    ```plaintext
    
NODE_ENV = development
PORT = 3001
MONGO_URI = your_mongodb_uri
JWT_SECERET = your_jwt_seceret
JWT_EXPIRES_IN = 1d
COOKIE_EXPIRES = 7
CLIENT_URL = your_client_uri
CLOUDINARY_URL=your_cloudinary_uri
CLOUDINARY_API_SECRET_KEY = your_cloudinary_seceret_key
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_CLOUD_NAME = cloudinary_cloud_name
    ```

    Create a `.env` file in the `frontend` directory with the following content:

    ```plaintext
    
   REACT_APP_USER_API_URL=http://localhost:5000/api/v1/user
   REACT_APP_PRODUCT_API_URL= http://localhost:5000/api/v1/product
   REACT_APP_CART_API_URL=http://localhost:5000/api/v1/cart
    ```

5. **Run the Application:**

    Start the backend server:

    ```bash
    cd backend
    nodemon
    ```

    Start the frontend development server:

    ```bash
    cd frontend
    npm start
    ```

6. **Access the Application:**

    Open your browser and navigate to `http://localhost:3000` to use the application.

## Usage

- **User Registration:** New users can register for an account.
- **Login:** Users can log in using their email and password.
- **Browse Products:** Users can browse available products and add them to their cart.
- **Cart Management:** Users can manage their cart, including increasing/decreasing product quantities and removing items.
- **Checkout:** Users can proceed to checkout, where they can review their cart and place orders.
- **Admin Dashboard:** Admin users can manage products, including adding, updating, and deleting products.

## API Endpoints

### User Authentication

- **POST /api/v1/auth/register**: Register a new user
- **POST /api/v1/auth/login**: Login a user
- **GET /api/v1/auth/logout**: Logout a user

### Product Management

- **GET /api/v1/product/all**: Get all products
- **GET /api/v1/product/:id**: Get product details
- **POST /api/v1/product**: Add a new product (Admin only)
- **PUT /api/v1/product/:id**: Update a product (Admin only)
- **DELETE /api/v1/product/:id**: Delete a product (Admin only)

### Cart Management

- **GET /api/v1/cart**: Get the user's cart
- **POST /api/v1/cart/:id**: Add a product to the cart
- **DELETE /api/v1/cart/:id**: Remove a product from the cart

## Error Handling

The application handles errors gracefully and provides user-friendly error messages. If an API request fails, an appropriate error message is shown to the user.

## Deployment

The application can be deployed using platforms like Vercel (for the frontend) and Heroku (for the backend). Ensure that you set up the environment variables correctly on these platforms.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add your message'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

Feel free to customize this `README.md` file according to your project's specific details and requirements.
