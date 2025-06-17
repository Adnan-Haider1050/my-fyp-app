# Service Seek & Solve

A full-stack web application built with **Angular 15 (frontend)** and **Node.js + Express (backend)** to help users find and offer local services like electricians, plumbers, and more.

---

## 📦 Project Structure

```
/Service_Seek_Solve
│
├── frontend/          # Angular App (v15)
└── backend/           # Node.js + Express API
```

---

## ✅ Requirements

| Tool             | Recommended Version |
|------------------|---------------------|
| Node.js          | v16+                |
| npm              | v8+ (comes with Node) |
| Angular CLI      | v15.2.11            |
| Git              | Any stable version  |

---

## 🛠️ Frontend Setup (Angular)

### 📁 Navigate to the frontend folder:

```bash
cd frontend
```

### 📥 Install Angular CLI globally (if not already):

```bash
npm install -g @angular/cli@15.2.11
```

### 📥 Install dependencies:

```bash
npm install
```

### 🚀 Run the Angular app:

```bash
ng serve
```

Open your browser at [http://localhost:4200](http://localhost:4200)

---

### 🧩 Frontend Libraries Used

| Library                      | Purpose                          |
|-----------------------------|----------------------------------|
| `@angular/*`                | Core Angular Framework           |
| `@ngx-translate/*`          | Language translation (i18n)      |
| `sweetalert2`               | Alert & confirmation popups      |
| `tailwindcss`, `postcss`    | UI styling with Tailwind         |
| `uuid`                      | Generate unique IDs              |
| `d3`                        | Data visualization (if used)     |

---

## 🛠️ Backend Setup (Node.js + Express)

### 📁 Navigate to the backend folder:

```bash
cd backend
```

### 📥 Install dependencies:

```bash
npm install
```

### ⚙️ Create `.env` file:

Create a file named `.env` in the backend root folder with variables like:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_jwt_secret
```

### 🚀 Start the backend server:

```bash
node index.js
```

The backend will run on [http://localhost:3000](http://localhost:3000) (or your chosen port).

---

### 🔐 Backend Libraries Used

| Library        | Purpose                                  |
|----------------|------------------------------------------|
| `express`      | Server framework                         |
| `mongoose`     | MongoDB database connection              |
| `jsonwebtoken` | JWT authentication                       |
| `bcryptjs`     | Password hashing                         |
| `multer`       | File/image upload                        |
| `cors`         | Cross-origin requests                    |
| `dotenv`       | Manage environment variables             |
| `body-parser`  | Parse incoming request bodies            |
| `axios`        | Handle HTTP requests from server         |

---

## 🚀 How to Deploy (Optional)

### 🧑‍💻 Frontend:
- Can be deployed on **Vercel**, **Netlify**, or **GitHub Pages**

### 🌐 Backend:
- Can be deployed on **Render**, **Railway**, or **VPS** (like DigitalOcean)
- MongoDB recommended to be hosted on **MongoDB Atlas**

---

## 📌 Notes

- Make sure both frontend and backend are running on correct ports.
- Enable CORS in backend for Angular communication.
- Update `.env` and `proxy.conf.json` if needed during deployment.

---

## 👨‍💻 Author

Adnan Haider  
[GitHub: Adnan-Haider1050](https://github.com/Adnan-Haider1050)
