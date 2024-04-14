# YOU MUST MODIFY pyrebase.py due to gcloud error.
# gcloud is no longer supported, so you need to modify pyrebase.py
# install google-cloud-storage and modify pyrebase.py
# from gcloud import storage -> from google.cloud import storage
import pyrebase
from config import FIREBASE_CONFIG
from dataclasses import asdict, dataclass, field
from typing import Dict, List

@dataclass
class UserProperty:
    name: str = 'unknown'
    email: str = 'unknown'
    age_range: str = 'unknown'
    gender: str = 'unknown'
    phone_number: str = 'unknown'
    tests: Dict = field(default_factory=dict)

@dataclass
class EPATest:
    owner_platform: str = 'unknown'
    owner_id: int = 0
    nickname: str = 'unknown'
    gender: str = 'unknown'
    age: int = 0
    notification_agree: bool = False
    keyword_myself: List = field(default_factory=list)
    keyword_want: List = field(default_factory=list)
    keyword_others: List = field(default_factory=list)
    replies: List = field(default_factory=list)

@dataclass
class EPAReply:
    anonymous: bool = False
    nickname: str = 'unknown'
    gender: str = 'unknown'
    relationship: str = 'unknown'
    age_range: str = 'unknown'
    keyword_selected: Dict = field(default_factory=dict)
    one_line_intro: str = 'unknown'

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

        original_prop = self.db.child("users").child(platform_type).child(id).get().val()
        diff_prop = {k: v for k, v in asdict(user_property).items() if k != 'tests' and original_prop.get(k) != v}
        if diff_prop:
            self.db.child("users").child(platform_type).child(id).update(diff_prop)
        return True

    #NOTE: if test data exists, remove the previous test result
    def save_epa_test(self, platform_type, id, epa: EPATest):
        epa.owner_platform = platform_type
        epa.owner_id = id
        info = asdict(epa)
        test_info = self.db.child("tests").child("epa").push(info)
        tid = test_info['name']

        # if test data exists, remove the previous test result
        before = self.db.child("users").child(platform_type).child(id).child("tests").child("epa").get().val()
        if before != 'unknown' and before != None:
            self.db.child("tests").child("epa").child(before).remove()

        # update user's test data
        self.db.child("users").child(platform_type).child(id).child("tests").child("epa").set(tid)

        return tid

    def save_epa_reply(self, tid, reply: EPAReply):
        # check tid is valid
        test = self.db.child("tests").child("epa").child(tid).get().val()
        if test == None:
            return False

        info = asdict(reply)
        before = test.get('replies')

        if before == None:
            replies = [info]
        else:
            replies = before + [info]

        self.db.child("tests").child("epa").child(tid).child("replies").set(replies)
        return True

    def get_test_list(self, platform_type, id):
        return self.db.child("users").child(platform_type).child(id).child("tests").get().val()

