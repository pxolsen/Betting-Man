from django.core.exceptions import ValidationError
import re

def validate_username(username):
    error_message = "Improper name format"
    regex = r'^[a-zA-Z0-9_]+$'
    tested_username = re.match(regex, username)
    if tested_username:
        return username
    else:
        raise ValidationError(error_message, params={ 'username' : username})