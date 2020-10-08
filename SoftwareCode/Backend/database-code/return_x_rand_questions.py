from pymongo import MongoClient # library for connecting with MongoDB
import random # to get random number

# pprint library is used to make the output look more pretty
from pprint import pprint

# connect to MongoDB
dburi = "mongodb://team6-mongodb:4LITWMsMLAzi1w4rZbuOo0wgaaUlFk0nO3WMj1riXjsnL0rkZqmRgeX0oVnWTHOhlOgr7NX6H97S00pwfgWxlA==@team6-mongodb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@team6-mongodb@"
client = MongoClient(dburi)

my_db = client["questions"] # db name

my_col = my_db["questions"] # db collection

numQuests = 10 # number of questions to get
questIDs = []
max_ID = (my_col.count_documents({})) + 1

pprint("Max number is: ")
pprint(max_ID)

# while loop to get the required number of random IDs, while also not accepting duplicates
num = 0
while num < numQuests:
    newNum = False
    newRand = 0
    while newNum != True:
        newRand = random.choice(range(1, max_ID))
        temp = 0
        while temp < len(questIDs):
            if newRand != questIDs[temp]:
                newNum = True
                break
            temp = temp + 1
        questIDs.append(newRand)
        num = num + 1

# print the IDs generated
pprint(questIDs)

# depreciated - create a list to hold the questions & get them from database
# tempQuests = []
# tempQuests = my_col.find({}, {"_id":0})
# pprint(tempQuests)

# create a list to hold questions & get from database, transfer the questions we want (according to IDs generated) into a new list & get rid of original
randQuests = []
for ID in questIDs:
    quest = list(my_col.find({"id" : int(ID)}, {"_id":0}))
    randQuests.append(quest)
    # randQuests.append(tempQuests[ID])
# del tempQuests

# print the questions that have been selected
for quest in randQuests:
    pprint(quest)