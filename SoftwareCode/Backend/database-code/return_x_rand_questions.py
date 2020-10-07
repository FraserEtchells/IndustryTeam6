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

num = 1

newRand = random.choice(range(1, max_ID))
questIDs.append(newRand)

pprint(questIDs)

while num < numQuests:
    newNum = False
    newRand = 0
    while newNum != True:
        pprint("Line 28")
        newRand = random.choice(range(1, max_ID))
        temp = 0
        pprint(questIDs[temp])
        pprint(len(questIDs))
        while temp < len(questIDs):
            pprint(temp)
            if newRand != questIDs[temp]:
                newNum = True
                pprint("Line 33")
                break
            temp = temp + 1
    questIDs.append(newRand)
    pprint(newRand)
    num = num + 1
    
pprint(questIDs)

tempQuests = []
tempQuests = my_col.find({}, {"_id":0})
# for ID in questIDs:
#     tempQuests.append(my_col.find({}, { "_id":0}))
randQuests = []
for ID in questIDs:
    randQuests.append(tempQuests[ID])

pprint(randQuests)
#for doc in my_docs:
 #   pprint(doc)