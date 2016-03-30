function get_notices() {

	//I think I will need to get the id into the array aswell.
	// Then I can match and combine the processed date.

	var client_notices = [];
	var rows = document.querySelectorAll("tr.item, tr.altItem");
	for (var i = 0; i < rows.length; i++) {
		var link = "https://" + document.location.hostname + "/" + rows[i].querySelector("td:nth-child(2) a.viA").getAttribute("href");
		var publish_date = rows[i].querySelector("td:nth-child(3)").innerText;
		publish_date = publish_date.substr(publish_date.indexOf(":") + 1).trim().replace(/\s/gi, "-");
		publish_date = new Date(Date.parse(publish_date)).toISOString();
		// change client notices to an object where the id is the index.
		// Then i can merge the other details in during the process step and write them all out later.
		client_notices.push({
			"url": link,
			"published_date": publish_date
		});
	}
	return client_notices;
}

exports.get_notices = get_notices;
