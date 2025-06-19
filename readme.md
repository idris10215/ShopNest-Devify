# 🛒 DevifyX E-Commerce REST API

A scalable, secure, and production-ready RESTful E-commerce backend built with Node.js, Express, and MongoDB. Supports full user authentication, admin-only product management, cart and checkout system, order tracking, and role-based access control.

---

## 🚀 Live API (Render Deployment)

🔗 [https://your-backend-url.onrender.com](https://your-backend-url.onrender.com)  
_(Replace this with your actual deployed Render URL)_

---

## 📁 Features

### 👥 Authentication
- User registration and login (JWT-based)
- Password hashing with bcrypt
- Role-based access: `user`, `admin`
- Protected routes via middleware

### 🛍️ Product Management
- Admin-only product creation (with image upload to Cloudinary)
- View all products (GET `/products`)
- Stock control included

### 🛒 Cart System
- Add to cart (POST `/cart/addToCart`)
- View cart (GET `/cart/getCart`)
- Update item quantity (PUT `/cart/updateCartItem/:productId`)
- Remove item (DELETE `/cart/removeCartItem/:productId`)

### 💳 Orders & Checkout
- Place order from cart with shipping address (POST `/orders/checkout`)
- View user order history (GET `/orders/myOrders`)
- Admin: View all orders (GET `/orders/getAllOrders`)
- Admin: Update order status (PUT `/orders/:id/status`)
- Users: Cancel order before delivery (PUT `/orders/:id/cancel`)

### 🔐 Security & Middleware
- JWT token auth
- Role-based middleware (`protect`, `adminOnly`)
- CORS enabled
- Environment variable management with dotenv

---

## 📦 Sample Data

✅ This project already includes **10 pre-added sofa products** with Cloudinary-hosted images.  
No seed script is required — products are added manually using the admin panel.

---

## 🧪 Postman Collection

You can test all endpoints using this Postman collection:

🔗 [Download Postman Collection](https://link-to-your-postman-collection)

_(Add your exported `.json` Postman collection link here)_

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
PORT=8000
MONGO_URL=YOUR_MONGO_URL_HERE
PORT=YOUR_PORT_HERE
JWT_SECRET=YOUR_JWT_SECRET_HERE
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME_HERE
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY_HERE
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET_HERE
```

## 📂 Folder Structure

```
├── app.js
├── .env.example
├── controllers/
│   ├── auth.controller.js
│   ├── cart.controller.js
│   ├── order.controller.js
│   └── product.controller.js
├── models/
│   ├── cart.model.js
│   ├── order.model.js
│   ├── product.model.js
│   └── user.model.js
├── routes/
│   ├── cart.routes.js
│   ├── order.routes.js
│   ├── product.routes.js
│   └── user.routes.js
├── middleware/
│   ├── auth.js
│   └── upload.js
├── utils/
│   ├── cloudinary.js
│   └── generateToken.js
├── .gitignore
├── package-lock.json
├── package.json
└── readme.md
```

## 🤖 GPT Usage Note
Certain parts of this project were GPT-assisted for clarity and boilerplate generation (e.g., JWT middleware, route structure).

## 📹 Video Demo
🎥 Watch Demo Here
(Upload to Loom / Google Drive / YouTube and replace this link)


## Author
Idris Mohammed
📧 your.email@example.com

🔗 GitHub: https://github.com/idris-projects

## ✅ Submission Ready

This project meets all required features outlined by the DevifyX E-commerce API assignment, including:

- ✅ Authentication with role-based access
- ✅ Admin-only product management
- ✅ Cart + checkout + order management
- ✅ Order status control & cancellation flow
- ✅ Clean project structure & Postman support
