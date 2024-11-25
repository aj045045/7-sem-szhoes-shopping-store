## INSTALLED

Flask
Flask-Talisman
python-dotenv
Flask-SSLify
Flask-Cors
Flask-Restful

## NOT INSTALLED

Flask-JWT-Extended
Cloudinary

## PYTHON PACKAGE

Tensorflow
Keras
LangChain
Hugging face
Plotly
OpenNN
PyBrain
IBM Watson

## LOGIN CONSTRAINT - Using Session

if user is customer:
    can use any path related to customer
if user is admin:
    session[role] == (role1, role2)
    request.path.startswith(session[role])
if user not logged in:
    only access auth route


