from flask import jsonify, request
from database import app
from controllers.user_controller import UserController

def init_routes():

    @app.route('/')
    def index():
        return jsonify(message='Hello World!')

    @app.route('/users', methods=['GET'])
    def get_users():
        return UserController().get_users()

    @app.route('/users/<uid>', methods=['GET'])
    def get_user(uid):
        return UserController().get_user(uid)

    @app.route('/users', methods=['POST'])
    def create_user():
        data = request.get_json()
        return UserController().create_user(data)
