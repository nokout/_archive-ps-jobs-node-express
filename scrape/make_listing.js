//make listing
var fs = require('fs');

var path_head = "./output/";

function readFile(file_path) {
	return new Promise(function(resolve, reject) {
		fs.readFile(file_path, resolve);
	});
}


var listing = [];
fs.readdir(path_head, function(err, files) {
			if (err) {
				console.error(err);
				exit();
			}

			//This is all sorts of syncronous naughtyness!
			for (var i = 0; i < files.length; i++) {
				var notice = JSON.parse(fs.readFileSync(path_head + files[i], 'utf8'));
				listing.push({
					url: notice.orig_notice_url,
					title: notice.title,
					salary: notice.salary,
					position_types: notice.postion_type_string,
					classification: notice.classification,
					published_date: notice.published_date,
					closing: notice.closing
				});
			}
			 fs.writeFile('./listing.json', JSON.stringify(listing, null, 2), function(err){
			 		if (err)
			 			{console.error("Error Thrown:" + err);
						//	throw new Error(err);
						}
			 		console.log('Data Saved');
			 	});
			});
