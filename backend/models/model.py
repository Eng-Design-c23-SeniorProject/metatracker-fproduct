#database models
from mongoengine import Document, StringField, FileField

class PDFFile(Document):
    name = StringField(required=True)
    data = FileField(required=True)
    sha256_hash = StringField(required=True)

class ImageFile(Document):
    name = StringField(required=True)
    data = FileField(required=True)
    sha256_hash = StringField(required=True)
    labels = StringField()

class TextFile(Document):
    name = StringField(required=True)
    data = StringField(required=True)
    sha256_hash = StringField(required=True)

class VideoFile(Document):
    name = StringField(required=True)
    data = FileField(required=True)
    sha256_hash = StringField(required=True)

class DocFile(Document):
    name = StringField(required=True)
    data = FileField(required=True)
    sha256_hash = StringField(required=True)
