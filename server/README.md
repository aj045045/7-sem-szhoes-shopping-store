## INSTALLED

Flask
Flask-Talisman
python-dotenv
Flask-SSLify
Flask-Cors
Flask-Restful

## NOT INSTALLED

Flask-JWT-Extended


<!-- PYTHON PACKAGE -->
Tensorflow
Keras
LangChain
Hugging face
OpenNN
PyBrain
IBM Watson

# Role Based login
Use Session and before request for this

<!-- LOGIN CONSTRAINT -->
if user is customer:
    can use any path related to customer
if user is admin:
    session[role] == (role1, role2)
    request.path.startswith(session[role])
if user not logged in:
    only access auth route


