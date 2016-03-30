var express = require('express');
var router = express.Router();

var Datastore = require('nedb');
var db = new Datastore({
	filename: '../database/notices_database.json',
	autoload: true
});
db.ensureIndex({
	fieldName: 'notice_id',
	unique: true
});


router.get('/info', function(req, res) {
	res.render('info', null);
});

router.get('/:page?', function(req, res) {
	var params = {
		offset: parseInt(req.param('offset')), //from url
		page: parseInt(req.params.page) // from route
	};
	if (params.offset <= 0 || isNaN(params.offset)) {
		params.offset = 10;
	} else if (params.offset > 50) {
		params.offset = 50
	}
	if (params.page < 1) {
		params.page = 1;
	}
	var skip = params.offset * (params.page - 1);
	var limit = params.offset;
	var today = Date.now();
//	db.find({ "closing": { $lt: today } })
	db.find({})
		.sort({
			published_date: -1
		})
		.skip(skip)
		.limit(limit)
		.exec(function(err, docs) {
			if (err) {
				console.error('ERROR>>> Could not retrive: ' + err);
				return;
			}
			params.notices = docs;
			db.count({}, function(err, count) {
				params.total_pages = Math.ceil(count / params.offset);

				res.render('page', params);
			});
		});
});




module.exports = router;
