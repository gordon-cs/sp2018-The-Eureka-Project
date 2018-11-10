var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/** GET test page */
router.get('/test', function (req, res) {
  res.render('test.js');
})

module.exports = router;