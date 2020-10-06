from pymongo import MongoClient

# pprint library is used to make the output look more pretty
from pprint import pprint

# connect to MongoDB
dburi = "mongodb://team6-mongodb:4LITWMsMLAzi1w4rZbuOo0wgaaUlFk0nO3WMj1riXjsnL0rkZqmRgeX0oVnWTHOhlOgr7NX6H97S00pwfgWxlA==@team6-mongodb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@team6-mongodb@"
client = MongoClient(dburi)

my_db = client["questions"] # db name

my_col = my_db["questions"] # db collection

# array for data to insert
insert_list = [
    {"question": "In 1990, this 5000 year old body was found in the Alps. Scientists discovered some tattoos on his leg which indicated that acupuncture was used as far back as the Copper-stone Age.", "correct_ans": "Oetzi", "answer_a": "Big Foot", "answer_b": "Sasquatch", "answer_c": "Nessie", "answer_d": "Oetzi"},
    {"question": "After unsuccessful  talks about oil production and debt repayment, Iraq occupied Kuwait.  In January 1991 the US launched an air attack against military targets in Iraq and Kuwait in this operation.", "correct_ans": "Desert Storm", "answer_a": "Matador", "answer_b": "BOLERO", "answer_c": "Determined Force", "answer_d": "Desert Storm"},
    {"question": "It is the process of producing identical copies of a DNA segment asexually.  In 1996 the first successful one of an animal was made. The animals name was Dolly.  Dolly later died, but Richard Seed announced that he intended try it on humans.", "correct_ans": "Cloning", "answer_a": "Organ Transplant", "answer_b": "Cloning", "answer_c": "Bloodless Surgery", "answer_d": "Laser Surgery"},
    {"question": "This kind of music became largely popular in Europe and America in the 1990s. It is a melodic, free form combination between techno and house, having hypnotic qualities. The first distinctive track of this kind was Age Of Love, released in 1990.", "correct_ans": "Trance", "answer_a": "Electro", "answer_b": "Trance", "answer_c": "Techno", "answer_d": "Dance"}
]

# insert the data in array above
my_docs = my_col.insert_many(insert_list)

# print out contents of database again, to check that the data has been inserted
my_docs = my_col.find({})

for doc in my_docs:
    pprint(doc)