from database import db

class User(db.Model):
    uid = db.Column(db.String(32), primary_key=True)
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    email = db.Column(db.String(255), unique=True)
    photo_url = db.Column(db.String(255), nullable=True)

    def __init__(self, uid, first_name, last_name, email):
        self.uid = uid
        self.first_name = first_name
        self.last_name = last_name
        self.email = email

    def serialize(self):
        return {
            'uid': self.uid,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'photo_url': self.photo_url
        }
