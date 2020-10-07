#Hexxhat Server
#Ross Mitchell
#Finished 03.12.19

import selectors
import socket
import platform
import re
import types

platform.node()
HEADERSIZE = 10

#List of Clients each item in list is a class of user
Clients = []
#List of channels that exist
Channels = []
#Selector for socket
selector = selectors.DefaultSelector()
#Setting up the socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#Bindinf the ip address of the server to the socket
s.bind(("10.201.37.8", 5587))

#The class of each user which contains the socket they connect with, their ip and port, their nickname, their username and what channels they are part of
class User:
    #The Varibles of the users
    def __init__(self, socket, address):
        #Users Socket
        self.sock = socket
        #Users address
        self.addr = address
        #Users nickname
        self.nickName = ''
        #Users username
        self.username = ''
        #What channels the user is part of
        self.channel = []
        #Call to the main function of the User class
        self.main()
   
    #Function for if the users nickname is already being used it moves to their second nickname
    def diffNickname(self, command):
        #Takes the command and splits it to remove the non displaying characters
        newName = command.split('\r\n')
        #Splits the command up by spaces
        newName1 = newName[0].split(' ')
        #The nickname is the second item in the array as the first is the word NICK
        self.nickName = newName1[1]                

    #Function that connects the user to the server once they have attempted to connect
    def successfulConnect(self):
        while True:
            uDetails = ""
            #Reads in the line from the user which starts with CAP LS 302
            stuff = self.sock.recv(1024).decode()
            #if hexchat sends it all in 1 line including username and nickname it will enter this IF
            if 'NICK' in stuff:
                #Splits the code up by its different lines while also removing the non displaying characters
                code = stuff.split('\r\n')
                #As it only needs the 2nd and 3rd line it puts these 2 in a string together
                uDetails = code[1] + '\r\n' + code[2] + '\r\n'
            #Else it will read in the next line as these will contain Nickname and username
            else:
                #Reading in Username and nickname from what the client sends
                uDetails = self.sock.recv(1024).decode()
            #If userdetails contains something it will enter this statement
            if uDetails:
                #Removes the non displying characters as well as splitting the string into the 2 lines for user and nickname
                parse = uDetails.split('\r\n')
                #Splits the command up so we can access the key data of nickname
                parse1 = parse[0].split(" ")
                #saves the nickname of the Client to their users class variable
                self.nickName = parse1[1]
                #Splitting by space to access the username of the user
                parse2 = parse[1].split(" ")
                #Saves the username of the user as their class variable
                self.username = parse2[1]
                loggedin = False
                #This runs through the established clients to check if their nickname is already in use
                for i in Clients:
                    #Check if the users nicknames match
                    if i.nickName == self.nickName:
                        #For the server to know that the person is already logged on
                        print ("You are already logged in")
                        #Setting the variable is true so it doesnt let the user in yet
                        loggedin= True
                #Returns whether someone has a matching nickname or not
                return loggedin

    #Function for responding to the client with the corrct protocol outputs to say that they have successfully joined the server
    def Welcome(self):
        #This is message 001 this welcomes the user to the server and establishes their username and nickname
        WelMessage1 = ":10.201.37.8 001 " + self.nickName + " :Welcome to the Internet Relay Network " + self.nickName + "!" + self.username + "\n"
        #This is message 002 this tells the user who the host is and what version the server is
        WelMessage2 = ":10.201.37.8 002 " + self.nickName + " :Your host is 10.201.37.8, running Version 2.0\n"
        #This is message 003 this tells the user when the server was created
        WelMessage3 = ":10.201.37.8 003 " + self.nickName + " :This Server was created 03/12/19\n"
        #This puts all the strings together so they can all be sent as one to the client
        message = WelMessage1 + WelMessage2 + WelMessage3
        #This sends the message encoded into bytes through the socket specific to this user
        self.sock.send(message.encode())

    #This is a function for joining a channel
    def joinchannel(self, command):
        b=0
        #This splits the command up by the spaces so that we can read the key information
        spCommand = command.split(" ")
        #this removes the non displaying characters
        command = re.sub('\r\n', '', command)
        #This removes the non displaying characters from the other other section that was split
        spCommand[1] = re.sub('\r\n', '', spCommand[1])
        #This checks to see whther the channel exists or not
        if spCommand[1] not in Channels:
            #This adds the channel to the list if it is not already there
            Channels.append(spCommand[1])
        #An array to see who is iin the channel already
        names = []
        #This is the command to say who has joined the channel
        Jmessage = ":" + self.nickName + " " + command + "\n"
        #This is a loop to go through all the clients to see who is part of that channel
        for i in Clients:
            #As the user can be in multiple channela it has to go through the channel list inside the user list
            for b in range (b, len(i.channel)):
                #Checks to see if the user being chekced is part of the channel
                if i.channel[b] == spCommand[1]:
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
        self.channel.append(spCommand[1])

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
            err433 = ":192.168.0.22 433" + self.username + " :" + self.nickName + " is already beig used\n"
            #This sends this error message to the client
            self.sock.send(err433.encode())
            #This receives the new nickname from the user
            comm = self.sock.recv(1024)
            #This decodes the message from bytes
            comm = comm.decode()
            #This calls the diffNickname function to change their in use nickname to one noone else has
            self.diffNickname(comm)
            #This calls the welcome function to connect the user
            self.Welcome()
            #This adds the users class to the list of users
            Clients.append(self)

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
    channel = parse2[0]
    c=0
    #This checks if the place the message is to be sent is a channel
    if channel in Channels:
        #This runs through all the clients
        for i in Clients:
            #This runs through all the channels that each user is in
            for c in range (c, len(i.channel)):
                #This checks
                if channel == i.channel[c] and i.addr != addr:
                    message = ":" + p.nickName + "!" + p.username + "@" + pAddr[1] + " " + command + "\n"
                    i.sock.send(message.encode())
    for b in Clients:
        if channel == b.nickName:
            message = ":" + p.nickName + "!" + p.username + "@" +pAddr[1] + " " + command + "\n"
            b.sock.send(message.encode())              

def leavechannel(command, p):
    b=0
    pAddr = repr(p.addr).split("'")
    chan = command.split(" ")
    for i in Clients:
        for b in range (b, len(i.channel)):
            if chan[1] == i.channel[b]:
                mess = ":" + p.nickName + "!" + p.username +  "@" +pAddr[1] + " "  + command + "\n"
                i.sock.send(mess.encode())
                if i.addr == p.addr:
                    i.channel.remove(chan[1])

def quitting(command, p):
    pAddr = repr(p.addr).split("'")
    for i in Clients:
        message = ':' + p.nickName + '!' + p.username + "@" +pAddr[1] + " "  + command + '\n'
        i.sock.send(message.encode())

def accept_wrapper(sock):
    conn, addr = sock.accept()  # Should be ready to read
    print('accepted connection from', addr)
    data = types.SimpleNamespace(addr=addr, inb=b'', outb=b'')
    events = selectors.EVENT_READ | selectors.EVENT_WRITE
    selector.register(conn, events, data=data)
    User(conn, addr)
   
def service_connection(key, mask):
    sock = key.fileobj
    data = key.data
    if mask & selectors.EVENT_READ:
        recv_data = sock.recv(1024)  # Should be ready to read
        if recv_data:
            data.outb += recv_data
        else:
            print('closing connection to', data.addr)
            selector.unregister(sock)
            sock.close()
    if mask & selectors.EVENT_WRITE:
        if data.outb:
            pointer = 0
            addr = ''
            for i in Clients:
                if data.addr == i.addr:
                    addr = data.addr
                    pointer = i
            print('echoing', repr(data.outb), 'to', data.addr)
            i = 0
            if 'PRIVMSG' in repr(data.outb):
                command = data.outb.decode()
                Privmess(command, pointer, addr)
            elif "QUIT" in repr(data.outb):
                command = data.outb.decode()
                quitting(command, pointer)
                print('closing connection to', data.addr)
                selector.unregister(sock)
                pointer.sock.close()
                Clients.remove(pointer)
                i = 1
            elif "JOIN" in repr(data.outb):
                command = data.outb.decode()
                pointer.joinchannel(command)
            elif "PART" in repr(data.outb):
                command = data.outb.decode()
                leavechannel(command, pointer)
            if i==0:
                sent = sock.send(data.outb)  # Should be ready to write
                data.outb = data.outb[sent:]
            i=0


#This listens to the socket after it has been set up for a connection
s.listen(5)
s.setblocking(False)
selector.register(s, selectors.EVENT_READ, data=None)

while True:

    events = selector.select(timeout=None)
    for key, mask in events:
        if key.data is None:
            accept_wrapper(key.fileobj)
        else:
            service_connection(key, mask)