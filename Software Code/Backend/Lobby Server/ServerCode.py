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
import logging
import asyncio
import websockets
from websockets import WebSocketServerProtocol
import json
from bson.json_util import dumps, loads
from pprint import pprint
platform.node()
HEADERSIZE = 10

Lobbies = {}
conMessage = ''

class Server:
    clients = set()
    async def register(self, ws: WebSocketServerProtocol) -> None:
        self.clients.add(ws)
        logging.info(f'{ws.remote_address} connects.')
        message = ''
        print("await message")
        message = await ws.recv()
        currUser = User(ws, message)
        mess = "CONFIRM:" + currUser.username + ":" + currUser.lobby
        await ws.send(mess)
        while True:
            message = await ws.recv()
            print(message)
            await service_connection(ws, message)
        
    #This is for the buffer accepting the connection
    async def unregister(self, ws:WebSocketServerProtocol) -> None:
        self.clients.remove(ws)
        logging.info(f'{ws.remote_address} disconnects.')

    async def send_to_clients(self, message: str) -> None:
        if self.clients:
            await asyncio.wait([client.send(message) for client in self.clients])  

    async def ws_handler(self, ws: WebSocketServerProtocol, uri: str) -> None:
        await self.register(ws)
        try:
            await self.distribute(ws)
        finally:
            await self.unregister(ws)

    async def distribute(self, ws: WebSocketServerProtocol) -> None:
        async for message in ws:
            await self.send_to_clients(message)
    


#The class of each user which contains the socket they connect with, their ip and port, their nickname, their username and what channels they are part of
class User:
    #The Varibles of the users
    def __init__(self, socket, message):
        #Users Socket
        self.sock = socket
        #Users address
        self.message = message
        #Users username
        self.username = ''
        #What channels the user is part of
        self.lobby = ''
        self.score = 0
        self.questions = []
        #Call to the main function of the User class
        self.main()              

    #Function that connects the user to the server once they have attempted to connect
    def successfulConnect(self):
        while True:
            uDetails = ""
            stuff = self.message
            #Reads in the line from the user which starts with CAP LS 302
            #self.sock.send(acceptConn.encode())
            #stuff = self.sock.recv(1024).decode()

            #if hexchat sends it all in 1 line including username and nickname it will enter this IF
            if 'JOIN' in self.message:
                uDetails = self.message
                print (uDetails)
                if uDetails:
                    #Removes the non displying characters as well as splitting the string into the 2 lines for user and nickname
                    parse = uDetails.split(':')
                    #Splits the command up so we can access the key data of nickname
                    parse1 = parse[0].split(":")
                    #saves the nickname of the Client to their users class variable
                    self.username = parse[1]
                    #Saves the username of the user as their class variable
                    self.lobby = parse1[3]
                    if self.lobby in Lobbies:
                        if self.username in Lobbies[self.lobby].values():
                            Lobbies[self.lobby]["Users"].append(self)
                            loggedin = False
                        else:
                            loggedin = True
                    else:
                        loggedin = True
                    
                    return loggedin

            #Else it will read in the next line as these will contain Nickname and username
            elif 'HOST' in stuff:
                uDetails = stuff
                print (stuff)
                if uDetails:
                    #Removes the non displying characters as well as splitting the string into the 2 lines for user and nickname
                    parse = uDetails.split('\r\n')
                    #Splits the command up so we can access the key data of nickname
                    parse1 = parse[0].split(":")
                    #saves the nickname of the Client to their users class variable
                    self.username = parse1[1]
                    #Saves the username of the user as their class variable
                    unique = False
                    while unique == False:
                        self.lobby = randStr()
                        if self.lobby not in Lobbies:
                            unique = True
                            print(self.lobby)
                            #self.sock.send(mess)
                    Lobbies[self.lobby] = {"Users" : [self]}
                    self.questions = getQuestion()
                    loggedin = False
                    return loggedin

    
    #This is the main for the user Class
    def main(self):
        #This sends to the terminal that there has been a connection
        print('Got connection from')
        #This calls the the successful function and will get back a boolean for whether their nickname is already in use
        loggedin = self.successfulConnect()
        #This is an if statement to check if their nickname was already in use
        if loggedin == False:
            print('Welcome')
        else:
            print('Error')        

#Function for a person quitting the server
async def quitting(command, p, code):
    #Splits the address to get the ip
    message = 'NAME' + p.username + ': QUIT \n'
    #for i in Lobbies[code].values():
        #await i.sock.send(message.encode())

#Function for a person quitting the server
async def chat(command, p, code):
    #Splits the address to get the ip
    pCommand = command.split(":")
    info = pCommand[5]
    message = 'NAME' + p.username + ': CHAT :' + info + '\n'
    for j in Lobbies[code].values():
        for i in j:
            await i.sock.send(message)

#Function for a person quitting the server
async def score(command, p, code):
    #Splits the address to get the ip
    pCommand = command.split(":")
    score = pCommand[5]
    p.score = int(score) + p.score


#Function for a person quitting the server
async def leaderboard(command, p, code):
    message = ''
    for j in Lobbies[code].values():
        for i in j:
            print(i.username)
            message = i.username + ":" + str(i.score) + ":"
    print(message)            
    await p.sock.send(message)

def getQuestion():
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

    # create a list to hold questions & get from database, transfer the questions we want (according to IDs generated) into a new list & get rid of original
    randQuests = []
    for ID in questIDs:
        quest = list(my_col.find({"id" : int(ID)}, {"_id":0}))
        tempQuest = dumps(quest)
        randQuests.append(tempQuest)

    # print the questions that have been selected
    for quest in randQuests:
        pprint(quest)

    return randQuests


async def sendQuestion(command, p, code):
    questToSend = p.questions.pop()
    message = "QUESTION:" + questToSend
    await p.sock.send(message)

def randStr(chars = string.ascii_uppercase + string.digits, N=6):
	return ''.join(random.choice(chars) for _ in range(N))

#This funtions checks for items comming in for any connections
async def service_connection(socket, command):
    #This trys encase of errors
    try:
        pointer = 0
        parse = command.split(":")
        code = parse[3]
        for j in Lobbies[code].values():
            for i in j:
                if socket == i.sock:
                    pointer = i
            #Checks correct address
            #if socket == i.sock:
                #saves pointer to item in list we are looking for
                #pointer = i
        #if we receive pirvate mesaage
        if "QUIT" in command:
            #calls the funtion quitting
            quitting(command, pointer, code)
            print('closing connection to', i.sock)
            #unregisters the socket
            #selector.unregister(sock)
            #closes the socket
            #pointer.sock.close()
            #removes the client info
            Lobbies[code]["Users"].remove(pointer)
            i = 1
        #if we receive a channel join command
        elif "CHAT" in command:
            chat(command, pointer, code)
        #if we receive a leave channel command
        elif "SCORE" in command:
            #calls the function for leaving the channel
            await score(command, pointer, code)
        elif "QUESTION" in command:
            #calls the function for leaving the channel
            await sendQuestion(command, pointer, code)
            #checks that the socket hasnt closed
        elif "GETLEADERBOARD" in command:
            #calls the function for leaving the channel
            await leaderboard(command, pointer, code)
    #Exception if the socket has an error
    except(socket.error):
        #unregisters socket
        selector.unregister(sock)
        #closes the socket
        #pointer.sock.close()
        #deleters users info
        #Lobbies[].remove(pointer)


server = Server()
start_server = websockets.serve(server.ws_handler, "localhost", 5555)
loop = asyncio.get_event_loop()
loop.run_until_complete(start_server)
loop.run_forever()
