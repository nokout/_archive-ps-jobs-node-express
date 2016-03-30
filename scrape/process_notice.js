function process_notice(response) {
	// console.log('Response Object: ', JSON.stringify(response));
	var local_notice = {};

	var notice_structure = [{
		id: "portfolio",
		name: "Portfolio",
		selector: "#ctl00_c_ucNoticeDetails_tdPortfolio",
		process: function(portfolio) {
			return portfolio.trim();
		}
	}, {
		id: "agency",
		name: "Agency",
		selector: "td.agency",
		process: function(agency) {
			return agency.trim();
		}
	}, {
		id: "notice_id",
		name: "Notice ID",
		selector: "td.noticeType",
		process: function(notice_id) {
			return notice_id.match(/(\d+)$/)[0].trim();
			// return notice_id.trim();
		}
	}, {
		id: "notice_type",
		name: "Notice Type",
		selector: "td.noticeType",
		process: function(notice_type) {
			return notice_type.split(" ")[0].trim();
		}
	}, {
		id: "closing",
		name: "Closing Date",
		selector: "td.closingDate",
		process: function(closing) {
			//      notice_details.published_date = new Date(Date.parse(notice_published)).toISOString();

			var temp_date_string = closing.substring(closing.indexOf(":") + 1, closing.length).trim();
			return new Date(Date.parse(temp_date_string));
			//return temp_date_object.toISOString();
		}
	}, {
		id: "title",
		name: "Position Title",
		selector: "#ctl00_c_ucNoticeDetails_ucNoticeView_tbrPositionTitle td:nth-child(2)",
		process: function(title) {
			return title.trim();
		}
	}, {
		id: "agency_division",
		name: "Division",
		selector: "#ctl00_c_ucNoticeDetails_ucNoticeView_tbrDivision td:nth-child(2)",
		process: function(agency_division) {
			return agency_division.trim();
		}
	}, {
		id: "position_type_string",
		name: "Position Type",
		selector: "#ctl00_c_ucNoticeDetails_ucNoticeView_tbrPositionType td:nth-child(2)",
		process: function(position_types) {
			var temp_array = position_types.split(",");
			return temp_array.map(function(item) {
				return item.trim();
			});
		}
	}, {
		id: "location",
		name: "Location",
		selector: "#ctl00_c_ucNoticeDetails_ucNoticeView_ucToClassificationsLabel_tbrLocation td:nth-child(2)",
		process: function(location) {
			var temp_array = location.split(";");
			return temp_array.map(function(item) {
				return item.trim();
			});
		}
	}, {
		id: "classification",
		name: "Classification",
		selector: "#ctl00_c_ucNoticeDetails_ucNoticeView_ucToClassificationsLabel_tbrClassification td:nth-child(2)",
		process: function(classification) {
			var temp_array = classification.split(",");
			return temp_array.map(function(item) {
				return item.trim();
			});
		}
	}, {
		// 	id: "position_num",
		// 	name: "Position Number",
		// 	selector: "#ctl00_c_ucNoticeDetails_ucNoticeView_tbrPositionNo td:nth-child(2)",
		// 	process: function(position_num) {
		// 		return position_num.trim();
		// 	}
		// }, {
		id: "agency_website_url",
		name: "Agency Website",
		selector: "#ctl00_c_ucNoticeDetails_ucNoticeView_tbrAgencyUrlTop td:nth-child(2)",
		process: function(website) {
			return website.trim();
		}
	}, {
		id: "orig_notice_url",
		name: "Original Notice",
		selector: null,
		process: function(notice) {
			return window.location.href.trim();
		}
	}, {
		id: "salary",
		name: "Salary",
		selector: "#ctl00_c_ucNoticeDetails_ucNoticeView_tbrSalary td:nth-child(2)",
		process: function(salary) {
			return salary.trim();
		}
	}, {
		id: "full_position_description",
		name: "Position Description",
		selector: "#viewContent",
		process: function(description, selector) {
			var $clone = $(this.selector).clone();
			$clone.find("table").remove();
			return $clone.html();
		}
	}, {
		id: "duties_description",
		name: "Duties",
		selector: "#viewContent",
		process: function(description, selector) {
			var all_html = [];
			var $clone = $(this.selector).clone();
			$clone.find("table").remove();

			all_html = $clone.html().split('\n');

			var is_duties = false;
			var output = [];
			for (var i = 0; i < all_html.length; i++) {
				if (!is_duties) {
					if (all_html[i].trim() == "<h3>Duties</h3>") {
						is_duties = true;
					}
				} else { //Duties Line
					if (all_html[i].substring(0, 4) == "<h3>") {
						break; //finished processing
					} else {
						//add line to output
						//remove special characters
						// all_html[i].replace(/\t/g, "")
						output.push(all_html[i].trim());
					}
				}
			}
			return output.join(' ');

			// __utils__.log($(selector + h3[text = 'Duties']).nextUntil(":header"), info);

			// return this.full_position_description.substring(0, 100)
			// var $clone = $(this.selector).clone();
			var duties_index = $(this.selector + "h3[text='Duties']").index();

			return $clone.find("*").text();

			//get up to the next header
			// $clone.find("table").remove();
			// return $clone.html();
			// return description;
		}
	}];


	for (var i = 0; i < notice_structure.length; i++) {
		var temp_element = null;
		if (document.querySelector(notice_structure[i].selector)) {
			temp_element = document.querySelector(notice_structure[i].selector).innerText.trim();
			local_notice[notice_structure[i].id] = notice_structure[i].process(temp_element);
		} else {
			if (notice_structure[i].id != 'orig_notice_url') {
				__utils__.log(notice_structure[i].selector + "(" + notice_structure[i].id + ") not found", 'warning');
			}
		}
	}
	return local_notice;
}


exports.process_notice = process_notice;
