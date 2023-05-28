from models.user import User
from database import db
from flask import jsonify

class UserController:

    def create_user(self, data):
        user = User(data['uid'], data['first_name'], data['last_name'], data['email'])
        db.session.add(user)
        db.session.commit()
        return jsonify(user.serialize())

    def get_users(self):
        users = User.query.all()
        return jsonify(users=[user.serialize() for user in users])

    def get_user(self, uid):
        user = User.query.filter_by(uid=uid).first()
        return jsonify(user.serialize())


