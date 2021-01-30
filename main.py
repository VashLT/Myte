from flask import Flask, render_template
from flask_assets import Environment, Bundle

app = Flask(__name__)

# SCSS rendering
assets = Environment(app)
assets.url = app.static_url_path
assets.debug = True

scss = Bundle('sass\style.sass', filters='pyscss', output='gen/style.css')
assets.register('scss_all', scss)


@app.route('/')
def home():
    return render_template("myte/home.html")


@app.route('/login')
def login():
    return "<h1>login</h1>"


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000)
