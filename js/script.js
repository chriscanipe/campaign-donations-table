


// This was a demonstration for how we might go about getting month names from numbers
// Leaving it in here for reference. Ex: `months["01"]` => "January"
var months = {
	"01" : "January",
	"02" : "February",
	"03" : "March",
	"04" : "April",
	"05" : "May",
	"06" : "June",
	"07" : "July",
	"08" : "August",
	"09" : "September",
	"10" : "October",
	"11" : "November",
	"12" : "December"
}





$(document).ready(function() {

	// 1.
	// When the page is loaded,
	// call the loadData() function.

	loadData();

});




function loadData() {
	
	$.getJSON("js/donations_over_5K.json", function(data) {
		writeTable(data);
	});

	// 2.
	// Write an AJAX call here to load your data.
	// Then PASS the data to writeTable();
}



function writeTable(data) {

		for(i=0; i < data.length; i++) {

			/* Date as it exists in our JSON Ex: 2015-05-05 */
			var rawDateString = data[i]["Contribution Date"];
			
			/* The Date as three values separated by a hyphen */
			var dateAsArray = rawDateString.split("-");

			/* Two digit-number for the month, deduced from our data array */
			var monthNum = dateAsArray[1];

			/* Here, we're using the moment.js library to get dates expressed as a
			descriptive string relative to now. Ex: "Four months ago". */
			var relativeToNow = moment(rawDateString).fromNow();

			/* Verbose date takes our raw date string and turns it into something familiar */
			var verboseDate = moment(rawDateString).format('MMM. D, YYYY');

			//if (data[i]["Committee"] === "CITIZENS TO ELECT KURT SCHAEFER ATTORNEY GENERAL") {
			$("table.donations tbody").append(
				"<tr>"+
					"<td data-sort='"+rawDateString+"' class='date'>"+verboseDate+"</td>"+
					"<td class='committee'>"+data[i]["Committee"]+"</td>"+
	                "<td class='information'>"+data[i]["Contribution Information"]+"</td>"+
	                "<td class='amount'>"+data[i]["Amount"]+"</td>"+
                "</tr>"
			);
			//}

		}

		/* Here we're calling the DataTables library to make our table sortable.
		We're passing just one argument, which sets the table to sort by the 4th column
		by default. */
		$('.donations').DataTable(
			{
	        	"order" : [[ 3, "desc" ]]
	    	}
    	);


	// 3.
	// Make a list of every donation made to "CITIZENS TO ELECT KURT SCHAEFER ATTORNEY GENERAL"
	// Do this by looping through the data and writing a new table row (<tr></tr>) for every donation.
	// Each row should contain of three columns (<td></td>): 
	// - Contribution Date
	// - Contributon Information
	// - Amount
}

