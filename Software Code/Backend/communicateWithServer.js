//Standard commands recognised by the servers
const NAME= "NAME";
const JOIN= "JOIN";
const HOST= "HOST";
const CODE= "CODE";
const CHAT= "CHAT";
const POINTS= "POINTS";
const QUIT= "QUIT";
const SCORE="SCORE";

//Information about the player
var baseCommand= "";

/**
 * Funtion to created the commands understood by the python server
 * @param {*} command - the command that is needing to be added
 * @param {*} value - the value of the command being set
 * @param {*} existingCommand -The oringial command the new command will be appended to
 * returns- the full command as a string
 */
function buildMessage(command, value="", existingCommand=""){
    var finishedCommand="";
    if(existingCommand !==""){
        finishedCommand=String(existingCommand)+":";
    }

    finishedCommand += String(command).toUpperCase()

    if(value!==""){
        finishedCommand +=":"+String(value);
    }

    return finishedCommand;
}

/**
 * Function to send a message to the server that the user
 * wants to create a lobby and join as the host
 * @param {*} name - name of the user
 */
function joinAsHost(name){
    //Create the message
    baseCommand=buildMessage(NAME,name);
    var JoinServerCommand=buildMessage(HOST,"",baseCommand);

    //Send throught the websocket
    console.log(JoinServerCommand);
    var encoded=encodeURI(JoinServerCommand);

    // Connection opened
    socket.addEventListener('open', function (event) {
        console.log("got here");
        socket.send(encoded);
    });
}
