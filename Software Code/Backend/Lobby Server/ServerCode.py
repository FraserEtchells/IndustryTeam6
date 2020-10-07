#Hexxhat Server
#Ross Mitchell
#Finished 03.12.19

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
Clients = [[]]
#List of Lobbies that exist
Lobbies = []
#Selector for socket
selector = selectors.DefaultSelector()
#Setting up the socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#Bindinf the ip address of the server to the socket
s.bind(("82.35.224.35", 5589))

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
                    loggedin = True
                    for i in range Clients:
                        if i[0].lobby == self.lobby:
                             Clients[i.append(self)]
                    return loggedin

            #Else it will read in the next line as these will contain Nickname and username
            else if 'Host' in stuff:
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
                    Clients.append([self])
                    loggedin = False

                #This runs through the established clients to check if their nickname is already in use
                #for i in Clients:
                    #Check if the users nicknames match
                    #if i.userName == self.userName:
                        #For the server to know that the person is already logged on
                        #print ("You are already logged in")
                        #Setting the variable is true so it doesnt let the user in yet
                        #loggedin= True
                #Returns whether someone has a matching nickname or not
                    return loggedin

    #Function for responding to the client with the corrct protocol outputs to say that they have successfully joined the server
    def Welcome(self):
        #This is message 001 this welcomes the user to the server and establishes their username and nickname
        WelMessage1 = "Hi" + self.username + " :Welcome to " + self.lobby + "!\n"
        #This puts all the strings together so they can all be sent as one to the client
        message = WelMessage1
        #This sends the message encoded into bytes through the socket specific to this user
        self.sock.send(message.encode())

    #This is a function for joining a channel
    def joinchannel(self, command):
        b=0
        #This splits the command up by the spaces so that we can read the key information
        #spCommand = command.split(" ")
        #this removes the non displaying characters
        #command = re.sub('\r\n', '', command)
        #This removes the non displaying characters from the other other section that was split
        #spCommand[1] = re.sub('\r\n', '', spCommand[1])
        #This checks to see whther the channel exists or not
        if self.lobby not in Lobbies:
            errorNoLobby = "ERROR:NoLobby"
            #This adds the channel to the list if it is not already there
            #Lobbies.append(spCommand[1])
        #An array to see who is iin the channel already
        names = []
        #This is the command to say who has joined the channel
        Jmessage = ":" + self.userName + " " + self.lobby + "\n"
        #This is a loop to go through all the clients to see who is part of that channel
        for i in Clients:
            #As the user can be in multiple channela it has to go through the channel list inside the user list
            for b in range (b, len(i.lobby)):
                #Checks to see if the user being chekced is part of the channel
                if i.lobby[b] == spCommand[1]:
                    #Adds their nickname to the array so we know who is in the channel
                    names.append(i.nickName)
                    #Sends the current user the information that the new user is joining the channel they are in
                    i.sock.send(Jmessage.encode())
        #This is message 331 This establishes the topic of the channel that they have joined
        joinMessage1 = ":10.201.37.8 331 " + self.nickName + " " + spCommand[1] + " :Have fun\n"
        #this is message 353 This sends the person that is joining the list of names of people who are already part of that channel
        joinMessage2 = ":10.201.37.8 353 " + self.nickName + " = " + spCommand[1] + " : " + (', '.join(names)) + "\n"
        #this is message 366 This sends the person that is joining the command that establishes that they have come to the end of their list of names for that channel
        joinMessage3 = ":10.201.37.8 366 " + self.nickName + " " + spCommand[1] + " :END of NAMES list\n"
        #This puts all the previous messages together into a string
        message = Jmessage + joinMessage1 + joinMessage2 + joinMessage3
        #This then takes that new message and sends in encoded in bytes to the user thorugh their socket
        self.sock.send(message.encode())
        #This adds the channel name to their list of channels in their user class
        self.lobby.append(spCommand[1])

    #This is the main for the user Class
    def main(self):
        #This sends to the terminal that there has been a connection
        print('Got connection from', self.addr)
        #This calls the the successful function and will get back a boolean for whether their nickname is already in use
        loggedin = self.successfulConnect()
        #This is an if statement to check if their nickname was already in use
        if loggedin == False:
            print('Welcome')
            #Calls the welcome function to send the client the information required
            self.Welcome()
            #This adds the users class to the list of users
            Clients.append(self)
        #This is if the users nickname was in use
        else:
            #This is message 433 This is used if the users nick name was already being used
            error = self.username + " is a name already being used\n"
            #This sends this error message to the client
            self.sock.send(error.encode())
            #This adds the users class to the list of users
            #Clients.append(self)

#This is the function for when the system receives the PRIVMSG command
def Privmess(command, p, addr):
    #This splits the address to get the ip address
    pAddr = repr(addr).split("'")
    #This splits the command at the : because the message starts after that
    parse = command.split(":", 1)
    #This splits the message by spaces
    parse1 = parse[0].split(" ")
    #This splits the command by the non displaying characters
    parse2 = parse1[1].split("\r\n")
    #This establishes where the message is meant to be sent to
    lobby = parse2[0]
    c=0
    #This checks if the place the message is to be sent is a channel
    if lobby in Lobbies:
        #This runs through all the clients
        for i in Clients:
            #This runs through all the channels that each user is in
            for c in range (c, len(i.lobby)):
                #This checks if client is in the same channel and that it is not the user that sent the message
                if lobby == i.lobby[c] and i.addr != addr:
                    #This sets up the message that means the users in the channel receive the message
                    message = ":" + p.nickName + "!" + p.username + "@" + pAddr[1] + " " + command + "\n"
                    #This sends to each client in the channel the message that was sent
                    i.sock.send(message.encode())
    #This is runs through the clients
    for b in Clients:
        #This finds who the PRIVMSG is for
        if lobby == b.nickName:
            #this sets up the PRIVMSG for the inteded recepient
            message = ":" + p.nickName + "!" + p.username + "@" +pAddr[1] + " " + command + "\n"
            #This sends the message to the user
            b.sock.send(message.encode())              

#This is the function for leaving the channel
def leavechannel(command, p):
    b=0
    #Splits address by ' to get ip
    pAddr = repr(p.addr).split("'")
    #Splits command by space to get the channel
    chan = command.split(" ")
    #loops through clients
    for i in Clients:
        #Loops through channels in each client
        for b in range (b, len(i.lobby)):
            #Checks if the channel matches a channel in their list
            if chan[1] == i.lobby[b]:
                #Sends them a message the person is leaving
                mess = ":" + p.nickName + "!" + p.username +  "@" +pAddr[1] + " "  + command + "\n"
                #Sends the encoded messages
                i.sock.send(mess.encode())
                #Checks if its the person leavings address
                if i.addr == p.addr:
                    #Removes the channel from their list of channels
                    i.lobby.remove(chan[1])

#Function for a person quitting the server
def quitting(command, p):
    #Splits the address to get the ip
    pAddr = repr(p.addr).split("'")
    #loops through the clients list
    for i in Clients:
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
                for i in Clients:
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
                Clients.remove(point)
        #This is if you want to write to the socket
        if mask & selectors.EVENT_WRITE:
            #if there is data
            if data.outb:
                pointer = 0
                addr = ''
                #reads through the client list
                for i in Clients:
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
                if 'PRIVMSG' in repr(data.outb):
                    #decodes the command
                    command = data.outb.decode()
                    #calls the private message function
                    Privmess(command, pointer, addr)
                #if we receive that the user is quitting
                elif "QUIT" in repr(data.outb):
                    #decodes the command
                    command = data.outb.decode()
                    #calls the funtion quitting
                    quitting(command, pointer)
                    print('closing connection to', data.addr)
                    #unregisters the socket
                    selector.unregister(sock)
                    #closes the socket
                    pointer.sock.close()
                    #removes the client info
                    Clients.remove(pointer)
                    i = 1
                #if we receive a channel join command
                elif "JOIN" in repr(data.outb):
                    #decodes command
                    command = data.outb.decode()
                    #calls the join command function
                    pointer.joinchannel(command)
                #if we receive a leave channel command
                elif "PART" in repr(data.outb):
                    #decodes the command
                    command = data.outb.decode()
                    #calls the function for leaving the channel
                    leavechannel(command, pointer)
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
        Clients.remove(pointer)


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