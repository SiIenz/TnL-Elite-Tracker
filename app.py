from flask import Flask, render_template
from flask_talisman import Talisman

app = Flask(__name__)
Talisman(app, content_security_policy={
    'default-src': "'self'",
    'script-src': "'self' 'unsafe-inline'",
})

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/shadowed_crypt')
def shadowed_crypt():
    return render_template('shadowed_crypt.html')

@app.route('/sanctum_of_desire')
def sanctum_of_desire():
    return render_template('sanctum_of_desire.html')

if __name__ == '__main__':
    app.run(debug=True)
