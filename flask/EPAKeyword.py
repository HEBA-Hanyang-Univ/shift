from config import EPA_KEYWORD_FILE

class EPAKeyword :
    def __init__(self):
        f = open(EPA_KEYWORD_FILE, "r", encoding='UTF-8')
        self.keyword_list = [elem for elem in f.read().splitlines() if len(elem) > 2 and elem[0] != '#']
        print('read keywords.txt file successful') 
        f.close()

        self.keyword_dict = {}
        for i in range(len(self.keyword_list)):
            if i < 13 :
                self.keyword_dict[i+1] = self.keyword_list[i].split(',')
            else :
                self.keyword_dict[i+2] = self.keyword_list[i].split(',')

    def get_dict(self):
        return self.keyword_dict
    
    def get_list(self):
        return self.keyword_list


if __name__ == "__main__" :
    k = EPAKeyword()
    print(k.get_dict())
