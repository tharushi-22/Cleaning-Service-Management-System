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

### 1. Cleaning Services

#### `GET /api/services`
- **Description:** Retrieve all active cleaning services in the catalog.
- **Access:** Public
- **Response Format:**
  ```json
  [
    {
      "_id": "664c391219b21f0015ab54ef",
      "name": "Deep Home Clean",
      "description": "Thorough sanitization of every room...",
      "price": 120,
      "imageUrl": "https://images.unsplash.com/...jpeg",
      "createdAt": "2026-05-29T03:00:00.000Z",
      "updatedAt": "2026-05-29T03:00:00.000Z"
    }
  ]
  ```

---

### 2. Booking Engine

#### `POST /api/bookings`
- **Description:** Create a new cleaning appointment in the database.
- **Access:** Public
- **Request Body:**
  ```json
  {
    "serviceId": "664c391219b21f0015ab54ef",
    "userName": "John Doe",
    "date": "2026-06-15T09:00:00.000Z",
    "address": "123 Main St, New York, NY",
    "email": "john.doe@example.com",
    "phone": "+1 (555) 019-2834"
  }
  ```
- **Response Format (`201 Created`):**
  ```json
  {
    "_id": "664c4892c2ab1e2049ba12ac",
    "service": "664c391219b21f0015ab54ef",
    "userName": "John Doe",
    "date": "2026-06-15T09:00:00.000Z",
    "address": "123 Main St, New York, NY",
    "email": "john.doe@example.com",
    "phone": "+1 (555) 019-2834",
    "status": "Pending",
    "createdAt": "2026-05-29T03:25:00.000Z",
    "updatedAt": "2026-05-29T03:25:00.000Z"
  }
  ```

#### `GET /api/bookings`
- **Description:** Retrieve all received client bookings (populated with full Service models).
- **Access:** Protected (Requires Header authentication)
- **Headers:** `x-admin-token: admin_secret_2026`
- **Response Format:**
  ```json
  [
    {
      "_id": "664c4892c2ab1e2049ba12ac",
      "service": {
        "_id": "664c391219b21f0015ab54ef",
        "name": "Deep Home Clean",
        "price": 120
      },
      "userName": "John Doe",
      "date": "2026-06-15T09:00:00.000Z",
      "address": "123 Main St, New York, NY",
      "email": "john.doe@example.com",
      "phone": "+1 (555) 019-2834",
      "status": "Pending"
    }
  ]
  ```

#### `PATCH /api/bookings/:id/complete`
- **Description:** Toggle booking status to "Completed".
- **Access:** Protected (Requires Header authentication)
- **Headers:** `x-admin-token: admin_secret_2026`
- **Response Format:** Returns the updated booking object with status set to `"Completed"`.

#### `DELETE /api/bookings/:id`
- **Description:** Permanently delete a booking entry from the database.
- **Access:** Protected (Requires Header authentication)
- **Headers:** `x-admin-token: admin_secret_2026`
- **Response Format (`200 OK`):**
  ```json
  { "message": "Booking deleted" }
  ```

---

### 3. Authentication & Users

#### `POST /api/auth/register`
- **Description:** Register a new user account.
- **Access:** Public
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securepassword123"
  }
  ```
- **Response Format (`200 OK`):** Returns success status, a JWT `token`, and a `user` object.

#### `POST /api/auth/login`
- **Description:** Authenticate a user and receive a token.
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "jane@example.com",
    "password": "securepassword123"
  }
  ```
- **Response Format (`200 OK`):** Returns success status, a JWT `token`, and a `user` object.

#### `GET /api/auth/me`
- **Description:** Retrieve the currently authenticated user's profile data.
- **Access:** Protected (Requires Bearer Token authentication via `Authorization` header)
- **Response Format:** Returns the `user` object.

---

### 4. Customer Reviews

#### `GET /api/reviews`
- **Description:** Retrieve all glowing customer reviews, sorted by creation date (newest first).
- **Access:** Public
- **Response Format:**
  ```json
  [
    {
      "_id": "664c3cfa4ab21e0015ab2802",
      "authorName": "Sarah Jenkins",
      "rating": 5,
      "comment": "Absolutely flawless! SparkleClean transformed my home...",
      "avatar": "https://images.unsplash.com/...jpeg",
      "serviceName": "Deep Home Clean",
      "createdAt": "2026-05-29T03:05:00.000Z"
    }
  ]
  ```

#### `POST /api/reviews`
- **Description:** Allow verified clients to post new reviews directly. Auto-generates high-end avatar images on submission.
- **Access:** Public
- **Request Body:**
  ```json
  {
    "authorName": "Jessica Chen",
    "rating": 5,
    "comment": "Outstanding oven degreasing! Will book every spring.",
    "serviceName": "Kitchen Intensive"
  }
  ```

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
