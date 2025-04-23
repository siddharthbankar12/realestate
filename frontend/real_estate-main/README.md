# Real Estate Website

## Tech Stack Used

- **Frontend**

  - React
  - Vite

- **Backend**
  - Node.js
  - Express
  - MongoDB

---

## Directory Structure

```
Project Directory
├── node_modules
├── public
├── src
│   ├── components
│   ├── pages
│   └── (Other files)
├── (Other files)
└── real-estate-project-main
    └── backend
        ├── node_modules
        ├── controllers
        ├── models
        └── (Other files)
```

---

## Instructions to Run

### ✅ Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

---

### ⚙️ Run MongoDB Server

Navigate to your MongoDB installation directory:

```bash
cd C:\Program Files\MongoDB\Server\7.0\bin
mongod
```

---

### 🟢 Running the Project

#### ✅ Current Method – Run Frontend & Backend Simultaneously

We now use the `concurrently` package to run both servers at once.

Go to your **frontend project directory** and run:

```bash
npm install
npm start
```

Go to your **backend project directory** and run:

```bash
npm install
```

This starts:

- Frontend (Vite) at `http://localhost:5173/`
- Backend (Express) at `http://localhost:8000/` (or as configured)

#### `package.json` Scripts (Updated)

```json
"scripts": {
  "start": "concurrently \"npm run frontend\" \"npm run backend\"",
  "frontend": "vite",
  "backend": "node ./../../backend/real-estate-platform-main/backend/server.js",
  "build": "tsc && vite build",
  "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview"
}
```

📌 **Note:** You can modify the backend path or server file if needed.

---

### 🕒 Old Method – Run Frontend and Backend Separately

#### Run Frontend:

In the project root:

```bash
npm install
npm start
```

Accessible at:

```
http://localhost:5173/
```

#### Run Backend:

Navigate to:

```
ProjectDirectory/real-estate-project-main/backend
```

Then run:

```bash
npm install
node server.js
```

---

## 💬 Notes

- This project was previously run using only:

  ```json
  "start": "vite"
  ```

  and backend was started manually.

- Now updated to use:
  ```json
  "start": "concurrently \"npm run frontend\" \"npm run backend\""
  ```

✅ This makes development faster and easier by launching both servers together.

---

<!--
To preview and run the project:
1. Open project folder in [VS Code](https://code.visualstudio.com/download)
2. Run `npm install`
3. Run `npm start`
-->
