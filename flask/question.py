
class Question :
    def __init__(self):
        f = open("resources/question_list.txt", "r")
        self.question_list = [elem for elem in f.read().splitlines() if len(elem) > 5]
        print('read question_list.txt file successful') 
        f.close()

    def get_list(self):
        return self.question_list


if __name__ == "__main__" :
    q = Question()
    print(q.get_list())
