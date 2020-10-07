from pymongo import MongoClient

# pprint library is used to make the output look more pretty
from pprint import pprint


def upload(insert_list, output, verbose):

    # connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
    client = MongoClient("mongodb://team6-mongodb:4LITWMsMLAzi1w4rZbuOo0wgaaUlFk0nO3WMj1riXjsnL0rkZqmRgeX0oVnWTHOhlOgr7NX6H97S00pwfgWxlA==@team6-mongodb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@team6-mongodb@")

    # Issue the serverStatus command and print the results
    # serverStatusResult=db.command("serverStatus")
    # pprint(serverStatusResult)

    my_db = client["questions"]

    my_col = my_db["questions"]

    x = my_col.delete_many({})    
    if verbose: print(x.deleted_count, "documents deleted.")

    my_docs = my_col.insert_many(insert_list)
    if verbose: print(str(len(insert_list)) + " documents uploaded\n")

    my_docs = my_col.find({})

    if output:
        for doc in my_docs:
            pprint(doc)
