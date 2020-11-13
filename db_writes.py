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

DOTENV_PATH = os.path.join(os.path.dirname(__file__), "secret_tokens.env")
dotenv.load_dotenv(DOTENV_PATH)

DATABASE_URI = os.environ["HEROKU_POSTGRESQL_BLACK_URL"]
url = urlparse.urlparse(DATABASE_URI)

SQL_USER = url.username
SQL_PWD = url.password
SQL_DB = url.path[1:]
DBUSER = url.hostname

#con = psycopg2.connect(database=SQL_DB, user=SQL_USER, password=SQL_PWD, host=DBUSER)


def price_write(price_data):
    """
    with con:
        cur = con.cursor()
        price_list = price_data['priceHistory']
        price_list_str = ''
        for entry in price_list:
            price_list_str += entry['price_date'] + ' - ' + str(entry['price']) + ' '
        item = price_data['title']
        imageurl = price_data['imgurl']
        poster = price_data['user']
        pfp = "temp profile picture"
        time = price_data['time']
        cur.execute("INSERT INTO posts (itemname, imageurl, pricehist, username, pfp, time) VALUES (%s, %s, %s, %s, %s, %s);", (item, imageurl, price_list_str, poster, pfp, time))
    """
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
    """
    with con:
        cur = con.cursor()
        cur.execute(f"SELECT * FROM posts WHERE username = '{username}'")
        rows = cur.fetchall()
        item_data = {
            'itemname': rows[0][1], 
            'imgurl': rows[0][2], 
            'pricehistory': rows[0][3], 
            'user': rows[0][4], 
            'pfp': rows[0][5],
            'time': rows[0][6]
            }
        return item_data
    """
    rows = db.session.query.filter_by(username=username).all()
    item_data = {
            'itemname': rows[0][1], 
            'imgurl': rows[0][2], 
            'pricehistory': rows[0][3], 
            'user': rows[0][4], 
            'pfp': rows[0][5],
            'time': rows[0][6]
    }
