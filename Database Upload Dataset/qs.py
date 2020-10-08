from mongodb_insertmany import upload
import random, os, ftfy


##searches the categories folder and returns all the files in there (they contain questions)
def getQuestionFiles():
    files = []
    for file in os.listdir(os.curdir + "\categories"):
        if ".txt" in file: files.append(file)

    return files


##reads the dataset and gets all the info from it. questionLimit is to limit how many questions get read from the questions file (-1 is no limit)
def getQuestions(filename, questions, questionLimit):
    if questionLimit == -1: questionLimit = 1000000000

    if verbose:
        file = open("categories\\" + filename, "r", encoding="latin-1")
        print("question file: \t\t\t " + filename)
        print("number of counted questions: \t", file.read().count("#Q"))
        file.close()
    
    file = open("categories\\" + filename, "r", encoding="latin-1")
    rawQuestions = file.readlines()

    numberOfNewQuestions = 0
    
    for i in range(len(rawQuestions)):
        if len(questions) >= questionLimit: break

        question = {"id":           "blank",                                                        ##question dictionary
                    "question":     "blank",                                                        
                    "correct_ans":  "blank",
                    "answer_a":     "blank",
                    "answer_b":     "blank",
                    "answer_c":     "blank",
                    "answer_d":     "blank",
                    "category":     "blank"}

        
        question["question"] = rawQuestions[i]                                                      ##reads in the question string
        if question["question"] == "": question["question"] = "@"                                   ##checks if the string is empty and if so, replaces it with "@"
        if not question["question"][0] == "#":      continue                                        ##if the string does not start with the correct symbol this iteration fails and the question is dropped
        question["question"] = question["question"].replace("#Q ", "").replace("\n", "")            ##otherwise the string gets cleaned up
        
        question["correct_ans"] = rawQuestions[i + 1]                                               ##reads in the answer string
        if question["correct_ans"] == "": question["correct_ans"] = "@"
        if not question["correct_ans"][0] == "^":   continue
        question["correct_ans"] = question["correct_ans"].replace("^ ", "").replace("\n", "")
        
        question["answer_a"] = rawQuestions[i + 2]                                                  ##reads in the choice A string
        if question["answer_a"] == "": question["answer_a"] = "@"
        if not question["answer_a"][0] == "A":      continue
        question["answer_a"] = question["answer_a"].replace("A ", "").replace("\n", "")
        
        question["answer_b"] = rawQuestions[i + 3]                                                  ##reads in the choice B string
        if question["answer_b"] == "": question["answer_b"] = "@"
        if not question["answer_b"][0] == "B":      continue
        question["answer_b"] = question["answer_b"].replace("B ", "").replace("\n", "")
        
        question["answer_c"] = rawQuestions[i + 4]                                                  ##reads in the choice C string
        if question["answer_c"] == "": question["answer_c"] = "@"
        if not question["answer_c"][0] == "C":      continue
        question["answer_c"] = question["answer_c"].replace("C ", "").replace("\n", "")
        
        question["answer_d"] = rawQuestions[i + 5]                                                  ##reads in the choice D string
        if question["answer_d"] == "": question["answer_d"] = "@"
        if not question["answer_d"][0] == "D":      continue
        question["answer_d"] = question["answer_d"].replace("D ", "").replace("\n", "")

        question["category"] = filename.replace(".txt", "")                                         ##the category is the filename without the extension

        question["id"] = numberOfNewQuestions


        for k, v in question.items():
            if k != "id" and k != "category":
                question[k] = ftfy.fix_encoding(v)                                                  ##fixes all the messed up foreign characters, thank god
        
        i += 5
        numberOfNewQuestions += 1
        questions.append(question)                                                                  ##after each string gets checked and cleaned up the question dictionary then gets submitted to the questions array

    if verbose: print("number of saved questions: \t", numberOfNewQuestions, "\n")
    
    return questions

    
##iterates through all question files and return all the questions from them
def getAllQuestions(questionLimit):
    files = getQuestionFiles()
    allQuestions = []
    for file in files:
        allQuestions = getQuestions(file, allQuestions, questionLimit)
    
    if verbose: print("total questions: \t\t", len(allQuestions), "\n")

    return allQuestions


    
##iterates through the questions and outputs them to the console
def printQuestions(questions):
    for i in range(len(questions)):
        for k, v in questions[i].items():
##            if k == "question":
##                print(str(i+1) + ") ", end="")
            print(v)

        print()
        print()



##returns a given amount of random questions
def selectSomeQuestions(allQuestions, amount):
    indexes = random.sample(range(len(allQuestions)), amount)
    
    someQuestions = []
    count = 1
    for i in indexes:
        if i == []: break
        someQuestions.append(allQuestions[i])
        someQuestions[count - 1]["id"] = count
        count += 1

    return someQuestions


##main
def main():
    allQuestions = getAllQuestions(questionLimit)
    someQuestions = selectSomeQuestions(allQuestions, numberOfQuestions)
##    upload(someQuestions, output, verbose)

##    printQuestions(someQuestions)
##    print(printQuestions(getQuestions("q.txt", [], 100)))

if __name__ == "__main__":
    ##global variables
    verbose = True              ##prints some extra info to the console
    output = False               ##prints the data of the uploaded questions to the console
    numberOfQuestions = 500     ##the number of questions to upload to the database
    questionLimit = -1          ##maximum amount of questions to read from one file (-1 is inf)
    
    main()








