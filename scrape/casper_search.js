var casper = require('casper').create();
var get_notices = require('./get_notices.js').get_notices;
//var process_notice = require('./process_notice.js').process_notice;
var fs = require('fs');

casper.start('http://www.apsjobs.gov.au/', function() {
	this.echo(this.getTitle());
});

casper.thenOpenAndEvaluate('https://www.apsjobs.gov.au/quickSearch.aspx?mn=JobSearch&ifm=true', function() {
	document.querySelector('#ctl00_ContentPlaceHolderSite_txtMinSalary').setAttribute('value', 0);
	document.querySelector('#ctl00_ContentPlaceHolderSite_txtMaxSalary').setAttribute('value', 999999);
	this.echo(this.getTitle());
});
casper.thenClick('#ctl00_ContentPlaceHolderSite_btnSearch', function() {
	this.echo(this.getTitle());
	//;	this.capture('before.png//');
});

casper.thenEvaluate(function() {
	document.querySelector('#ctl00_ContentPlaceHolderSite_lvSearchResults_ucPageSize_lPS').value = 1000;
	document.querySelector('#ctl00_ContentPlaceHolderSite_lvSearchResults_lstSortOptions').value = 'Date';

});
// casper.then(function() {
// 	this.capture('apsjobs1.png');
// });
var notices = [];

casper.thenClick('#ctl00_ContentPlaceHolderSite_lvSearchResults_btnSort', function() {
	// this.capture('apsjobs2.png');
	notices = this.evaluate(get_notices);
this.echo(JSON.stringify(notices,null,2));
fs.write("notices.json", JSON.stringify(notices,null,2));
});

casper.run();
