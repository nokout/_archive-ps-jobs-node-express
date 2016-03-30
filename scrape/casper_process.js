var casper = require('casper').create({
	verbose: true,
	logLevel: "debug",
	waitTimeout: 5000,
	exitOnError: false,
	onWaitTimeout: function(timeout) {
		this.log("Time-out", "error");
	},
	clientScripts: ["jquery.js"]
});
var fs = require('fs');
var process_notice = require('./process_notice.js').process_notice;
var notices = JSON.parse(fs.read("notices.json")).slice(0, 50);
var moment = require('moment');
//	console.log(JSON.stringify(notices,null,2));

var full_notices = [];


casper.on("remote.message", function(message) {
	this.echo("Remote>>> " + message);
});

console.log("================================================================");
casper.start();
casper.eachThen(notices, function(response) {
	console.log(">>>Processing>>>: " + response.data.url);
	var published_date = response.data.published_date;
	var url = response.data.url;
var notice = {};
  //test response url starting https://www.apsjobs.gov.au/Errors/GeneralError.
	this.thenOpen(response.data.url);
	this.waitForSelector('#ctl00_c_ucNoticeDetails_ucNoticeView_tbrPositionTitle', function(response) {
		notice = this.evaluate(process_notice);
	});
	this.then(function() {
    notice.published_date = published_date;
		notice.orig_url = url;
    	// fs.write("./output/" + notice.notice_id + ".json", JSON.stringify(notice, null, 2));
		full_notices.push(notice);
	});
});
casper.then(function() {
	console.log("Notices Captured: " + full_notices.length);
	fs.write("full_notices.json", JSON.stringify(full_notices, null, 2));
	console.log("================================================================");
});
casper.run();
