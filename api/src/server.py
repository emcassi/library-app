from database import app, db
from router import init_routes

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        init_routes()
    app.run()
