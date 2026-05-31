# SparkleClean | Full-Stack Cleaning Service Management System

SparkleClean is a premium, production-grade end-to-end Cleaning Service Booking Platform designed for spotless residential, upholstery, and commercial detailing. Clients can dynamically browse from a dynamic menu of curated cleaning categories, get real-time price summaries, select custom appointments via date-time selectors, check customer reviews, submit feedback, and place reservations. Vetted administrators can access an analytics-rich protected console to process and review orders.

---

## 🏗️ Project Architecture

The system is structured as a clear monorepo, divided into separate, decoupled **Frontend** and **Backend** folders for maximum modularity and scalable deployment.

```
Cleaning-Service-Management-System/
├── backend/                   # Node.js + Express + Mongoose (API Server)
│   ├── config/                # Database connections
│   ├── controllers/           # Route logic (Bookings, Services)
│   ├── middleware/            # Admin authentication filters
│   ├── models/                # MongoDB Mongoose schemas (Service, Booking, Review)
│   ├── routes/                # Express routing endpoints
│   ├── seed/                  # Initial services & reviews seeder script
│   ├── .env                   # Environment configurations
│   └── server.js              # Server entry point
│
└── frontend/                  # React.js (Create React App) (SPA)
    ├── src/
    │   ├── components/        # Reusable view components (Navbar, Footer, ServiceCard)
    │   ├── pages/             # Dynamic views (Home, Services, Booking, Gallery, Admin, About)
    │   ├── App.jsx            # Routing & view entry point
    │   └── index.css          # Styling tokens, animations & datepicker overrides
    ├── index.html             # Fonts, SEO tags & base elements
    └── package.json           # Frontend dependencies
```

---

## 🔌 API Documentation

All API endpoints are prefixed with `/api` and expect JSON payloads for request bodies.

| Endpoint | Method | Description | Access |
|---|---|---|---|
| `/api/services` | `GET` | Retrieve all active cleaning services in the catalog. | Public |
| `/api/bookings` | `POST` | Create a new cleaning appointment in the database. | Public |
| `/api/bookings` | `GET` | Retrieve all received client bookings. | Protected |
| `/api/bookings/:id/complete` | `PATCH` | Toggle booking status to "Completed". | Protected |
| `/api/bookings/:id` | `DELETE` | Permanently delete a booking entry from the database. | Protected |
| `/api/auth/register` | `POST` | Register a new user account. | Public |
| `/api/auth/login` | `POST` | Authenticate a user and receive a token. | Public |
| `/api/auth/me` | `GET` | Retrieve the currently authenticated user's profile data. | Protected |
| `/api/reviews` | `GET` | Retrieve all glowing customer reviews. | Public |
| `/api/reviews` | `POST` | Allow verified clients to post new reviews directly. | Public |

---

## 🛠️ Local Installation & Setup

Follow these simple, step-by-step commands to get SparkleClean fully active on your system.

### Prerequisites
- [Node.js](https://nodejs.org) (v16.0.0 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (or a local instance running on port `27017`)

---

### 1. Backend Service Launch

1. Open your terminal and change directory to the backend folder:
   ```bash
   cd backend
   ```
2. Install all necessary Node packages:
   ```bash
   npm install
   ```
3. Initialize the database seed script to populate the dynamic menu of premium categories, initial client reviews, and the admin user:
   ```bash
   node seeds/seed.js
   ```
4. Start the backend Express server:
   ```bash
   npm start
   ```
   *(Note: For live reload during development, use `npm run dev`)*
   *The server will start running on [http://localhost:5000](http://localhost:5000).*

---

### 2. Frontend Web Launch

1. Open a separate terminal window and change directory to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install all necessary development and package assets:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The client interface will boot up and run on [http://localhost:3000](http://localhost:3000).*

---

## 🔒 Security & Admin Access
To view all submitted orders in the protected admin panel, head over to the route `/admin` in the client browser. 
- Enter the secure token: **`admin_secret_2026`**
- This token will authenticate your session and open the analytical control deck.
