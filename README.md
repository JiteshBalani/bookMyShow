# Movie Ticket Booking Website

## Overview
This is a full-stack movie ticket booking website that allows users to browse movies, select showtimes, book tickets, and make secure payments online. Built using the MERN stack, it ensures a seamless and responsive experience for users.

## Tech Stack
- **Frontend**: React.js (with Vite for faster development)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose for schema management)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Ant Design (AntD)
- **Payment Gateway**: Stripe

## Libraries & Dependencies
Apart from the core technologies, the following libraries are used:
- **Frontend**:
  - react-router-dom (for routing)
  - axios (for API requests)
  - antd (for UI components)
  - darkreader (for dark mode support)
  - react-stripe-checkout (for integrating Stripe payments)
  
- **Backend**:
  - mongoose (for database schema and interaction)
  - moment.js & day.js (for date and time formatting)
  - bcrypt (for password hashing)
  - jsonwebtoken (for authentication security)
  - cors (for handling cross-origin requests)
  - nodemon (for automatic server restart during development)

## Features
- **User Authentication** (Signup, Login, JWT-based Authentication)
- **Movie Listings** (View movies, details, and available showtimes)
- **Seat Selection** (Interactive seat booking interface)
- **Secure Payments** (Stripe integration for online transactions)
- **Dark Mode Support** (Enabled using darkReader)
- **Admin Panel** (Manage movies, bookings, and users)

## Installation & Setup
### Prerequisites
- Node.js & npm installed
- MongoDB set up locally or on a cloud platform
- Stripe API keys (for payment integration)

### Steps to Run
#### Clone the repository
```sh
git clone https://github.com/JiteshBalani/bookMyShow.git
```
#### Install dependencies
##### Backend Setup
```sh
cd backend
npm install
npm start  # Starts the server
```
##### Frontend Setup
```sh
cd frontend
npm install
npm run dev  # Starts the React app with Vite
```

## Environment Variables
Create a `.env` file in the root directory of server and configure the following:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Usage
1. Register or log in to your account.
2. Browse available movies and select a showtime.
3. Choose your seats and proceed to payment.
4. Complete payment using Stripe.
5. Get confirmation and access your booking details on profile page.

## Folder Structure
```plaintext
movie-ticket-booking/
│── client/        # React app (Vite, AntD, React Router)
│── server/         # Node.js server (Express, MongoDB)
│── README.md        # Documentation
```



