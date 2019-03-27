//  require() method is for load and cache js modules
var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var wsPort = 4444;
var httpPort = 6666;

// WebSocket
const WebSocket = require('ws');
const ws = new WebSocket.Server({
  port: wsPort
})

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
  next();
});

//Setting up server
var server = app.listen(process.env.PORT || httpPort, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
  console.log("WebSocket running on port", wsPort);
});
// account needed for connecing to our sql database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'forwords'
});

connection.connect(function (err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
  console.log("   ");
});

// WebSocket
ws.on('connection', function connection(ws, req) {
  var IPaddress = req.connection.remoteAddress.replace(/.*:/, '')
  console.log('Connection accepted:', IPaddress);
  console.log("   ");
  console.log("   ");

  // If a message is received
  ws.on('message', function incoming(message) {
    // Turn every received message into a JSON immediately to access it!
    let receivedMessage = JSON.parse(message);


    console.log("                            ");
    console.log(`NikkiWebSocket code:`);
    console.log(`                     Received message: ${message}`);
    console.log("                            ");

    // If the client is requesting choices and a prompt
    if (receivedMessage[0].request == 'choicesAndPrompt') {
      let lesson = receivedMessage[0].lesson;
      let groupID = receivedMessage[0].groupID;
      let player2 = new Player(2, "Zeke", [], [], groupID)
      let game2 = new Game(lesson, [player2]);
      // call function to set up choices/prompt, passing in lesson
      let sent = ws.send(getChoicesAndPrompt(game2));
      
    console.log("                            ");
    console.log("                            ");
      console.log("sent!!!!!!!: ", sent);
    }
    if (receivedMessage[0].request == 'soloCreate') {
      let lesson = receivedMessage[0].lesson;
      // Get a groupID to send to player
      // Send back groupID to that one player,
      var groupID = 1;
      var stringifiedMessage = JSON.stringify(
        [{
          'groupID': groupID
        }]
      );
      ws.send(stringifiedMessage);
      // Create a player object
      // It has to be the next ID available in the group table
      // Create Game object with that ID, that player, and that lesson!

      var player = new Player(1, "Nikki", [], [], groupID);
      var game = new Game(lesson, [player]); // this variable is not accessible elsewhere :(
      ws.send(getChoicesAndPrompt(game));
    }
  });
});

// Classes
// Player Class
class Player {
  constructor(ID, name, choices, prompt, groupID) {
    this.ID = ID;
    this.name = name;
    this.choices = choices;
    this.prompt = prompt;
    this.groupID = groupID;
  }
}
// Game Class
class Game {
  constructor(lesson, players) {
    this.lesson = lesson;
    this.players = players;
  }
}

function getChoicesAndPrompt(game) {  
  console.log("                            ");
  console.log("                            ");
  console.log("getChoicesAndPrompt() called, game.lesson = ", game.lesson);
  console.log("                              game.players[] = ", game.players);
  console.log("                              game.players.length[] = ", game.players.length);
  console.log("                            ");
  let lesson = game.lesson;
  let numPlayers = game.players.length;
  var players = game.players;
  connection.query('SELECT * FROM word WHERE lesson = ' + lesson + ';', function (error, wordsInLesson) {
    if (error)
      throw error;
    var minID = wordsInLesson[0].ID;
    // Prompts[] = Array of wordIDs randomly selected from all wordsInLesson, 
    //            the amount of wordIDs is based on how many players there are in the game
    let prompts = randomWordsPicker(minID, (wordsInLesson.length - 1), numPlayers); // return an array of (numPlayers) unique numbers
    console.log("                              all prompts: ", prompts);

    // set choices for player
    for (let j = 0; j < numPlayers; j++) {
      players[j].prompt = wordsInLesson[(prompts[j] - minID)];

      // players[j].choices = randomWordsPicker(minID, wordsInLesson.length, 3); // ideally returning 3 random words to be choices
      let choiceWordIDs = randomWordsPicker(minID, wordsInLesson.length, 3); // 3 random wordIDs to be choices
      players[j].choices = [wordsInLesson[(choiceWordIDs[0] - minID)], wordsInLesson[(choiceWordIDs[1] - minID)], wordsInLesson[(choiceWordIDs[2] - minID)]];
      players[j].choices.push(players[j].prompt); // add prompt as one of the player's choices
    }

    let messageArray = players[0].choices;

    // Add prompt to it
    messageArray.push(players[0].prompt);
    // Add send header of "choicesAndPrompt" at element 0
    messageArray.unshift("choicesAndPrompt");
    // console.log("thing to send/return to nikki websocket thing!!!: ", messageArray);


    var stringifiedMessage = JSON.stringify(messageArray);
    console.log("thing to send/return to nikki websocket thing!!!:stringifiedMessage ", stringifiedMessage);
    console.log(typeof stringifiedMessage); //returns string
    return stringifiedMessage;
    // Give each player in game a random prompt from prompts array
    // for (let i = 0; i < numPlayers; i++) {
    //   let randPromptIndex = Math.floor(Math.randomNumGen(0, numPlayers));
    //   while(!tempPrompts.contains(randPromptIndex)) {
    //     randPromptIndex = Math.floor(Math.randomNumGen(0, numPlayers));
    //   }
    //   tempPrompts.push(prompts[randPromptIndex]);
    // }

    // tempPrompts is now an array of unique wordIDs 
    // the index corresponds to the player # that gets that prompt

    /*
        var tempPrompts = [];
    
        // Give each player in game a random prompt as a choice
        for (let i = 0; i < numPlayers; i++) {
          let randPromptIndex = Math.floor(Math.randomNumGen(0, numPlayers));
          while (!tempPrompts.contains(randPromptIndex)) {
            randPromptIndex = Math.floor(Math.randomNumGen(0, numPlayers));
          }
          tempPrompts.push(prompts[randPromptIndex]);
        }
    
        for (let i = 0; i < numPlayers; i++) {
          players[i].choices[Math.floor(Math.random() * 4)] = tempPrompts[i];
        }
    
        for (let i = 0; i < numPlayers; i++) {
          players[i].choices[Math.floor(Math.random() * 4)] = tempPrompts[i];
        }
    
        let choicesList = randomWordsPicker(minID, (wordsInLesson.length - 1), 3); // return an array of 3 unique numbers
    
        // Get full choices of these choices and put them in an array
        var choices = [];
        // var choices = [wordsInLesson[choicesList[0]], wordsInLesson[choicesList[1]], wordsInLesson[choicesList[2]], wordsInLesson[choicesList[3]]];
        for (var i = 0; i < wordsInLesson.length; i++) {
          for (var j = 0; j < choicesList.length; j++) {
            if (wordsInLesson[i].ID == choicesList[j]) {
              choices.push(wordsInLesson[i])
            }
          }
        }
        */
  });
}
/* Create a list of number unique numbers
 * If a number is already in the list, then generate a unique number
 */
function randomWordsPicker(minID, lessonWordsCount, number) {
  let choicesList = [];
  while (choicesList.length < number) {
    let potential = Math.floor(randomNumGen(minID, lessonWordsCount));
    while (choicesList.includes(potential)) {
      potential = randomNumGen(minID, lessonWordsCount);
    }
    choicesList.push(potential);
  }
  return choicesList; // should be 4 random numbers between minID and maxID
}

//Generate a random number between the minimum ID in that lesson and the maximum ID in that lesson
function randomNumGen(minID, lessonWordsCount) {
  let maxID = minID + lessonWordsCount;
  return Math.floor(Math.random() * (maxID - minID) + minID);
}
// function startGame() {
//   //connection established, assume moving on from Jake's screen.
//   p1 = new Player(1, "Jake");
//   lesson = 7;
//   let players = [p1];
//   let choiceNums = [];
//   let newGame = new Game(lesson, players, choiceNums);
//   return newGame;
// }
// Can be possibly made a class function of Game.
// Send choices and prompt to client


function getGroupID() {
  console.log("in getGroupID route in backend");
  connection.query(
    "SELECT AUTO_INCREMENT " +
    "FROM information_schema.TABLES " +
    "WHERE TABLE_SCHEMA = 'forwords' " +
    "AND TABLE_NAME = 'Game'", function (error, results) {
      if (error)
        throw error;
      res.json(results);
    });
}










// HTTP
// Display welcome message 
app.get('/', function (req, res) {
  res.send("Welcome to forwords");
});

// returns the list of lessons
app.get('/lesson-list', function (req, res) {
  console.log("in /lesson-list route in backend");
  connection.query('SELECT * FROM lesson;', function (error, results) {
    if (error)
      throw error;
    res.json(results);
  });
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
  res.sendStatus(err.status);
  //  res.render('error');
});

// Multiplayer Connection Code
// Author: Ezekiel Martinez with assistance from Stephen Macomber
// Summary: Allows for Multiplayer Gameplay
// Description:
// This is the code that allows players to connect and play a game 
// with each other via database. This is avheived through the use
// of Websockets (ws). Initializes a connection with user/client,
// and then has multiple different cases for the types of message
// it could receive from a client. The code keeps track of existing group
// through a map, and then indexs through the possible groupID in order
// to locate the correct group.

// Initialize variables neccessary for storing player data
/*
var groups = new Map();
var groupCode = 0;
var index = 0;
var readyCounter = 0; // This variable is not sustainable for multiple players at once
// Connect to client via ws, log the proxess of receiving and sending messages
// or client
ws.on('connection', (ws, req) => {
  console.log('Connection accepted:', req.connection.remoteAddress.replace(/.*:/, ''));
  ws.on("message", message => {
    console.log(`Received message: ${message}`);

    if (message == 'create') {
      var players = [];
      groupCode++; // group code generation function.
      groups.set(groupCode, players)
      index = groups.get(groupCode).push(ws) - 1;
      groups.get(groupCode)[index].send(groupCode);
      // send code to client for it to be displayed for other users
    } else {
      //Check to see what group the message is being sent from.
      if (message.includes('join')) {
        groupID = parseInt(message.substr(4, message.length));
        index = groups.get(groupID).push(ws) - 1;
        groups.get(groupID)[index].send('You are now in a group!');
        // Alert other players that another player has joined group, unneeded for finished product.
        for (var i = 0; i < groups.get(groupID).length - 1; i++) {
          groups.get(groupID)[i] && groups.get(groupID)[i].send('New player has joined!');
        }
        console.log('Current Connections for this group: ' + groups.get(groupID).length);
      } else if (message.includes('ready')) {
        groupID = parseInt(message.substr(5, message.length));
        readyCounter++;
        if (readyCounter == groups.get(groupID).length) {
          readyCounter = 0;
          for (var i = 0; i < groups.get(groupID).length; i++) {
            groups.get(groupID)[i] && groups.get(groupID)[i].send('Game is about to start!');
          }
          // Push all of the details about this group into the group table
          // Start getting words for game and loading Gameplay logic
        }
      }
    }
  })
});
ws.on('close', () => {
  console.log(`Client #${index} has disconnected`);
  delete clients[index];
  var i = clients.length - 1;
  while (clients[i] === undefined && i >= 0) {
    clients.pop();
    i--;
  }
})
*/
module.exports = app;
