from question import Question
from pprint import pprint
from pymongo import MongoClient
from datetime import datetime

class SQ:
    def __init__(self):
        self.mbti = []  # str list
        self.desire = None
        self.interest = []  # str list
        self.experience = {
            "success_ex": [[], []],
            "failure_ex": [[], []],
            "future_goals": [[], []]
        }  # [[str, str, int = 외적동기 퍼센트], ...]
        self.values = []  # str list
        self.priorities = {
            "1st": [],
            "2nd": [],
            "3rd": []  # str list
        }
        self.motto = ""  # str
    
    @staticmethod
    def get_dic():
        return Question().get_dic()
        
    def get_desire(self, answer_list):
        question_dict = self.get_dic()
        for question_number, answer in enumerate(answer_list, start=1):
            question_dict[question_number] = answer
        self.desire = question_dict


# a = SQ()
# a.mbti = ["INTJ"]
# answer_list = [3, 1, 4] 
# a.get_desire(answer_list=answer_list)
# a.interest = ["programming", "reading"]
# a.experience["success_ex"] = [["Project A", "Team Lead", 30], ["Internship", "Software Developer", 20]]
# a.experience["failure_ex"] = [["Project B", "Failed Deadline", 70], ["Job Interview", "Rejected", 60]]
# a.experience["future_goals"] = [["Learn Machine Learning", "Build a Startup", 80]]
# a.values = ["Integrity", "Curiosity"]
# a.priorities["1st"] = ["Family", "Health"]
# a.priorities["2nd"] = ["Career", "Education"]
# a.priorities["3rd"] = ["Hobbies", "Social Life"]
# a.motto = "Learn as if you will live forever; live as if you will die tomorrow."
# b = dict()
# b['sq'] = a.__dict__

# print(b)
