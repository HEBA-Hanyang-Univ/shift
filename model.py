from pymongo import MongoClient
from datetime import datetime
from bson.objectid import ObjectId

# from bson import ObjectId

class UserModel:

    def __init__(self, connection_string='mongodb://localhost:27017/', database_name='shift', collection_name='user'):
        self.client = MongoClient(connection_string)
        self.db = self.client[database_name]
        self.collection = self.db[collection_name]

    # def custom_objectid_from_string(custom_id_string):
        # custom_objectid = ObjectId(custom_id_string)
        # return custom_objectid

    def upsert_user(self, user):
        if not self.collection.find_one({'id': str(user.id)}):
            self.collection.update_one(user.serialize(), {"$set":{'id' : str(user.id)}}, upsert=True)

    def get_user(self, user_id):
        user = self.collection.find_one({'id': str(user_id)})
        return UserData_N.deserialize(user)

    # def remove_user(self, user_id): 
    #     self.collection.delete_one({'id': str(user_id)})

class UserData_K:
    
    def __init__(self, user=None):
        if user:
            self.id = user.get('id')
            self.name = user.get('kakao_account').get('profile').get('nickname')
            self.platform_type = "kakao"
        else:
            self.id = None
            self.name = None
            self.platform_type = None

    def __str__(self):
        return "<UserData>(id:%s, name:%s)" \
                % (self.id, self.name)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "platform_type" : self.platform_type
        }

    @staticmethod
    def deserialize(user_data):
        user = UserData_N()
        user.id = user_data.get('id')
        user.name = user_data.get('name')
        user.platform_type = user_data.get('platform_type')
        return user

class UserData_G:
    
    def __init__(self, user=None):
        if user:
            self.id = user.get('sub')
            self.name = user.get('name')
            self.email = user.get('email')
            self.platform_type = "google"
        else:
            self.id = None
            self.name = None
            self.email = None
            self.platform_type = None

    def __str__(self):
        return "<UserData>(id:%s, name:%s)" \
                % (self.id, self.name)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email" : self.email,
            "platform_type" : self.platform_type
        }

    @staticmethod
    def deserialize(user_data):
        user = UserData_N()
        user.id = user_data.get('id')
        user.name = user_data.get('name')
        user.email = user_data.get('email')
        user.platform_type = user_data['platform_type']
        return user

class UserData_N:
    
    def __init__(self, user=None):
        if user:
            print('user :', user)
            user_info = user.get('response')
            self.id = user_info.get('id')
            self.name = user_info.get('name')
            if user_info.get('birthyear') : self.age = int(datetime.today().year) - int(user_info['birthyear']) + 1
            else : self.age = None
            self.gender = user_info.get('gender')
            self.email = user_info.get('email')
            self.phone_number = user_info.get('mobile')
            self.platform_type = "naver"
        else:
            self.id = None
            self.name = None
            self.age = None
            self.gender = None
            self.email = None
            self.phone_number = None
            self.platform_type = None

    def __str__(self):
        return "<UserData>(id:%s, name:%s)" \
                % (self.id, self.name)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "age" : self.age,
            "gender" : self.gender,
            "email": self.email,
            "phone_number" : self.phone_number,
            "platform_type" : self.platform_type
        }

    @staticmethod
    def deserialize(user_data):
        user = UserData_N()
        user.id = user_data.get('id')
        user.name = user_data.get('name')
        user.age = user_data.get('age')
        user.gender = user_data.get('gender')
        user.email = user_data.get('email')
        user.phone_number = user_data.get('phone_number')
        user.platform_type = user_data.get('platform_type')
        return user
