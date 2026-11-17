# Module 02 – Backend Development (Blog Application)

A beginner-friendly REST API built with **Node.js, Express.js and MongoDB**. It includes user registration, login, JWT authentication, and blog CRUD operations.

## 1. Requirements
- Node.js LTS and npm
- MongoDB Community Server running locally, or a MongoDB Atlas connection string
- VS Code (recommended)

Check Node and npm:
```bash
node -v
npm -v
```

## 2. Install and configure
1. Extract this ZIP and open the `module02-backend` folder in VS Code.
2. Open the terminal in that folder.
3. Install packages:
```bash
npm install
```
4. Create a file named `.env` in the project root. Copy the values from `.env.example` and update `JWT_SECRET`. Keep `.env` private; do not upload it to GitHub.
5. Make sure MongoDB is running. The default local database URL is already shown in `.env.example`.

Example `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/internship_blog
JWT_SECRET=my_long_private_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

## 3. Run the backend
Development mode (auto-restarts when files change):
```bash
npm run dev
```
Or normal mode:
```bash
npm start
```
Open `http://localhost:5000` in your browser. Expected response:
```json
{"message":"Blog API is running."}
```

## 4. API endpoints
Base URL: `http://localhost:5000/api`

| Method | Endpoint | Login required | Purpose |
|---|---|---:|---|
| POST | `/auth/register` | No | Register a user |
| POST | `/auth/login` | No | Log in and receive JWT |
| GET | `/auth/profile` | Yes | Get logged-in user's profile |
| GET | `/blogs` | No | Get all blogs |
| GET | `/blogs/:id` | No | Get one blog |
| POST | `/blogs` | Yes | Create a blog |
| PUT | `/blogs/:id` | Yes | Update your own blog |
| DELETE | `/blogs/:id` | Yes | Delete your own blog |

### Example request bodies
Register (`POST /auth/register`):
```json
{"name":"Test User","email":"test@example.com","password":"pass1234"}
```
Login (`POST /auth/login`):
```json
{"email":"test@example.com","password":"pass1234"}
```
Create blog (`POST /blogs`):
```json
{"title":"My First Blog","content":"This is my first blog post."}
```
For protected endpoints, add this HTTP header using the token returned by login/register:
```text
Authorization: Bearer YOUR_TOKEN_HERE
```

## 5. Test with Postman
1. Start the server and MongoDB.
2. In Postman, send `POST http://localhost:5000/api/auth/register` with Body → raw → JSON.
3. Copy the `token` from the response.
4. Send `POST http://localhost:5000/api/blogs` with JSON title/content and header `Authorization: Bearer TOKEN`.
5. Send `GET http://localhost:5000/api/blogs` to see saved blog posts.

## 6. Connect your frontend
See `examples/frontend-api.js` for ready-to-adapt `fetch()` functions for registration, login, listing blogs and creating a blog. Update `CLIENT_URL` in `.env` to match your frontend address (for example `http://localhost:5173` for Vite or `http://localhost:3000` for many React setups). Restart the backend after changing `.env`.

## 7. GitHub submission
From this project folder:
```bash
git init
git add .
git commit -m "Complete Module 02 backend development"
```
Create a new GitHub repository, then follow GitHub's instructions to add the remote and push. Do **not** commit `.env` or `node_modules`.

## Troubleshooting
- `MongoDB connection failed`: start MongoDB or check `MONGO_URI`.
- `npm is not recognized`: install Node.js LTS and reopen the terminal.
- `Invalid or expired token`: log in again and use the newest token in the Bearer header.
- Frontend CORS error: set `CLIENT_URL` to the exact frontend origin, then restart the server.

## Project structure
```text
module02-backend/
├── config/db.js
├── controllers/authController.js
├── controllers/blogController.js
├── examples/frontend-api.js
├── middleware/auth.js
├── models/User.js
├── models/Blog.js
├── routes/authRoutes.js
├── routes/blogRoutes.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```
