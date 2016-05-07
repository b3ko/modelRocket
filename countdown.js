//global vars === yuck
start = new Date();
hours = 0;
minutes = 02;
seconds = 00;

//wait for doc and then GO!
$(document).ready(function() {

  var interval = null;

  //in future user will be able to set timer start so grab from global val
  start.setHours(hours);
  start.setMinutes(minutes);
  start.setSeconds(seconds);

  //push to html
  $("#hours").html(hours);
  $("#minutes").html((minutes < 10 ? "0" : "") + minutes);
  $("#seconds").html((seconds < 10 ? "0" : "") + seconds);

  //update every second
  interval = setInterval(function() {

    seconds = start.getSeconds();
    if (seconds == 0) { //this minute is over
      start.setSeconds(59); //roll over to previous min
    } else {
      start.setSeconds(seconds - 1);
    }
    //update global and html
    seconds = start.getSeconds();
    $("#seconds").html((seconds < 10 ? "0" : "") + seconds);

    if (start.getSeconds() == 59) {
      start.setMinutes(minutes - 1);
      minutes = start.getMinutes();
      $("#minutes").html((minutes < 10 ? "0" : "") + minutes);
    }

    if (start.getMinutes() == 59 && start.getSeconds() == 59) {
      start.setHours(hours - 1);
      hours = start.getHours();
      $("#hours").html(hours);
    }

    if (hours == 0 && minutes == 0 && seconds == 0) {
      clearInterval(interval);

    }

  }, 1000);
});
