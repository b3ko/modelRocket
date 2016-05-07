$(document).ready(function() {

  $('.btn').click(function() {

    if ($(this).hasClass("btn-success")) {
      $(this).closest(".row").find(".btn").css("background-color", "#555555");
      $(this).css("background-color", "#00ff00");
      $(this).css("border-color", "white");
    }

    if ($(this).hasClass("btn-warning")) {
      $(this).closest(".row").find(".btn").css("background-color", "#555555");
      $(this).css("background-color", "#ffe600");
      $(this).css("border-color", "white");
    }

    if ($(this).hasClass("btn-danger")) {
      $(this).closest(".row").find(".btn").css("background-color", "#ff0000");
      $(this).css("background-color", "#ff0000");
      $(this).css("border-color", "white");
    }

  });
});
