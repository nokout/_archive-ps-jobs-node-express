var notice_structure = [{
	id: "portfolio",
	name: "Portfolio",
	selector: "td.portfolio",
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
		return new Date(Date.parse(temp_date_string)).toISOString();
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
	id: "postition_num",
	name: "Position Number",
	selector: "#ctl00_c_ucNoticeDetails_ucNoticeView_tbrPositionNo td:nth-child(2)",
	process: function(postition_num) {
		return postition_num.trim();
	}
}, {
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
	id: "position_description",
	name: "Position Description",
	selector: "#viewContent", //This is effectively redundant and is only used in the process function, kept here to maintain convention
	process: function(description, selector) {
		var $clone = $(this.selector).clone();
		$clone.find("table").remove();
		return $clone.html();
	}
}];

exports.notice_structure = notice_structure;
