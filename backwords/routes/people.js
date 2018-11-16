var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(
    { 
      user1: {
        fname: "Rebekah",
        lname: "Stauffer"
        },
      user2: {
        fname: "Nikki",
        lname: "Adevai"
      }
    }
  );
});

module.exports = router;
