//  require() method is for load and cache js modules
var createError = require("http-errors");
var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var wsPort = 3333;
var httpsPort = 8888;

// Send static images to frontend
app.use(express.static("images"));

// WebSocket
var WebSocket = require("ws");
var ws = new WebSocket.Server({
  port: wsPort
});

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function(req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});

//Setting up server
var server = app.listen(process.env.PORT || httpsPort, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
  console.log("WebSocket running on port", wsPort);
});
// account needed for connecing to our sql database
var connection = mysql.createConnection({
  host: "localhost",
  user: "nadevai",
  password: "chinese",
  database: "forwords"
});

connection.connect(function(err) {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

// Classes
// Player Class
class Player {
  constructor(IP, ws, choices, prompt, gameID, playerType, email) {
    this.IP = IP;
    this.ws = ws;
    this.choices = choices;
    this.prompt = prompt;
    this.gameID = gameID;
    this.playerType = playerType; // Either 'host', 'member', or 'solo'
    this.email = email;
  }
}
// Game Class
class Game {
  constructor(
    gameID,
    lessonID,
    players,
    words,
    prompts,
    isInitialized,
    promptType,
    choiceType,
    partOfSpeech,
    roundNumber,
    correctAnswers
  ) {
    this.gameID = gameID;
    this.lessonID = lessonID;
    this.players = players;
    this.words = words;
    this.prompts = prompts;
    this.isInitialized = isInitialized;
    this.promptType = promptType;
    this.choiceType = choiceType;
    this.partOfSpeech = partOfSpeech;
    this.roundNumber = roundNumber;
    this.correctAnswers = correctAnswers;
  }
}

// Websocket Code
var gameMap = new Map();
ws.on("connection", function connection(ws, req) {
  var IP = req.connection.remoteAddress.replace(/.*:/, "");
  console.log("Connection accepted:", IP);

  // Immediately create player & game objects, with this ws connection as one of their attributes
  var player = new Player(IP, ws, [], {}, 0, '', '');
  var game = new Game(
    0,
    0,
    [],
    [],
    [],
    false,
    "pinyin",
    "Chinese",
    "NULL",
    1,
    0
  );

  // Now, code for when receiving specific messages :)
  ws.on("message", async function incoming(message) {
    // console.log(
    //   "<<<<<<<<<<         Received message: ",
    //   message,
    //   "from: ",
    //   player.IP
    // );
    message = JSON.parse(message);

    /* OPTIONS FOR WHAT THE USER WILL SEND:
     * 'create' - they are either a single player, or the host of a multiplayer game. Includes the lesson #.
     * 'initGame' - 
     * 'join', gameID - they are trying to join a multiplayer game with that gameID
     * 'initChoicesAndPrompt' - they are requesting their choices and prompts to be sent to them
     */

    if (message[0].request == "create") {
      // Set up game
      var gameID = await getGameID(); // should return an int that is the next wordID available in the Game table
      player.gameID = gameID;
      player.playerType = "host";
      const email = message[0].email;
      player.email = email;
      var lessonID = message[0].lessonID;
      game.lessonID = lessonID;
      game.gameID = gameID;
      game.players = [player];
      insertGame(game);
      insertPlayer(player);
      // Put this in the map --> key: gameID value: game Object
      gameMap.set(gameID, game);
      // Send gameID message
      let gameIDMessage = JSON.stringify([{ gameID: gameID }]); // Convert JSON to string inorder to send
      // console.log("         >>>>>>>>>>Sent message", gameIDMessage);
      ws.send(gameIDMessage);
    }

    if (message[0].request == "initGame") {
      var gameID = player.gameID;
      if (gameMap.get(gameID).players.length > 1) {
        var initGameMessage = JSON.stringify([{ isGameInitialized: true }]); // Convert JSON to string inorder to send;
        for (let i = 0; i < gameMap.get(gameID).players.length; i++) {
          // console.log("         >>>>>>>>>>Sent message", initGameMessage);
          gameMap.get(gameID).players[i].ws.send(initGameMessage);
        }
      } else {
        var initGameMessage = JSON.stringify([{ isGameInitialized: false }]); // Convert JSON to string inorder to send;
        // console.log("         >>>>>>>>>>Sent message", initGameMessage);
        ws.send(initGameMessage);
      }
    }

    if (message[0].request == "initChoicesAndPrompt") {
      var gameID = checkGameIDOfWS(ws, gameMap);

      if (player.playerType == "host") {
        gameMap.get(gameID).isInitialized = true;

        // Set up choices and prompts for the game
        gameMap.get(gameID).words = [];
        gameMap.get(gameID).prompts = [];
        gameMap.get(gameID).words = await getGameChoices(gameMap.get(gameID));
        gameMap.get(gameID).prompts = getPrompts(gameMap.get(gameID));

        var allMessages = [];
        var count = 0;
        for (let i = 0; i < gameMap.get(gameID).players.length; i++) {
          gameMap.get(gameID).players[i].choices = [];
          gameMap.get(gameID).players[i].prompt = {};
          while (gameMap.get(gameID).players[i].choices.length < 4) {
            gameMap
              .get(gameID)
              .players[i].choices.push(gameMap.get(gameID).words[count]);
            count++;
          }
          gameMap.get(gameID).players[i].prompt = gameMap.get(gameID).prompts[
            i
          ];
          // An array with the choices and the prompt
          let messageArray = [];
          messageArray.push(
            gameMap.get(gameID).players[i].choices,
            gameMap.get(gameID).players[i].prompt
          );
          messageArray.unshift("choicesAndPrompt");
          allMessages[i] = messageArray;
          // console.log("        initChoicesandPrompt messageArray i=",i, allMessages[i][1][3].wordID);
        }

        // Send messages to every player with their choices/prompts
        for (let i = 0; i < gameMap.get(gameID).players.length; i++) {
          gameMap
            .get(gameID)
            .players[i].ws.send(JSON.stringify(allMessages[i]));
        }
      }
    }

    if (message[0].request == "join") {
      player.playerType = "member";
      const email = message[0].email;
      player.email = email;
      var gameID = parseInt(message[0].gameID);
      // look up in the map and see if any key equals that gameID they requested
      if (gameMap.has(gameID)) {
        player.gameID = gameID;
        insertPlayer(player);
        // Get game at that gameID in the map, add the player to it
        gameMap.get(gameID).players.push(player);
        let joinGameIDMessage = JSON.stringify([{ isValidGameID: true }]); // Convert JSON to string inorder to send
        // console.log("         >>>>>>>>>>Sent message", joinGameIDMessage);
        ws.send(joinGameIDMessage);

        var numberOfPlayers = gameMap.get(gameID).players.length;
        var playersArray = [];
        for (let i = 0; i < numberOfPlayers; i++) {
          playersArray.push(gameMap.get(gameID).players[i].IP);
        }

        var numberOfPlayersMessage = JSON.stringify([
          { numberOfPlayers: playersArray }
        ]); // Convert JSON to string inorder to send
        for (let i = 0; i < numberOfPlayers; i++) {
          // console.log(
          //   "         >>>>>>>>>>Sent message",
          //   numberOfPlayersMessage
          // );
          gameMap.get(gameID).players[i].ws.send(numberOfPlayersMessage);
        }
      } else {
        let joinGameIDMessage = JSON.stringify([{ isValidGameID: false }]); // Convert JSON to string inorder to send
        ws.send(joinGameIDMessage);
      }
    }

    if (message[0].request == "input") {
      var isCorrect = false;
      var input = message[0].input;

      var inputGameID = checkGameIDOfWS(ws, gameMap);
      var inputEmail = checkEmailOfWS(ws, gameMap);
      var inputGame = gameMap.get(inputGameID);
      /*
       * Given: [{"request":"input","inputGameID":1,"input":94}]
       * Cases (message need same format because all players listening and need to handle message):
       *
       * Player pressed the correct prompt which they have
       *  Message 1 (prompt and isCorrect) sent to presser:
       *    Changing prompt (update)
       *    Validating correct answer
       *    Game continues until next person inputs
       *
       * Player pressed the correct prompt that someone else had
       *  Message 2 (isCorrect) sent to presser:
       *    Validate correct answer
       *    Game continues until next person inputs
       *  Message 3 (prompt) sent to prompt owner:
       *    Change prompt (update)
       *    Game continues until next person inputs
       *
       * Player pressed the wrong prompt
       *  Message 4 (isCorrect) sent to presser:
       *    Validate wrong answer
       *    Game continues until next person inputs
       */
      for (let i = 0; i < inputGame.players.length; i++) {
        if (input == inputGame.players[i].prompt.wordID) {
          isCorrect = true;
          insertInput(input, inputEmail, inputGameID, true);
          gameMap.get(inputGameID).correctAnswers++;

          let newPrompt = getSinglePrompt(
            inputGame,
            inputGame.players[i].prompt
          );
          if (gameMap.get(inputGameID).correctAnswers % (gameMap.get(inputGameID).players.length * 4) == 0) {
            gameMap.get(inputGameID).roundNumber++;
            gameMap.get(inputGameID).correctAnswers = 0;
          }
          // I answered my own prompt
          if (ws === inputGame.players[i].ws) {
            // Send them their new prompt, and that it was correct
            let newPromptAndValidationMessage = JSON.stringify([
              "message1",
              { roundNumber: gameMap.get(inputGameID).roundNumber },
              { oldInput: input },
              newPrompt
            ]);
            ws.send(newPromptAndValidationMessage);
            console.log(
              "       sent message1[1]:",
              newPromptAndValidationMessage
            );
            inputGame.players[i].prompt = newPrompt;
          }
          // I answered your prompt
          else {
            // Send player that inputted that it was correct
            let validationMessage = JSON.stringify([
              "message2",
              { roundNumber: gameMap.get(inputGameID).roundNumber },
              { oldInput: input }
            ]);
            ws.send(validationMessage);
            console.log("       sent message2");

            console.log(
              "             In input, it was someone else's prompt: ",
              inputGame.players[i].IP
            );
            // Send them their new prompt
            let newPromptAndValidationMessage = JSON.stringify([
              "message3",
              { roundNumber: gameMap.get(inputGameID).roundNumber },
              newPrompt
            ]);
            inputGame.players[i].ws.send(newPromptAndValidationMessage);
            console.log("       sent message3");
            inputGame.players[i].prompt = newPrompt;
          }
        }
      }
      // If the player's input was incorrect
      var validationMessage = JSON.stringify([
        "message4",
        { roundNumber: gameMap.get(inputGameID).roundNumber },
        { oldInput: input }
      ]);
      if (!isCorrect) {
        insertInput(input, inputEmail, inputGameID, false);
        ws.send(validationMessage);
        console.log("       sent message4");
      }
    }

    if (message[0].request == "endGame") {
      const score = await getScore(player);
      var scoreMessage = JSON.stringify(["score", { roundNumber: gameMap.get(player.gameID).roundNumber}, { score: score }]); // Convert JSON to string inorder to send;
      console.log("         >>>>>>>>>>Sent message", scoreMessage);
      ws.send(scoreMessage);

      gameMap.delete(game.gameID);
      // Clear out player & game objects once the game is over
      player = new Player(IP, ws, [], {}, 0);
      game = new Game(0, 0, [], [], [], false, "pinyin", "Chinese", "NULL", 0);
    }
  });
});

function checkGameIDOfWS(ws, map) {
  for (const value of map.values()) {
    for (let i = 0; i < value.players.length; i++) {
      if (ws == value.players[i].ws) {
        return value.players[i].gameID;
      }
    }
  }
}

function checkEmailOfWS(ws, map) {
  for (const value of map.values()) {
    for (let i = 0; i < value.players.length; i++) {
      if (ws == value.players[i].ws) {
        return value.players[i].email;
      }
    }
  }
}

function getGameID() {
  return new Promise(function(resolve, reject) {
    connection.query(
      "SELECT AUTO_INCREMENT " +
        "FROM information_schema.TABLES " +
        "WHERE TABLE_SCHEMA = 'forwords' " +
        "AND TABLE_NAME = 'Game';",
      function(error, results) {
        if (error) throw error;
        resolve(results[0].AUTO_INCREMENT);
      }
    );
  });
}

function insertGame(game) {
  return new Promise(function(resolve, reject) {
    let lessonID = game.lessonID;
    let promptType = game.promptType;
    let choiceType = game.choiceType;
    let partOfSpeech = game.partOfSpeech;
    connection.query(
      "INSERT INTO Game (lessonID, promptType, choiceType, partOfSpeech) " +
        "VALUES (" +
        lessonID +
        ", '" +
        promptType +
        "', '" +
        choiceType +
        "', '" +
        partOfSpeech +
        "');",
      function(error, results) {
        if (error) throw error;
        resolve("setGame completed!");
      }
    );
  });
}

function insertPlayer(player) {
  console.log("insertPlayer(", player.email,")!");
  return new Promise(function(resolve, reject) {
    let email = player.email;
    let gameID = player.gameID;
    var sql = "INSERT INTO Player VALUES ((SELECT userID FROM User WHERE email = ?), ?);"
    var inserts = [email, gameID];
    sql = mysql.format(sql, inserts);
    connection.query(sql, inserts, function(error) {
        if (error) throw error;
        resolve("insertPlayer completed!");
      }
    );
  });
}

// insertInput(input, inputEmail, gameID, true);
function insertInput(wordID, email, gameID, wasAnsweredCorrectly) {
  // console.log("insertInput()! params=wordID=", wordID, email, "gameID=", gameID, "correct?:", wasAnsweredCorrectly);
  return new Promise(function(resolve, reject) {
    let correctBit = wasAnsweredCorrectly ? 1 : 0;
    var sql = "INSERT INTO InputHistory (wordID, userID, gameID, wasAnsweredCorrectly) VALUES " +
    "(?, (SELECT userID FROM User WHERE email = ?), ?, ?);"
    var inserts = [wordID, email, gameID, correctBit];
    sql = mysql.format(sql, inserts);
    connection.query(sql, inserts, function(error) {
        if (error) throw error;
        resolve("insertPlayer completed!");
      }
    );
  });
}

// At the begginning of each round, this function will generate 4 consistent choices for each player.
function getGameChoices(game) {
  return new Promise(function(resolve, reject) {
    let lessonID = game.lessonID;
    let numPlayers = game.players.length;

    connection.query(
      "SELECT * FROM Word NATURAL JOIN Contains WHERE lessonID = " +
        lessonID +
        ";",
      function(error, wordsInLesson) {
        if (error) throw error;

        var minID = wordsInLesson[0].wordID;

        var choiceWordsIDs = randomWordsPicker(
          minID,
          wordsInLesson.length,
          4 * numPlayers
        ); // 4*numPlayers wordIDs to be choices
        let wordArray = [];
        for (let i = 0; i < choiceWordsIDs.length; i++) {
          wordArray.push(wordsInLesson[choiceWordsIDs[i] - minID]);
        }
        resolve(wordArray);
      }
    );
  });
}

function getScore(player) {
  return new Promise(function(resolve, reject) {
    let email = player.email;
    let gameID = player.gameID;
    var sql = "SELECT * FROM InputHistory " +
    "WHERE userID = (SELECT userID FROM User WHERE email = ?) AND gameID = ? AND wasAnsweredCorrectly = 1;";
    var inserts = [email, gameID];
    var sql = mysql.format(sql, inserts);
    connection.query(sql, inserts, function(error, results) {
      if (error) throw error;
      let score = results.length;
      resolve(score);
    }
  );
});
}


// When initializing round, this code will generate prompts for each player.
function getPrompts(game) {
  var numPlayers = game.players.length;
  let promptWordIndex = randomWordsPicker(0, game.words.length, numPlayers); // numPlayers to be prompts
  let promptArray = [];
  for (let i = 0; i < numPlayers; i++) {
    promptArray.push(game.words[promptWordIndex[i]]);
    // console.log("In getPrompts, array contains: ", promptArray[i].wordID);
  }
  // console.log("getPrompts: promptArray--should be 2 random words from words", promptArray[0].wordID, promptArray[1].wordID);
  return promptArray;
}

function getSinglePrompt(game, currentPrompt) {
  // Generate a new word that is not currently a prompt, but is also someone's current choice
  let newPrompt = randomWordsPicker(0, game.words.length, 1); // random wordID from list of all words
  let newPromptObj = game.words[newPrompt];

  while (game.prompts.includes(newPromptObj)) {
    newPromptObj = game.words[randomWordsPicker(0, game.words.length, 1)];
  }

  for (let i = 0; i < game.prompts.length; i++) {
    if (game.prompts[i] === currentPrompt) {
      game.prompts[i] = newPromptObj;
    }
  }

  return newPromptObj;
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

//Generate a random number between the minimum wordID in that lessonID and the maximum wordID in that lesson
function randomNumGen(minID, lessonWordsCount) {
  let maxID = minID + lessonWordsCount;
  return Math.floor(Math.random() * (maxID - minID) + minID);
}

Array.prototype.shuffle = function() {
  var input = this;

  for (var i = input.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemAtIndex = input[randomIndex];

    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
};




// HTTP

// Get Methods

// Display welcome message
app.get("/", function(req, res) {
  res.send("Welcome to forwords!");
});

// returns the list of lessons
app.get("/lesson-list", function(req, res) {
  connection.query("SELECT * FROM Lesson;", function(error, results) {
    if (error) throw error;
    res.json(results);
  });
});

// return the info for a given user with this email
// TODO: make this so only authorized users who have auth'd with this email can access this info
// OR only if they are a teacher of this student they can access this info
app.get("/:email", function(req, res) {
  const { email } = req.params;
  var sql =
    "SELECT * FROM User WHERE userID = (SELECT User.userID from User WHERE email = ?);";
  var inserts = [email];
  sql = mysql.format(sql, inserts);
  connection.query(sql, inserts, function(error, results) {
    if (error) {
      console.log("the err.Error object = ", error);
      res.send(error);
      return connection.rollback(function() {
        // throw error;
      });
    }
    res.json(results);
  });
});

// returns the role someone has in a course (either teacher or student)
app.get("/course-role/:email/:courseID", function(req, res) {
  const { email, courseID } = req.params;
  var sql =
    "SELECT role FROM Participation WHERE userID = (SELECT userID from User where email = ?) and courseID = ?";
  var inserts = [email, courseID];
  sql = mysql.format(sql, inserts);
  connection.query(sql, inserts, function(error, results) {
    if (error) {
      console.log("the err.Error object = ", error);
      res.send(error);
      return connection.rollback(function() {
        // throw error;
      });
    }
    res.json(results);
  });
});

// The email and courseID are received in the params of the request.
// returns the list of students in the given course.
app.get("/student-list/:email/:courseID", function(req, res) {
  const { email, courseID } = req.params;
  // Check the role of this user
  var sql =
    "SELECT role FROM Participation WHERE userID = (SELECT userID from User where email = ?) AND courseID = ?";
  inserts = [email, courseID];
  mysql.format(sql, inserts);
  connection.query(sql, inserts, function(error, results) {
    if (error) {
      console.log("the err.Error object = ", error);
      res.send(error);
      return connection.rollback(function() {
        // throw error;
      });
    }
    const role = results[0].role;
    // If this userID has the role "teacher" for this courseID
    if (role === "teacher") {
      // If this userID has the role "teacher" for this courseID
      var sql =
        "SELECT Course.courseID, User.userID, User.firstName, User.lastName, Participation.role " +
        "FROM Course NATURAL JOIN User NATURAL JOIN Participation " +
        "WHERE courseID = ? AND Participation.role = 'student'";
      inserts = [courseID];
      mysql.format(sql, inserts);
      connection.query(sql, inserts, function(error, results) {
        if (error) {
          console.log("the err.Error object = ", error);
          res.send(error);
          return connection.rollback(function() {
            console.log("/student-list error");
            // throw error;
          });
        }
        res.json(results);
      });
    } else {
      res.send("403");
    }
  });
});

// returns the list of courses the user with this email is in
// PROBLEM: anyone could find out what classes anyone is in,
// we should do something with an auth token or something.
app.get("/my-courses/:email/:role", function(req, res) {
  const { email, role } = req.params;
  var sql =
    "SELECT * FROM Course WHERE courseID IN (SELECT courseID FROM Participation WHERE role = ? AND userID = " +
    "(SELECT userID FROM User WHERE email = ?)" +
    ")";
  inserts = [role, email];
  sql = mysql.format(sql, inserts);
  connection.query(sql, function(error, results) {
    if (error) throw error;
    res.json(results);
  });
});
// Post Methods

// Add this user as a student in this course to the Participation table, as long as
// this course exists.
app.post("/add-course", function(req, res) {
  const { courseCode, email } = req.body;
  connection.beginTransaction(function(err) {
    if (err) {
      // do something if there is an error
    }
    // Get the userID for this email
    var sql = "SELECT userID FROM User WHERE email = ?";
    var inserts = [email];
    connection.query(sql, inserts, function(error, results) {
      if (error) {
        console.log("the err.Error object = ", error);
        res.send(error);
        return connection.rollback(function() {
          // throw error;
        });
      }
      const userID = results[0].userID;

      var sql =
        "INSERT INTO Participation (userID, courseID, role) VALUES (?, ?, ?)";
      var inserts = [userID, courseCode, "student"];
      sql = mysql.format(sql, inserts);
      // Insert into Participation
      connection.query(sql, inserts, function(error, results) {
        if (error) {
          console.log("the err.Error object = ", error);
          res.send(error);
          return connection.rollback(function() {
            // throw error;
          });
        }

        connection.commit(function(err) {
          if (err) {
            return connection.rollback(function() {
              // throw err;
            });
          }
          res.send();
        });
      });
    });
  });
});

// If they are a teacher
// Add this course to the Course table
// Add this user as a teacher in this course to the Participation table
app.post("/create-course", function(req, res) {
  const { title, langauge, email } = req.body;
  var sql = "INSERT INTO Course (title, langauge) VALUES (?, ?)";
  var inserts = [title, langauge];
  sql = mysql.format(sql, inserts);
  connection.beginTransaction(function(err) {
    if (err) {
      // do something if there is an error
    }
    // Insert into Course
    connection.query(sql, inserts, function(error, results) {
      if (error) {
        console.log("the err.Error object = ", error);
        res.send(error);
        return connection.rollback(function() {
          // throw error;
        });
      }
      var courseID = results.insertId;

      // Get the userID for this email
      var sql = "SELECT userID FROM User WHERE email = ?";
      var inserts = [email];
      connection.query(sql, inserts, function(error, results) {
        if (error) {
          console.log("the err.Error object = ", error);
          res.send(error);
          return connection.rollback(function() {
            // throw error;
          });
        }
        const userID = results[0].userID;

        var sql =
          "INSERT INTO Participation (userID, courseID, role) VALUES (?, ?, ?)";
        var inserts = [userID, courseID, "teacher"];
        sql = mysql.format(sql, inserts);
        // Insert into Participation
        connection.query(sql, inserts, function(error, results) {
          if (error) {
            console.log("the err.Error object = ", error);
            res.send(error);
            return connection.rollback(function() {
              // throw error;
            });
          }
          connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                // throw err;
              });
            }
            res.send();
          });
        });
      });
    });
  });
});

// once the user registers, adds user to User table
app.post("/add-user", function(req, res) {
  const { email, username, lastName, firstName } = req.body;
  var sql =
    "INSERT INTO User (email, username, lastName, firstName) VALUES (?, ?, ?, ?)";
  var inserts = [email, username, lastName, firstName];
  sql = mysql.format(sql, inserts);

  connection.beginTransaction(function(err) {
    if (err) {
      // res.send({err.})
    }
    connection.query(sql, inserts, function(error, results) {
      if (error) {
        console.log("the err.Error object = ", error);
        res.send(error);
        return connection.rollback(function() {
          // throw error;
        });
      }

      connection.commit(function(err) {
        if (err) {
          return connection.rollback(function() {
            // throw err;
          });
        }
        res.send();
        // console.log("success!");
      });
    });
  });
});

// Delete Methods

// Delete a course
// Parameters: The email and the courseID.
// Deletes this course from the Course table.
app.delete("/delete-course/:email/:courseID", function(req, res) {
  const { email, courseID } = req.params;

  // Check the role of this user
  var sql =
    "SELECT role FROM Participation WHERE userID = (SELECT userID from User where email = ?) AND courseID = ?";
  inserts = [email, courseID];
  mysql.format(sql, inserts);
  connection.query(sql, inserts, function(error, results) {
    if (error) {
      console.log("the err.Error object = ", error);
      res.send(error);
      return connection.rollback(function() {
        // throw error;
      });
    }
    const role = results[0].role;
    // If this userID has the role "teacher" for this courseID
    if (role === "teacher") {
      var sql = "DELETE FROM Course WHERE courseID = ?";
      inserts = [courseID];
      mysql.format(sql, inserts);
      connection.query(sql, inserts, function(error, results) {
        if (error) {
          console.log("the err.Error object = ", error);
          res.send(error);
          return connection.rollback(function() {
            // throw error;
          });
        }
        res.send();
      });
    } else {
      // students should not be able to delete courses
      return;
    }
  });
});

// Remove a student from a course
// Parameters: The email and the courseID.
// Deletes this course from the Course table.
app.delete("/unenroll-student/:email/:courseID", function(req, res) {
  const { email, courseID } = req.params;
  var sql =
    "DELETE FROM Participation WHERE courseID = ? AND userID = (SELECT userID FROM User WHERE email = ?)";
  inserts = [courseID, email];
  mysql.format(sql, inserts);
  connection.query(sql, inserts, function(error, results) {
    if (error) {
      console.log("the err.Error object = ", error);
      res.send(error);
      return connection.rollback(function() {
        // throw error;
      });
    }
    res.send();
  });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  /* render the error page
  res.sendStatus(err.status || 500);
  res.sendStatus(err.status);
  res.render(
    "error"
  );
  */
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
