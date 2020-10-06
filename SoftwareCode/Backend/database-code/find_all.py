from pymongo import MongoClient

# pprint library is used to make the output look more pretty
from pprint import pprint

# connect to MongoDB
dburi = "mongodb://team6-mongodb:4LITWMsMLAzi1w4rZbuOo0wgaaUlFk0nO3WMj1riXjsnL0rkZqmRgeX0oVnWTHOhlOgr7NX6H97S00pwfgWxlA==@team6-mongodb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@team6-mongodb@"
client = MongoClient(dburi)

my_db = client["questions"] # db name

my_col = my_db["questions"] # db collection

# print out contents of database again, to check that the data has been inserted
my_docs = my_col.find({})

for doc in my_docs:
    pprint(doc)