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
var WebSocket = require('ws');
var ws = new WebSocket.Server({
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






// Classes
// Player Class
class Player {
  constructor(IP, ws, choices, prompt, gameID) {
    this.IP = IP;
    this.ws = ws;
    this.choices = choices;
    this.prompt = prompt;
    this.gameID = gameID;
  }
}
// Game Class
class Game {
  constructor(gameID, lesson, players) {
    this.gameID = gameID;
    this.lesson = lesson;
    this.players = players;
  }
}
connection.connect(function (err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

allPlayers = [];
var gameMap = new Map();
// Final Websocket Code :)
ws.on('connection', function connection(ws, req) {
  var IP = req.connection.remoteAddress.replace(/.*:/, '');
  console.log('Connection accepted:', IP);

  // Immediately create player & game objects, with this ws connection as one of their attributes
  var player = new Player(IP, ws, [], {}, 0)
  var game = new Game(0, 0, []); 

  // Set up ws, IP for player
  // player.ws = ws;
  player.IP = IP;

  // Now, code for when receiving specific messages :)
  ws.on('message', async function incoming(message) {
    console.log(`<<<<<<<<<<----------Received message: ${message}`);
    message = JSON.parse(message);

    /* OPTIONS FOR WHAT THE USER WILL SEND:
     * 'create' - they are either a single player, or the host of a multiplayer game
     * 'join', gameID - they are trying to join a multiplayer game with that gameID
     * 'choicesAndPrompt' - they are requesting their choices and prompts to be sent to them
    */

    if (message[0].request == 'create') {
      // Set up game  
      var gameID = await getGameID(); // should return an int that is the next ID available in the Game table
      game.lesson = message[0].lesson;
      game.gameID = gameID;
      game.players = [player];

      // Put this in the map --> key: gameID value: game Object
      gameMap.set(gameID, game);

      // Send gameID message
      let gameIDMessage = JSON.stringify([{ 'gameID': gameID }]); // Convert JSON to string inorder to send
      console.log("---------->>>>>>>>>>Sent message",gameIDMessage);
      ws.send(gameIDMessage);
    } 
    console.log(" ");   
    console.log("         OUTSIDE OF IF STATEMENT: Check object values: player:", player.IP,"should have ws and ip, game:",game.lesson);
    console.log(" ");

    if (message[0].request == 'choicesAndPrompt') {
      // game.lesson = message[0].lesson;
      // game.gameID = message[0].gameID;
      let allMessages = await getChoicesAndPrompt(game); // returns a promise of an array of messages
      console.log("---------->>>>>>>>>>Sent message 'choicesAndPrompt'");
      ws.send(stringifyChoicesAndPrompt("choicesAndPrompt", allMessages[0]));
    }
    /* if message = join
     *  we can look at the gameID they sent us, and look in the map to see if it exists.
     *  If it exists, then we access the game objec that is the corresponding value with that gameID key,
     *  and we push this player to that property "players" of that specific game object.
     */
    if (message[0].request == 'join') {
      var gameID = parseInt(message[0].gameID);
      console.log("         in 'join': Check gameID value that came in:", gameID, "typeOf gameID:", (typeof gameID));
      // var joinGameIDMessage = JSON.stringify([{ 'isValidGameID': isValidGameID }]); // Convert JSON to string inorder to send
      // look up in the map and see if any key equals that gameID they requested
      if (gameMap.has(gameID)) {
        // console.log("         in 'join': Check object values: game:", game,"should have ws and ip, game.lesson:",game.lesson);
        // get it, then set it
        let game = gameMap.get(gameID)
        // push player into that game
        game.players.push(player); 
        let joinGameIDMessage = JSON.stringify([{ 'isValidGameID': true }]); // Convert JSON to string inorder to send
        console.log("---------->>>>>>>>>>Sent message",joinGameIDMessage);
        ws.send(joinGameIDMessage);
      }
      else {
        let joinGameIDMessage = JSON.stringify([{ 'isValidGameID': false }]); // Convert JSON to string inorder to send
        ws.send(joinGameIDMessage);
      }
    }

  });
});

function getGameID() {
  return new Promise(function (resolve, reject) {
    connection.query(
      "SELECT AUTO_INCREMENT " +
      "FROM information_schema.TABLES " +
      "WHERE TABLE_SCHEMA = 'forwords' " +
      "AND TABLE_NAME = 'Game';", function (error, results) {
        if (error)
          throw error;
        resolve(results[0].AUTO_INCREMENT);
      });
  });
}

function setGame(lessonID, promptType, choiceType, partOfSpeech) {
  return new Promise(function (resolve, reject) {
    connection.query(
      "INSERT INTO Game (lessonID, promptType, choiceType, partOfSpeech) " +
      "VALUES (" + lessonID + ", " + promptType + ", " + choiceType + ", " + partOfSpeech + ");", function (error, results) {
        if (error)
          throw error;
        resolve("setGame completed!");
      });
  });
}



















/*
// Need an array of ws objects to represent each player

var players = [];
var games = [];

// WebSocket
ws.on('connection', function connection(ws, req) {
  var IPaddress = req.connection.remoteAddress.replace(/.*:/, '')
  console.log('Connection accepted:', IPaddress);

  var playerOne = new Player(IPaddress, ws, [], {}, 0);

  players.push(playerOne);

  var gameOne = new Game()

  // If a message is received
  ws.on('message', async function incoming(message) {
    // Turn every received message into a JSON immediately to access it!
    let receivedMessage = JSON.parse(message);
    console.log(`Received message: ${message}`);

    if (receivedMessage[0].request == 'soloCreate') {
      let lesson = receivedMessage[0].lesson;
      gameOne.lesson = lesson;
      // Get a gameID to send to player
      var gameID = 0;
      gameOne.gameID = gameID;
      var stringifiedMessage = JSON.stringify(
        [{
          'gameID': gameID
        }]
      );
      // Send gameID
      ws.send(stringifiedMessage);

      playerOne.gameID = gameID;
      // console.log("does it read playerOne?: ", playerOne);
      // console.log("does it read players[]?: ", players);
      (gameOne.players) = [playerOne];
      // console.log("does it read gameOne.Players?: ", gameOne.players);
      games.push(gameOne);
      console.log("does it read games[0]?: ", games[0]);
    }
    // If the client is requesting choices and a prompt
    if (receivedMessage[0].request == 'choicesAndPrompt') {
      players[0].ws.send([{
        'IF YOU GET THIS THEN IT WORKED KINDA?!': 'hello'
      }]);
      // go thru all the players in the game this request is coming from
      for (let i = 0; i < games[playerOne.gameID].players.length; i++) {
        players[i].ws.send("If you get this twice, it worked. Sucks if you only get it once, though.")
      }

      // let lesson = receivedMessage[0].lesson;
      // gameOne.lesson = lesson;
      // Get a gameID to send to player
      var gameID = 0;

      var stringifiedMessage = JSON.stringify(
        [{
          'gameID': gameID
        }]
      );
      // Send gameID
      ws.send(stringifiedMessage);

      // gameOne.players.push(playerOne);

      let allMessages = await getChoicesAndPrompt(gameOne); // this returns a promise of a huge array with messages to send


      for (let i = 0; i < gameOne.players.length; i++) {
        gameOne.players[i].ws.send(stringifyChoicesAndPrompt("choicesAndPrompt", allMessages[i]));
        console.log("In for loop, this was sent: allMessages[i]=", allMessages[i]);
      }
    }

    if (receivedMessage[0].request == 'join') {
      games[playerOne.gameID].players.push(playerOne);
      console.log("games[0]: ", games[0])
    }
  });
});

*/




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
        gameID = parseInt(message.substr(4, message.length));
        index = groups.get(gameID).push(ws) - 1;
        groups.get(gameID)[index].send('You are now in a group!');
        // Alert other players that another player has joined group, unneeded for finished product.
        for (var i = 0; i < groups.get(gameID).length - 1; i++) {
          groups.get(gameID)[i] && groups.get(gameID)[i].send('New player has joined!');
        }
        console.log('Current Connections for this group: ' + groups.get(gameID).length);
      } else if (message.includes('ready')) {
        gameID = parseInt(message.substr(5, message.length));
        readyCounter++;
        if (readyCounter == groups.get(gameID).length) {
          readyCounter = 0;
          for (var i = 0; i < groups.get(gameID).length; i++) {
            groups.get(gameID)[i] && groups.get(gameID)[i].send('Game is about to start!');
          }
          // Push all of the details about this group into the group table
          // Start getting words for game and loading Gameplay logic
        }
      }
    }
  })
});
*/

function getChoicesAndPrompt(game) {
  return new Promise(function (resolve, reject) {
    let lesson = game.lesson;
    let numPlayers = game.players.length;
    var players = game.players;

    connection.query('SELECT * FROM word WHERE lesson = ' + lesson + ';', function (error, wordsInLesson) {
      if (error)
        throw error;
      var minID = wordsInLesson[0].ID;
      let prompts = randomWordsPicker(minID, (wordsInLesson.length - 1), numPlayers); // returns array of wordIDs randomly selected from all wordsInLesson

      var allMessages = [];
      // Set Choices and Prompts for every player in game
      for (let i = 0; i < numPlayers; i++) {
        // Set the prompt to be the object from the wordsInLesson array
        players[i].prompt = wordsInLesson[(prompts[i] - minID)];

        let choiceWordIDs = randomWordsPicker(minID, wordsInLesson.length, 3); // 3 random wordIDs to be choices

        // Set the choices to be the objects from the wordsInLesson array
        players[i].choices = [wordsInLesson[(choiceWordIDs[0] - minID)], wordsInLesson[(choiceWordIDs[1] - minID)], wordsInLesson[(choiceWordIDs[2] - minID)]];

        // Make sure the player has the prompt as one of their choices
        players[i].choices.push(players[i].prompt);

        // An array with the choices and the array
        let messageArray = [];
        messageArray.push(players[i].choices[0], players[i].choices[1], players[i].choices[2], players[i].choices[3], players[i].prompt);

        allMessages[i] = messageArray;
      }
      resolve(allMessages);
    })
  });
}

function stringifyChoicesAndPrompt(header, message) {
  // Put header as first element in array
  message.unshift(header);
  // Stringify the array so it can be sent
  return JSON.stringify(message);
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











// HTTP
// Display welcome message 
app.get('/', function (req, res) {
  res.send("Welcome to forwords");
});

// returns the list of lessons
app.get('/lesson-list', function (req, res) {
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
// through a map, and then indexs through the possible gameID in order
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
      groups.set(groupCode, players) // first key-value pair in this map could be ( 1: [] )
      index = groups.get(groupCode).push(ws) - 1; // put ws in that value []           ^^^, 
      groups.get(groupCode)[index].send(groupCode);
      // send code to client for it to be displayed for other users
    } else {
      //Check to see what group the message is being sent from.
      if (message.includes('join')) {
        gameID = parseInt(message.substr(4, message.length));
        index = groups.get(gameID).push(ws) - 1;
        groups.get(gameID)[index].send('You are now in a group!');
        // Alert other players that another player has joined group, unneeded for finished product.
        for (var i = 0; i < groups.get(gameID).length - 1; i++) {
          groups.get(gameID)[i] && groups.get(gameID)[i].send('New player has joined!');
        }
        console.log('Current Connections for this group: ' + groups.get(gameID).length);
      } else if (message.includes('ready')) {
        gameID = parseInt(message.substr(5, message.length));
        readyCounter++;
        if (readyCounter == groups.get(gameID).length) {
          readyCounter = 0;
          for (var i = 0; i < groups.get(gameID).length; i++) {
            groups.get(gameID)[i] && groups.get(gameID)[i].send('Game is about to start!');
          }
          // Push all of the details about this group into the group table
          // Start getting words for game and loading Gameplay logic
        }
      }
    }
  })
});
/*
ws.on('close', () => {
  console.log(`Client #${index} has disconnected`);
  delete playersTotal
[index];
  var i = playersTotal
.length - 1;
  while (playersTotal
  [i] === undefined && i >= 0) {
    playersTotal
  .pop();
    i--;
  }
})
*/
module.exports = app;
