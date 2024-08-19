# YOU MUST MODIFY pyrebase.py due to gcloud error.
# gcloud is no longer supported, so you need to modify pyrebase.py
# install google-cloud-storage and modify pyrebase.py
# from gcloud import storage -> from google.cloud import storage
import pyrebase
from config import FIREBASE_CONFIG
from dataclasses import asdict, dataclass, field
from typing import Dict, List
from EPAKeyword import EPAKeyword
from datetime import datetime

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
    notified: bool = False
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
    keyword_selected: List = field(default_factory=list)
    keyword_detail: Dict = field(default_factory=dict)
    keyword_in_myself: List = field(default_factory=list)
    keyword_not_in_myself: List = field(default_factory=list)
    keyword_in_want: List = field(default_factory=list)
    keyword_not_in_want: List = field(default_factory=list)
    keyword_in_others: List = field(default_factory=list)
    keyword_not_in_others: List = field(default_factory=list)
    one_line_intro: str = 'unknown'
    reply_time: str = 'unknown' # some data that created before this field is added might not exist this field

class DBModule:
    def __init__(self):
        firebase = pyrebase.initialize_app(FIREBASE_CONFIG)
        self.db = firebase.database()
        self.keywords_epa = EPAKeyword().get_dict()

    def register(self, platform_type, id, user_property: UserProperty):
        info = asdict(user_property)
        self.db.child("users").child(platform_type).child(id).set(info)

        user_count = self.db.child("user_count").get().val()
        if user_count == None:
            user_count = {"total": 0, "KAKAO": 0, "NAVER": 0, "GOOGLE": 0}
        self.db.child("user_count").child("total").set(user_count.get("total") + 1)
        platform_user_count = user_count.get(platform_type, 0)
        self.db.child("user_count").child(platform_type).set(platform_user_count + 1)

    def get_user_count(self):
        return self.db.child("user_count").child("total").get().val()

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
                return False
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
        add = 1
        before = self.db.child("users").child(platform_type).child(id).child("tests").child("epa").child("tid").get().val()
        if before != 'unknown' and before != None:
            deprecated = {"date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
            self.db.child("tests").child("epa").child(before).child("deprecated").set(deprecated)
            add = 0

        # update user's test data
        data = {"tid": tid, "nickname": epa.nickname}
        self.db.child("users").child(platform_type).child(id).child("tests").child("epa").set(data)

        # update test count
        test_count = self.db.child("test_count").get().val()
        if test_count == None:
            test_count = {"total": 0, "epa": 0}
        self.db.child("test_count").child("total").set(test_count.get("total") + add)
        self.db.child("test_count").child("epa").set(test_count.get("epa") + add)

        return tid

    def get_test_count(self):
        return self.db.child("test_count").child("total").get().val()

    def save_epa_reply(self, tid, reply: EPAReply):
        # check tid is valid
        test = self.db.child("tests").child("epa").child(tid).get().val()
        if test == None:
            return False
        if test.get("deprecated") != None:
            return False

        info = asdict(reply)
        before = test.get('replies')

        if before == None:
            replies = [info]
        else:
            replies = before + [info]

        self.db.child("tests").child("epa").child(tid).child("replies").set(replies)

        reply_count = self.db.child("reply_count").get().val()
        if reply_count == None:
            reply_count = 0
        self.db.child("reply_count").set(reply_count + 1)
        return True

    def get_reply_count(self):
        return self.db.child("reply_count").get().val()

    def get_test_list(self, platform_type, id):
        return self.db.child("users").child(platform_type).child(id).child("tests").get().val()

    def get_epa_test(self, tid):
        return self.db.child("tests").child("epa").child(tid).get().val()

    def get_all_epa_keywords(self):
        return self.keywords_epa

    def update_epa_test(self, tid, epa: EPATest):
        info = asdict(epa)
        self.db.child("tests").child("epa").child(tid).update(info)