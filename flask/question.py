<<<<<<< Updated upstream
class Question :
    def __init__(self):
        f = open("resources/question_list.txt", "r")
        self.question_list = [elem for elem in f.read().splitlines() if len(elem) > 5]
        f.close()
        self.question_dict = dict()
        for i in range(0, len(self.question_list)):
            self.question_dict[i+1] = self.question_list[i]
=======
import json
import os

my_dir = os.path.dirname(__file__)
json_file = os.path.join(my_dir, 'question_list.json')

def read_json_file(file_name):
    try:
        with open(file_name, "r", encoding="utf-8") as f:
            data = json.load(f)
            print('read {file_name} file successful')
    except FileNotFoundError:
        data = []
        with open(json_file, "w", encoding="utf-8") as f:
            json.dump(data, f)
            print('error while reading {file_name} file, so create a new {file_name}')
    return data

class Question :
    def __init__(self):
        self.question_list = read_json_file('question_list.json')
        print(self.question_list)
        # f = open("resources/question_list.txt", "r")
        # self.question_list = [elem for elem in f.read().splitlines() if len(elem) > 5]
        # print('read question_list.txt file successful')
        # f.close()
>>>>>>> Stashed changes

    def get_dic(self):
        return self.question_dict

# if __name__ == "__main__" :
#     q = Question()
#     print(q.get_dic())