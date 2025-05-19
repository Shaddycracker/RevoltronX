
# 📝 MERN Stack Blog App

A full-stack blog application built with **React.js** on the frontend and **Node.js + Express.js** on the backend. It uses **MongoDB Atlas** as the database and follows a clean monorepo structure with `frontend` and `backendBlog` directories. The project uses **Yarn** as the package manager and supports modern development practices.

---

## 🔧 Modules & Technologies

### 🔹 Frontend

- **React.js** – SPA framework
- **Vite** or **Create React App** (based on setup)
- **Material UI** – For modern and responsive UI components
- **React Router** – Client-side routing
- **dotenv** – Manage environment variables

### 🔹 Backend

- **Node.js** & **Express.js** – RESTful API framework
- **MongoDB Atlas** – Cloud-based NoSQL database
- **Mongoose** – ODM for MongoDB
- **dotenv** – Manage sensitive environment variables

---

## 📁 Project Structure

```

monstac/
├── backendBlog/
│   ├── src/
│   │   ├── api-blog/         # Blog-related controllers
│   │   ├── api-user/         # Auth/user-related controllers
│   │   ├── config/           # DB config and environment setup
│   │   ├── handlers/         # Reusable error/response handlers
│   │   ├── middleware/       # Auth, error handling, etc.
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # Express routes
│   │   └── server.ts         # Main server entry point
│   ├── .env.example
│   └── package.json          # Includes nodemon, tsconfig, prettier
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/              # Axios services
│   │   ├── assets/           # Images, logos, etc.
│   │   ├── components/       # UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Route views
│   ├── .env.example
│   └── package.json
│
├── README.md
└── package.json              # Optional root script holder

````

---

## 📦 API Endpoints

### 📚 Blog Routes

| Method | Endpoint                     | Description                                |
|--------|------------------------------|--------------------------------------------|
| POST   | `/api/blogs/save-draft`      | Save or update a draft (5000 ms timeout)   |
| POST   | `/api/blogs/publish`         | Save and publish an article                |
| GET    | `/api/blogs`                 | Retrieve all published blogs               |
| GET    | `/api/blogs/:id`             | Retrieve a blog by ID (for edit)           |
| GET    | `/api/blog/view/:id`         | View blog by ID                            |
| GET    | `/api/blog/user/blog`        | Retrieve current user's blogs (draft + published) |

### 👤 Auth Routes

| Method | Endpoint          | Description                         |
|--------|-------------------|-------------------------------------|
| POST   | `/api/auth/login` | Log in an existing user             |
| POST   | `/api/auth/register` | Register a new user             |
| GET    | `/api/auth/me`    | Persist logged-in user on refresh   |

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js installed
- MongoDB (local or Atlas)
- Yarn package manager
- Recommended: VS Code or any modern IDE

### 1. Clone the Repository

```bash
git clone https://github.com/Shaddycracker/RevoltronX.git
cd RevoltronX
````

### 2. Install Dependencies

Install all dependencies using **Yarn**:

```bash
yarn install
cd frontend && yarn install
cd ../backendBlog && yarn install
```

### 3. Setup Environment Variables

Copy the sample env files and fill in required values:

```bash
cp frontend/.env.example frontend/.env
cp backendBlog/.env.example backendBlog/.env
```

Update the `.env` files with appropriate environment-specific values.

### 4. command to start 

  yarn dev in both folders 

### 5. Run the Application Locally

#### Frontend

```bash
cd frontend
yarn dev       # Starts frontend on http://localhost:5173
```

#### Backend

```bash
cd backendBlog
yarn dev       # Starts backend on http://localhost:8000 (or your specified port)
```

---

## 🌐 Live Demo

Can't set up locally? Visit the live version:

🔗 **Frontend (Vercel)**: [https://revoltron-x-seven.vercel.app/](https://revoltron-x-seven.vercel.app/)
🔗 **Backend (Render)**: Deployed, may take \~1 minute to wake up on first request

---



> Use `yarn` instead of `npm` for better compatibility across the project.

---

## 🧹 Code Quality

* **Prettier**: For code formatting
* **TypeScript**: In backend for static typing and better maintainability
* **ESLint**: (Optional) Add for linting consistency

---

## 📝 License

This project is open-source and licensed under the MIT License.

---

## 👤 Author

**Shadab Ali** ([@Shaddycracker](https://github.com/Shaddycracker))

