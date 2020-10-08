from pymongo import MongoClient
from pprint import pprint

client = MongoClient("mongodb://team6-mongodb:4LITWMsMLAzi1w4rZbuOo0wgaaUlFk0nO3WMj1riXjsnL0rkZqmRgeX0oVnWTHOhlOgr7NX6H97S00pwfgWxlA==@team6-mongodb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@team6-mongodb@")

my_db = client["questions"]

my_col = my_db["questions"]

my_query = { "category": "music" }

my_docs = my_col.find(my_query)

for doc in my_docs:
   pprint(doc)
