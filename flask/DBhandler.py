# YOU MUST MODIFY pyrebase.py due to gcloud error.
# gcloud is no longer supported, so you need to modify pyrebase.py
# install google-cloud-storage and modify pyrebase.py
# from gcloud import storage -> from google.cloud import storage
import pyrebase
from config import FIREBASE_CONFIG
from dataclasses import asdict, dataclass

@dataclass
class UserProperty:
    name: str = 'unknown'
    email: str = 'unknown'
    age_range: str = 'unknown'
    gender: str = 'unknown'
    phone_number: str = 'unknown'


class DBModule:
    def __init__(self):
        firebase = pyrebase.initialize_app(FIREBASE_CONFIG)
        self.db = firebase.database()

    def register(self, platform_type, id, user_property: UserProperty):
        info = asdict(user_property)
        self.db.child("users").child(platform_type).child(id).set(info)

    def verification(self, platform_type, id):
        user = self.db.child("users").child(platform_type).child(id).get().val()
        if user == None:
            return False
        else:
            return True

    def get_user_property(self, platform_type, id):
        return self.db.child("users").child(platform_type).child(id).get().val()

    # if user is not registered, register user and return False
    def sign_in(self, platform_type, id, user_property: UserProperty = None):
        if not self.verification(platform_type, id):
            if user_property == None:
                user_property = UserProperty()
            self.register(platform_type, id, user_property)
            return False
        else:
            original_prop = self.db.child("users").child(platform_type).child(id).get().val()
            diff_prop = {k: v for k, v in asdict(user_property).items() if original_prop.get(k) != v}
            if diff_prop:
                self.db.child("users").child(platform_type).child(id).update(diff_prop)

        return True

    def save_test(self):
        pass

    def get_test(self, tid):
        pass

    def get_user(self, uid):
        pass
