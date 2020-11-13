"""
Handles the database writes for app
"""
import os
import dotenv
import psycopg2
import flask_sqlalchemy
import models
from app import db 
import urllib.parse as urlparse

DATABASE_URI = os.environ["DATABASE_URL"]
url = urlparse.urlparse(DATABASE_URI)

SQL_USER = url.username
SQL_PWD = url.password
SQL_DB = url.path[1:]
DBUSER = url.hostname

def price_write(price_data):
    """Posts price history to DB"""
    price_list = price_data['priceHistory']
    price_list_str = ''
    for entry in price_list:
        price_list_str += entry['price_date'] + ' - ' + str(entry['price']) + ' '
    item = price_data['title']
    imageurl = price_data['imgurl']
    poster = price_data['user']
    pfp = "temp profile picture"
    time = price_data['time']
    db.session.add(models.Posts(item,imageurl,price_list_str, poster, pfp, time))
    
        
def get_posts(username):
    """fetches posts from DB"""
    rows = db.session.query.filter_by(username=username).all()
    item_data = {
            'itemname': rows[0][1], 
            'imgurl': rows[0][2], 
            'pricehistory': rows[0][3], 
            'user': rows[0][4], 
            'pfp': rows[0][5],
            'time': rows[0][6]
    }
