<img width="1864" height="908" alt="image" src="https://github.com/user-attachments/assets/ec3ccda5-7e90-4db0-a2b0-0592fe3743bf" />

<img width="1893" height="899" alt="image" src="https://github.com/user-attachments/assets/828daf9e-9ed9-4f32-a24b-dc0cbfd911d5" />

<img width="1877" height="894" alt="image" src="https://github.com/user-attachments/assets/b736e044-5037-4962-bb35-ab65ae120ada" />

<img width="1402" height="734" alt="image" src="https://github.com/user-attachments/assets/04fe4731-4a0b-41f9-92b9-fc3f217574a2" />

<img width="1228" height="380" alt="image" src="https://github.com/user-attachments/assets/41885d41-53e4-4d3e-b4ba-d6b6eede036e" />



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

## ⚙️ Project Structure

flask-react-template/
│
├── backend/
│ ├── app.py # Flask app
│ ├── models.py # SQLAlchemy models
│ └── routes/
│ └── comments.py # Comments API routes
│
├── frontend/
│ ├── src/
│ │ ├── App.js # Main React app
│ │ └── Comments.js # Comments component
│ ├── public/
│ └── package.json
│
└── README.md

yaml
Copy
Edit

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
