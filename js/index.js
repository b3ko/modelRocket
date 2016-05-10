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


//make the clock go
function countdown() {
    start.setSeconds(seconds + (1 * direction)); //increment or decrement the second hand based on direction. dir will always be -1 or 1.
    seconds = start.getSeconds(); //variables to make updating the html easier
    $("#seconds").html((seconds < 10 ? "0" : "") + seconds); //add a leading zero for numbers between 0 and 9
    minutes = start.getMinutes();
    $("#minutes").html((minutes < 10 ? "0" : "") + minutes);
    hours = start.getHours();
    $("#hours").html(hours);

    if (hours == 0 && minutes == 0 && seconds == 0) {  //you have reach launch, flip around to T+ and start counting flight time!
      direction = 1;
      $("#tminus").text("+");
    }
  };


//a button was clicked on the checklist so update buttons, status, and clock accordingly
 $('.btn').click(function() {  

/*****************************
 //this function seems very repetitive -- NEEDS TO BE refactored!

  refactor ideas:
  1) break into smaller functions
  2) take code that is repeated (other than colors that are used) and pass in a parameter that will grab the approriate values from an array.
    possible issues with this is that each button behaves slightly different. too tired to think straight. bedtime.

*************/
    //a GO was clicked
    if ($(this).hasClass("btn-success")) {
      $(this).closest(".row").find(".btn").css("background-color", "#555555"); //update the other buttons in this row
      $(this).css("background-color", "#00ff00"); //update the GO button
      $(this).css("border-color", "white");
      if(abortCount > 0) {
        if( $(this).closest(".row").find(".btn").hasClass("abort") ) {
          $(this).closest(".row").find(".btn").removeClass("abort");
          abortCount--;
        }
      }
      if(holdCount > 0) {
        if( $(this).closest(".row").find(".btn").hasClass("hold") ) {
          $(this).closest(".row").find(".btn").removeClass("hold");
          holdCount--;
        }
      }

      if (abortCount == 0 && holdCount > 0) 
      {
        $("#clock").css("color", "#ffe600");
          $("#clock").css("border-color", "#ffe600");
          $("#run").text("HOLD");
          $("#run").css("color","#ffe600");
          $("#run").css("background-color","#111111");
          $("#run").css("border-color","#ffe600");
      }

      if(abortCount == 0 && holdCount == 0) { //only start the clock and update status if all holds and aborts are cleared
        if(!isRunning) {  //if the clock was stopped start it again
          isRunning = true;
          interval = setInterval(countdown, 1000);
        }
        $("#clock").css("color", "#00ff00"); //return the clock to GO colors
        $("#clock").css("border-color", "#00ff00");
        $("#run").text("RUNNING");  //update the status
        $("#run").css("color","#00ff00");
        $("#run").css("background-color","#111111");
        $("#run").css("border-color","white");
      }
    }

    //a HOLD was clicked ...update the button, the rest of row, clock, stop the clock, update the status
    if ($(this).hasClass("btn-warning")) {
      if ($(this).closest(".row").find(".btn").hasClass("abort") ) {
        abortCount--;
        $(this).closest(".row").find(".btn").removeClass("hold");
      }
      if( $(this).closest(".row").find(".btn").hasClass("hold"))
        { }
      else {
        holdCount++;
        $(this).closest(".row").find(".btn").css("background-color", "#555555");
        $(this).closest(".row").find(".btn").addClass("hold");
        $(this).css("background-color", "#ffe600");
        $(this).css("border-color", "white");
        clearInterval(interval);
        isRunning = false;
        if (abortCount == 0) {
          $("#clock").css("color", "#ffe600");
          $("#clock").css("border-color", "#ffe600");
          $("#run").text("HOLD");
          $("#run").css("color","#ffe600");
          $("#run").css("background-color","#111111");
          $("#run").css("border-color","#ffe600");
        }
      }
    }

    //an abort was clicked ...update the button, the rest of row, clock, stop the clock, update the status
    if ($(this).hasClass("btn-danger")) {
      if( $(this).closest(".row").find(".btn").hasClass("abort") )
        { }
      else {
        abortCount++;
      }
      $(this).closest(".row").find(".btn").css("background-color", "#ff0000");
      $(this).closest(".row").find(".btn").addClass("abort");
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

