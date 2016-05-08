//global vars === yuck
start = new Date();
hours = 1;
minutes = 00;
seconds = 00;
var interval = null;
isRunning = true;

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
});

function countdown() {
    isRunning = true;
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
};

 $('.btn').click(function() {

    if ($(this).hasClass("btn-success")) {
      $(this).closest(".row").find(".btn").css("background-color", "#555555");
      $(this).css("background-color", "#00ff00");
      $(this).css("border-color", "white");
      if(!isRunning) {
        interval = setInterval(countdown, 1000);
      }
      $("#clock").css("color", "#00ff00");
      $("#clock").css("border-color", "#00ff00");
      $("#run").text("RUNNING");
      $("#run").css("color","#00ff00");
      $("#run").css("border-color","white");
    }

    if ($(this).hasClass("btn-warning")) {
      $(this).closest(".row").find(".btn").css("background-color", "#555555");
      $(this).css("background-color", "#ffe600");
      $(this).css("border-color", "white");
      clearInterval(interval);
      isRunning = false;
      $("#clock").css("color", "#ffe600");
      $("#clock").css("border-color", "#ffe600");
      $("#run").text("HOLD");
      $("#run").css("color","#ffe600");
      $("#run").css("border-color","#ffe600");
    }

    if ($(this).hasClass("btn-danger")) {
      $(this).closest(".row").find(".btn").css("background-color", "#ff0000");
      $(this).css("background-color", "#ff0000");
      $(this).css("border-color", "white");
      clearInterval(interval);
      isRunning = false;
      $("#clock").css("color","red");
      $("#clock").css("border-color", "#ff0000");
      $("#run").text("ABORT");
      $("#run").css("color","#black");
      $("#run").css("background-color","#ff0000");
      $("#run").css("border-color","#black");
    }
  });

