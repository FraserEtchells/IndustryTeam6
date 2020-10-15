
//Quiz Client to the server
//Melvin Abraham


//Connect to the websocket
const port=5555;
const host= "//localhost:"
const socket = new WebSocket(`ws:${host}${port}`);

//Standard commands recognised by the servers
const NAME= "NAME";
const JOIN= "JOIN";
const HOST= "HOST";
const CODE= "CODE";
const CHAT= "CHAT";
const POINTS= "POINTS";
const QUIT= "QUIT";
const SCORE="SCORE";
const GETQUESTIONS = "GETQUESTIONS";
const GETLEADERBOARD= "GETLEADERBOARD";
var gamecode="";



//Information about the player
var baseCommand= "";


joinAsHost("Ross");

//Call get leaderboard in 5 seconds
setTimeout(function(){
    sendScore(5);
}, 5000);

//Call get leaderboard in 5 seconds
setTimeout(function(){
    getQuestions();
}, 10000);


//High level function callers
// async function JoinAsHost(name) {
//     const data = await joinAsHostLowLevel(name);
//     // Your logic goes here.
//     return data
//     }
// console.log(getQuestions());
// console.log(getLeaderboard());


// joinAsHost("Melvin").then(data => {
//     //....do more things with data....
//     console.log(data);
//     console.log(gamecode);
// });


// joinAsHost("Melvin");


// setTimeout(function(){ 
//             console.log(`gamecode: ${gamecode}`)
//          }, 3000);




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
async function joinAsHost(name){
    //Create the message
    baseCommand=buildMessage(NAME,name);
    var JoinServerCommand=buildMessage(HOST,"",baseCommand);

    //Send throught the websocket
    //console.log(JoinServerCommand);
    var encoded=encodeURI(JoinServerCommand);
    // Connection opened


    socket.addEventListener('open', function (event) {
        console.log("got here: HOST");
        socket.send(encoded);
    
    });

    socket.onmessage = function(event) {
        console.log("WebSocket message received:", event.data);
        //Get the reply from the server
        var arr=event.data.split(":");
        console.log(`arr: ${arr}`);
        gamecode=arr[arr.length-1];

        //Recive the gamecode
        baseCommand=  baseCommand+`:CODE:${gamecode}`;
        console.log(gamecode);
        console.log(baseCommand);
        alert(gamecode);
        //socket.close();
        return gamecode
      };

}


// function getGameCode() {
//     console.log(`from function ${gamecode}`);
//     setTimeout(function(){ 
//      return gamecode
//     }, 3000);
// }

// const getGameCode = () => {
//     joinAsHost("melvin").then((a) => {
//       console.log(a);
//     });
//   };

/**
 * Function to send a message to the server that the user
 * wants to join an exisitng lobby
 * @param {*} name - name of the user wanting to join
 * @param {*} gamecode - the lobby unique identifier
 */
function joinExistingLobby(name,gamecode){
    //Create the message
    baseCommand=buildMessage(NAME,name);
    var JoinExistingLobbyCommand=buildMessage(JOIN,gamecode,baseCommand);

    baseCommand=JoinExistingLobbyCommand

    //Send throught the websocket
    console.log(JoinExistingLobbyCommand);
    var encoded=encodeURI(JoinExistingLobbyCommand);

    // Connection opened
    socket.addEventListener('open', function (event) {
        console.log("got here");
        socket.send(encoded);
    });
}

/**
 * Function to send a chat message within the lobby
 * @param {*} message - the message that will be displayed in the chat
 */
function chatInLobby(message){

    var SendChatCommand=buildMessage(CHAT,message,baseCommand);

    //Send throught the websocket
    console.log(SendChatCommand);
    var encoded=encodeURI(SendChatCommand);

    // Connection opened
    //socket.addEventListener('open', function (event) {
        console.log("got here");
        socket.send(encoded);
    //});
}

/**
 * Function to send a chat message within the lobby
 * @param {*} score - the updated score
 */
function sendScore(score){

    var SendScoreCommand=buildMessage(SCORE,score,baseCommand);

    //Send throught the websocket
    console.log(SendScoreCommand);
    var encoded=encodeURI(SendScoreCommand);

    // Connection opened
    //socket.addEventListener('open', function (event) {
        console.log("got here");
        socket.send(encoded);
    //});
}

/**
 * Function to quit the game
 */
function quitGame(){

    var QuitGameCommand=buildMessage("QUIT","",baseCommand);


    //Send throught the websocket
    console.log(QuitGameCommand);
    var encoded=encodeURI(QuitGameCommand);

    // Connection opened
    //socket.addEventListener('open', function (event) {
        console.log("got here");
        socket.send(encoded);
    //});
}


function getLeaderboard(){
    var GetLeaderboardCommand= buildMessage(GETLEADERBOARD,"",baseCommand);

    //Send throught the websocket
    console.log(GetLeaderboardCommand);
    var encoded=encodeURI(GetLeaderboardCommand);

    // Connection opened
    //socket.addEventListener('open', function (event) {
    console.log("got here LEADERBOARD");
    socket.send(encoded);
    //});

    socket.onmessage = function(event) {
        console.log("WebSocket message received:", event.data);
        //Get the reply from the server
       // var reply= "player1:5:player2:7:player3:123";
       var leaderboard={};
        var arr=event.data.split(":");
        
        //Convert the reply into a Javascript object
        for (let index = 0; index < arr.length; index+=2) {
                leaderboard[arr[index]]=arr[index+1];
        }
        console.log(leaderboard);
        return leaderboard;
      };

}

function getQuestions(){
    console.log(baseCommand);
    var GetQuestionsCommand= buildMessage("QUESTION","",baseCommand);
    console.log(GetQuestionsCommand);
    
    //Send throught the websocket
    //console.log(GetQuestionsCommand);
    var encoded=encodeURI(GetQuestionsCommand);

    // Connection opened
    //socket.addEventListener('open', function (event) {
        console.log("got here QUESTIONS");
        socket.send(encoded);
    //});

    socket.onmessage = function(event) {
        console.log(event.data)
        var arr=event.data.substr(9);
        let value=JSON.parse(arr); 
        return value[0]
      };


    
}
