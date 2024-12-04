from mongoengine import Document, StringField

class FaqModel(Document):
    question = StringField(required=True)
    answer = StringField(required=True)
    meta = {
        'collection': 'faq'
    }
