# Flask + React Comments Manager

A full-stack application to **add, edit, delete comments** using Flask for backend APIs and React for frontend. The project features a modern, responsive UI and demonstrates CRUD operations with RESTful APIs.

---

## 📝 Features

- Add new comments
- Edit existing comments
- Delete comments
- Real-time updates in the UI
- Loading and error handling
- Modern responsive UI

---

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Flask, Flask-CORS
- **Database:** SQLite (can be switched to PostgreSQL/MySQL)
- **Testing:** Pytest (for backend APIs)

---

---

## 🚀 Setup & Run Locally

### Backend (Flask)

1. Navigate to backend folder:
```bash
cd backend
Create virtual environment:


python -m venv venv
source venv/bin/activate    # Linux/Mac
venv\Scripts\activate       # Windows
Install dependencies:


pip install -r requirements.txt
Run the backend:


python app.py
Backend runs at http://127.0.0.1:5000/api/comments/

Frontend (React)
Navigate to frontend folder:

cd frontend
Install dependencies:

npm install
Start the React app:


npm start
Frontend runs at http://localhost:3000

🧪 Testing Backend APIs
Tests are in backend/tests/ (using pytest)

Run tests:

pytest -v
