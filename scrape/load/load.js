
var fs = require('fs');
var Datastore = require('nedb');
var db = new Datastore({
	filename: '../../database/notices_database.json',
	autoload: true
});
db.ensureIndex({
	fieldName: 'notice_id',
	unique: true
});
var update_options = {
	upsert: true
};
var notices_file_path = '../full_notices.json';


fs.readFile(notices_file_path,
	function(err, notices) {
		if (err) {
			console.error('ERROR>>> Unable to open notices file "' + notices_file_path + '", exiting.\n', err);
			process.exit(1);
		}
		notices = JSON.parse(notices);
		var inserted_notice_count = 0;
		var updated_notice_count = 0;
		notices.forEach(function(notice) {
			var query = {
				notice_id: notice.notice_id
			};
			db.update(query, notice, update_options, function(err, numAffected, affectedDocuments, upsert) {
				//check num affected
				if (err) {
					console.error('ERROR>>> Update Failed for document id: ' + notice.notice_id);
					console.error(err);
					return;
				}
				if (upsert) {
					inserted_notice_count++;
				} else {
					updated_notice_count++;
				}
			}); //Update
		}); //forEach


//need to create an event to process this bit
		// if (notices.length == inserted_notice_count + updated_notice_count) {
			console.log('Notices: ' + notices.length + 'Inserts: ' + inserted_notice_count + ' Updates: ' + updated_notice_count);
		// } else {
		// 	console.error('ERROR>>> Notices: ' + notices.length + ' Inserts: ' + inserted_notice_count + ' Updates: ' + updated_notice_count);
		// }
		db.count(null, function(err, count) {
			if (err) {
				console.error("ERROR>>> Could not count documents \n", err);
			}
			console.log('Total Documents: ' + count);

		});

	}); //fs
