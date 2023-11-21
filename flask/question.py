class Question :
    def __init__(self):
        f = open("resources/question_list.txt", "r")
        self.question_list = [elem for elem in f.read().splitlines() if len(elem) > 5]
        f.close()
        self.question_dict = dict()
        for i in range(0, len(self.question_list)):
            self.question_dict[i+1] = self.question_list[i]

    def get_dic(self):
        return self.question_dict

# if __name__ == "__main__" :
#     q = Question()
#     print(q.get_dic())