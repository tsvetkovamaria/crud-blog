var express = require('express');
var router = express.Router();
const mongo_client = require('mongodb').MongoClient;
var db;
var db_link = 'mongodb://localhost:27017/blog';

mongo_client.connect(db_link, function (err, database) {
  if (err) throw err
  db = database;
})

/* GET home page. */
router.get('/', function(req, res, next) {
	db.collection('articles').find().toArray(function(err, results) {
		res.render('index', { title: 'Blog', articles: results});
	})
});

router.get('/new', function(req, res, next) {
	res.render('new', { title: 'Blog'});
});

router.post('/blog', function(req, res){
	var collection = db.collection('articles');
	collection.insert(req.body, function(err, result) {
		if (err) return console.log(err)
   		res.redirect('/');
    })
});	

module.exports = router;
