#Quiz Server Lobby
#Ross Mitchell

import selectors
from pymongo import MongoClient # library for connecting with MongoDB
import socket
from datetime import datetime
import platform
import re
import types
import random
import string
from pprint import pprint
platform.node()
HEADERSIZE = 10

#List of Clients each item in list is a class of user
Lobbies = {}
#Selector for socket
selector = selectors.DefaultSelector()
#Setting up the socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#Bindinf the ip address of the server to the socket
s.bind(("localhost", 5555))

#The class of each user which contains the socket they connect with, their ip and port, their nickname, their username and what channels they are part of
class User:
    #The Varibles of the users
    def __init__(self, socket, address):
        #Users Socket
        self.sock = socket
        #Users address
        self.addr = address
        #Users username
        self.username = ''
        #What channels the user is part of
        self.lobby = ''
        self.score = 0
        #Call to the main function of the User class
        self.main()              

    #Function that connects the user to the server once they have attempted to connect
    def successfulConnect(self):
        while True:
            uDetails = ""
            #Reads in the line from the user which starts with CAP LS 302
            stuff = self.sock.recv(1024).decode()
            #if hexchat sends it all in 1 line including username and nickname it will enter this IF
            if 'JOIN' in stuff:
                uDetails = stuff
                if uDetails:
                    #Removes the non displying characters as well as splitting the string into the 2 lines for user and nickname
                    parse = uDetails.split('\r\n')
                    #Splits the command up so we can access the key data of nickname
                    parse1 = parse[0].split(":")
                    #saves the nickname of the Client to their users class variable
                    self.userName = parse1[1]
                    #Saves the username of the user as their class variable
                    self.lobby = parse1[3]
                    if self.lobby in Lobbies:
                        if self.userName in Lobbies[self.lobby].values():
                            Lobbies[self.lobby]["Users"].append(self)
                            loggedin = False
                        else:
                            loggedin = True
                    else:
                        loggedin = True
                    
                    return loggedin

            #Else it will read in the next line as these will contain Nickname and username
            elif 'Host' in stuff:
                uDetails = stuff
                if uDetails:
                    #Removes the non displying characters as well as splitting the string into the 2 lines for user and nickname
                    parse = uDetails.split('\r\n')
                    #Splits the command up so we can access the key data of nickname
                    parse1 = parse[0].split(":")
                    #saves the nickname of the Client to their users class variable
                    self.userName = parse1[1]
                    #Saves the username of the user as their class variable
                    unique = False
                    while unique == False:
                        self.lobby = randStr()
                        if self.lobby not in Lobbies:
                            unique = True
                    Lobbies[self.lobby] = {"Users" : [self]}
                    loggedin = False
                    return loggedin

    
    #This is the main for the user Class
    def main(self):
        #This sends to the terminal that there has been a connection
        print('Got connection from', self.addr)
        #This calls the the successful function and will get back a boolean for whether their nickname is already in use
        loggedin = self.successfulConnect()
        #This is an if statement to check if their nickname was already in use
        if loggedin == False:
            print('Welcome')
            
        else:
            print('Error')        

#Function for a person quitting the server
def quitting(command, p, code):
    #Splits the address to get the ip
    message = 'NAME' + p.Username + ': QUIT \n'
    for i in Lobbies[code].values():
        i.sock.send(message.encode())

#Function for a person quitting the server
def chat(command, p, code):
    #Splits the address to get the ip
    pCommand = command.split(":")
    info = pCommand[5]
    message = 'NAME' + p.username + ': CHAT :' + info + '\n'
    for i in Lobbies[code].values():
        #Preps the message to say the bot has left
        if (p.Username != i.Username):
            i.sock.send(message.encode())

#Function for a person quitting the server
def score(command, p, code):
    #Splits the address to get the ip
    pCommand = command.split(":")
    score = pCommand[5]
    p.score = score + p.score
    message = 'NAME' + p.Username + ': SCORE :' + p.score + '\n'
    for i in Lobbies[code].values():
        i.sock.send(message.encode())

def getQuestion(command, p, code):
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

    question = randQuests
    message = "QUESTIONS"

    for i in Lobbies[code].values():
        i.sock.send(message.encode())
        i.sock.send(question.encode())

#This is for the buffer accepting the connectio
def accept_wrapper(sock):
    #This is the socket accepting the connection after listening
    conn, addr = sock.accept()  
    #This posts to the terminal
    print('accepted connection from', addr)
    #This saves the information from the connection to the variable data
    data = types.SimpleNamespace(addr=addr, inb=b'', outb=b'')
    #This Handles the event of reading or writing
    events = selectors.EVENT_READ | selectors.EVENT_WRITE
    #This registers the connections with the selector
    selector.register(conn, events, data=data)
    #This calls the user class to get the details and set them up on the server
    User(conn, addr)

def randStr(chars = string.ascii_uppercase + string.digits, N=6):
	return ''.join(random.choice(chars) for _ in range(N))

#This funtions checks for items comming in for any connections
def service_connection(key, mask):
    #This trys encase of errors
    try:
        #This gets the socket the item was received from
        sock = key.fileobj
        #This gets the data the socket is from
        data = key.data
        #This checks for something needing to be read in
        if mask & selectors.EVENT_READ:
            #this reads in the data from whatever socket
            recv_data = sock.recv(1024)
            #This checks theres data after the read
            if recv_data:
                #This saves the data as data.outb
                data.outb += recv_data
            #if there is no data the socket has closed
            else:
                point = 0
                addr = ''
                code = ''
                #go through the client
                for i in Lobbies:
                    for x in i:
                        #check ip address is of the user
                        if data.addr == x.addr:
                            #save where the user we are looking for is
                            addr = data.addr
                            point = i
                            code = x.lobby
                print('closing connection to', data.addr)
                #This unregisters the socket with the selector
                selector.unregister(sock)
                #Closes the socket
                sock.close()
                #Removes the info about them from Clients list
                Lobbies[code].remove(point)
        #This is if you want to write to the socket
        if mask & selectors.EVENT_WRITE:
            #if there is data
            if data.outb:
                pointer = 0
                addr = ''
                parse = data.outb.split(":")
                code = parse[3]
                #reads through the client list
                for i in Lobbies[code].values():
                    #Checks correct address
                    if data.addr == i.addr:
                        #saves the address
                        addr = data.addr
                        #saves pointer to item in list we are looking for
                        pointer = i
                #Prints whatever is received
                print('echoing', repr(data.outb), 'to', data.addr)
                i = 0
                #if we receive pirvate mesaage
                if "QUIT" in repr(data.outb):
                    #decodes the command
                    command = data.outb.decode()
                    #calls the funtion quitting
                    quitting(command, pointer, code)
                    print('closing connection to', data.addr)
                    #unregisters the socket
                    selector.unregister(sock)
                    #closes the socket
                    pointer.sock.close()
                    #removes the client info
                    Lobbies[code].remove(pointer)
                    i = 1
                #if we receive a channel join command
                elif "CHAT" in repr(data.outb):
                    #decodes command
                    command = data.outb.decode()
                    chat(command, pointer, code)
                #if we receive a leave channel command
                elif "SCORE" in repr(data.outb):
                    #decodes the command
                    command = data.outb.decode()
                    #calls the function for leaving the channel
                    score(command, pointer, code)
                elif "QUESTION" in repr(data.outb):
                    #decodes the command
                    command = data.outb.decode()
                    #calls the function for leaving the channel
                    getQuestion(command, pointer, code)
                #checks that the socket hasnt closed
                if i==0:
                    #sends item to the sockets
                    sent = sock.send(data.outb)
                    #sends the information aswell
                    data.outb = data.outb[sent:]
                i=0
    #Exception if the socket has an error
    except(socket.error):
        #unregisters socket
        selector.unregister(sock)
        #closes the socket
        pointer.sock.close()
        #deleters users info
        #Lobbies[].remove(pointer)


#This listens to the socket after it has been set up for a connection
s.listen(5)
#Sets up blocking
s.setblocking(False)
#reads the information intp the selector buffer
selector.register(s, selectors.EVENT_READ, data=None)

#Runs constantly
while True:
    #gets the events from the buffer
    events = selector.select(timeout=None)
    #loops through all the evets that have happened
    for key, mask in events:
        #if there is noting in the data
        if key.data is None:
            #calls to connect to the socket
            accept_wrapper(key.fileobj)
        else:
            #handles the data and events that have happened
            service_connection(key, mask)