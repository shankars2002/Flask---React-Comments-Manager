from flask import Flask
from flask_cors import CORS
from models import db
from routes.comments import comments_bp   # ✅ important

app = Flask(__name__)

# ✅ Allow all methods for all routes
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()

# ✅ Register blueprint
app.register_blueprint(comments_bp, url_prefix="/api/comments")

if __name__ == "__main__":
    app.run(debug=True)
