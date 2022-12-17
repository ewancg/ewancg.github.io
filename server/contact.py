from flask import Flask, render_template

app = Flask(__name__)

@app.route('/discord')
def discord():
    return "Ewan Green#1526"

@app.route('/slack')
def slack():
    return "ewan@ewan.horse"

@app.route('/email')
def email():
    return "ewangreen95@gmail.com"
    
    

if __name__ == '__main__':
    app.run()