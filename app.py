from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
