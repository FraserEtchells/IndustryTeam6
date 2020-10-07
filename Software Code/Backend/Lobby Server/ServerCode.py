#Quiz Server Lobby
#Ross Mitchell


import selectors
import socket
from datetime import datetime
import platform
import re
import types
import random
import string


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
                        Lobbies[self.Lobby]["Users"].append(self)
                        loggedin = False
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
                    self.lobby = randStr()
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
            #This is message 433 This is used if the users nick name was already being used
            error = self.username + " is a name already being used\n"
            #This sends this error message to the client
            self.sock.send(error.encode())         

#Function for a person quitting the server
def quitting(command, p):
    #Splits the address to get the ip
    pAddr = repr(p.addr).split("'")
    #loops through the clients list
    for i in Lobbies:
        #Preps the message to say the bot has left
        message = ':' + p.nickName + '!' + p.username + "@" +pAddr[1] + " "  + command + '\n'
        #Sends the encoded message
        i.sock.send(message.encode())

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
                #go through the client
                for i in Lobbies:
                    #check ip address is of the user
                    if data.addr == i.addr:
                        #save where the user we are looking for is
                        addr = data.addr
                        point = i
                print('closing connection to', data.addr)
                #This unregisters the socket with the selector
                selector.unregister(sock)
                #Closes the socket
                sock.close()
                #Removes the info about them from Clients list
                Lobbies.remove(point)
        #This is if you want to write to the socket
        if mask & selectors.EVENT_WRITE:
            #if there is data
            if data.outb:
                pointer = 0
                addr = ''
                #Checks correct address
                if data.addr == i.addr:
                #saves the address
                    addr = data.addr
                    #saves pointer to item in list we are looking for
                    pointer = i
                #Prints whatever is received
                print('echoing', repr(data.outb), 'to', data.addr)
                i = 0
    #Exception if the socket has an error
    except(socket.error):
        #unregisters socket
        selector.unregister(sock)
        #closes the socket
        pointer.sock.close()
        #deleters users info
        Lobbies.remove(pointer)


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