from database import app, db
from router import init_routes
from flask_cors import CORS

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        init_routes()
        CORS(app)
    app.run()
