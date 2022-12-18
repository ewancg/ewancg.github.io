from flask import Flask, render_template
from time import sleep

app = Flask(__name__)

@app.route('/get/discord')
def discord():
    return "Ewan Green#1526"

@app.route('/get/slack')
def slack():
    return "ewan@ewan.horse"

@app.route('/get/email')
def email():
    return "ewangreen95@gmail.com"

if __name__ == '__main__':
    app.run()