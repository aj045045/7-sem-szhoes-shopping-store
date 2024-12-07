## INSTALLED

    Flask
    Flask-Talisman
    python-dotenv
    Flask-SSLify
    Flask-Cors
    Flask-JWT-Extended
    Transformer
    Torch
    Pinecone
    pip install nltk spacy textblob transformers torch
    python -m spacy download en_core_web_sm

## NOT INSTALLED

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

```
gunicorn -c gunicorn.conf.py your_flask_app:app
```
