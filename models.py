""" Models for DB"""
from app import db
# pylint: disable=too-few-public-methods
# Doesn't detect methods from DB classes
# pylint: disable=too-many-arguments
# DB classes will take many arguments


class Posts(db.Model):
    """Posts class that interacts with posts made in the webapp"""
    id = db.Column(db.Integer, primary_key=True)
    itemname = db.Column(db.String(225))
    imageurl = db.Column(db.String(225))
    pricehist = db.Column(db.String(400))
    username = db.Column(db.String(225))
    pfp = db.Column(db.String(225))
    time = db.Column(db.String(225))

    def __init__(self, itemname, imageurl, pricehist, username, pfp, time):
        """Initializes the Post object with its attributes"""
        self.itemname = itemname
        self.imageurl = imageurl
        self.pricehist = pricehist
        self.username = username
        self.pfp = pfp
        self.time = time
