# ShopNest

ShopNest is a full-stack e-commerce application built with React on the frontend and Node.js/Express with MongoDB on the backend. It supports product browsing, cart and order flow, admin management, payment simulation, email utilities, and analytics.

## Features

- User authentication and authorization
- Product listing and management
- Admin dashboard for products, orders, and users
- Order tracking and analytics
- Cloudinary image upload support
- Email sending integration
- Razorpay-ready payment setup
- Responsive React frontend

## Tech Stack

- Frontend: React, React Router, Redux Toolkit
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Storage: Cloudinary
- Email: Nodemailer
- Payments: Razorpay

## Project Structure

```text
shopnest/
├── Backend/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
├── package.json
├── README.md
└── .gitignore
```

## Prerequisites

Before running the project, install:

- Node.js (v18 or newer recommended)
- npm
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account
- Gmail app password for email sending

## Environment Variables

Create a file named `.env` inside the `Backend` folder with the following values:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Installation

Install dependencies for both frontend and backend:

```bash
npm install
npm run install:frontend
npm run install:backend
```

## Run in Development

Start backend:

```bash
cd Backend
npm run dev
```

Start frontend:

```bash
cd frontend
npm start
```

The frontend will usually run on:

- http://localhost:3000

The backend will run on:

- http://localhost:5000

## Production Build

Build the frontend for production:

```bash
npm run build
```

Then start the backend in production mode:

```bash
NODE_ENV=production node Backend/server.js
```

## Deployment

This project is set up for deployment on Render.

### Render environment variables

```env
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-render-url.onrender.com
```

### Render build settings

- Build Command:

```bash
npm install && npm run build
```

- Start Command:

```bash
npm start
```

## Admin Credentials

Default admin login used in project notes:

- Email: admin@shopnest.com
- Password: password123

## Notes

- The backend serves the React production build when `NODE_ENV` is set to `production`.
- The project is ready for deployment with a Node.js hosting platform such as Render.

## License

This project is for educational and portfolio purposes.
