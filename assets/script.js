// add current date to the header area
$('#currentDay').text(moment().format('dddd, MMMM Do YYYY'));

const saveBtn = $('.saveBtn');
const clearBtn = $('.clearBtn');

// when click on clear button, information is deleted
clearBtn.on('click', function () {
	localStorage.clear();
	location.reload();
	return false;
});

function timeTracker() {
	//get current hour
	var timeNow = moment().hour();

	// loop over time blocks
	$('.time-block').each(function () {
		var hourBlock = parseInt($(this).attr('id'));

		//adds css classes to hour rows depending on if it's in the present, past, or future
		if (hourBlock < timeNow) {
			$(this).removeClass('future');
			$(this).removeClass('present');
			$(this).addClass('past');
		} else if (hourBlock === timeNow) {
			$(this).removeClass('past');
			$(this).removeClass('future');
			$(this).addClass('present');
		} else {
			$(this).removeClass('present');
			$(this).removeClass('past');
			$(this).addClass('future');
		}
	});
}

// execute function timeTracker
timeTracker();

// gets schedule from local storage
function getSchedule() {
	$('.time-block').each(function () {
		let timeID = $(this).attr('id');
		let schedule = localStorage.getItem(timeID);
		if (schedule !== null) {
			$(this).children('.schedule').val(schedule);
		}
	});
}

// execute function getSchedule
getSchedule();

//when click on save button, the task is saved to the schedule
saveBtn.on('click', function () {
	let time = $(this).parent().attr('id');
	let schedule = $(this).siblings('.schedule').val();
	localStorage.setItem(time, schedule);
});
