//global vars === yuck
start = new Date();
hours = 1;
minutes = 00;
seconds = 00;
interval = null;
isRunning = true; //used to pause the clock in the event of a hold or abort
direction = -1;  //for count down this is negative - post launch it will be positive
holdCount = 0;
abortCount = 0;
buttonGreen = "#00ff00";
buttonOrange = "#ffe600";
buttonRed = "#ff0000";

//wait for doc and then GO!
$(document).ready(function() {
	//in future user will be able to set timer length so grab from global val
	start.setHours(hours);
	start.setMinutes(minutes);
	start.setSeconds(seconds);

	//push to html
	$("#hours").html(hours);
	$("#minutes").html((minutes < 10 ? "0" : "") + minutes);
	$("#seconds").html((seconds < 10 ? "0" : "") + seconds);

	//update every second
	interval = setInterval(countdown, 1000);

	//everything else is based on button clicks - see below.
});


//make the clock go
function countdown() {
	start.setSeconds(seconds + (1 * direction)); //increment or decrement the second hand based on direction. dir will always be -1 or 1.
	seconds = start.getSeconds(); //variables to make updating the html easier
	$("#seconds").html((seconds < 10 ? "0" : "") + seconds); //add a leading zero for numbers between 0 and 9
	minutes = start.getMinutes();
	$("#minutes").html((minutes < 10 ? "0" : "") + minutes);
	hours = start.getHours();
	$("#hours").html(hours);

	if (hours == 0 && minutes == 0 && seconds == 0) {  //you have reached launch, flip around to T+ and start counting flight time!
		direction = 1;
		$("#tminus").text("+");
	}
};

//listen for button clicks
$('.btn').click(function() {
	if ($(this).hasClass("btn-success")) {
		styleButton($(this),"go");
	}
	if ($(this).hasClass("btn-warning")) {
		styleButton($(this),"hold");
	}
	if ($(this).hasClass("btn-danger")) {
		styleButton($(this),"abort");
	}
	
});

function styleButton(obj, str) {
	cl(obj,"hold");
	cl(obj,"abort");
	cl(obj,"go");
	keepTrack(obj, str);
};

function keepTrack(obj, str){
	if(! obj.closest(".row").find(".btn").hasClass(str)) {
		if(str == "hold") {
			holdCount++;
		}
		if(str == "abort") {
			abortCount++;
		}
		obj.addClass(str);
		checkAndUpdateStatus(); //update clock and status block
	}
};

function cl(obj, str) {
	if( obj.closest(".row").find(".btn").hasClass(str) ) {
		obj.closest(".row").find(".btn").removeClass(str);
		
		if (str == "hold" && holdCount > 0) {
			holdCount--;
		}
		if (str == "abort" && abortCount > 0) {
			abortCount--;
		}

		checkAndUpdateStatus();
	}
};

function checkAndUpdateStatus() {
	if(abortCount == 0 && holdCount == 0) { //row is clear. GO
		startClock();
		updateClockColors(buttonGreen, "RUNNING");
	}

	if (abortCount == 0 && holdCount > 0) { //row is HOLD
		stopClock();
		updateClockColors(buttonOrange, "HOLD");
	}

	if (abortCount > 0) { //ABORT
		stopClock();
		updateClockColors(buttonRed, "ABORT");
	}

};

function startClock(){
	if(!isRunning) {
		isRunning = true;
		interval = setInterval(countdown, 1000);
	}
};

function stopClock() {
	if(isRunning) {
		isRunning = false;
		clearInterval(interval);
	}
}

function updateClockColors(color, str) { //also updates status block (#run)
	$("#clock").css("color", color);
	$("#clock").css("border-color", color);
	$("#run").text(str);
	$("#run").css("color", color);
	$("#run").css("background-color","#111111");
	$("#run").css("border-color", color);
};