// Array of text entered by user by hour
var notes = JSON.parse(localStorage.getItem("notes"));
if (notes == null) {
    notes = ["", "", "", "", "", "", "", "", ""]
}
// Current moment and a time moment that will iterate thoughout the program
var now = moment();
var time = moment();
time.startOf('day');
// Integer to deterimine state (past, present, or future) and an array with matching values
var state = 0;
var states = ["past", "present", "future"];
// Array of hour labels to iterate over
var hours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

// Sets the text for the current day
$("#currentDay").text(now.format('MMMM D, YYYY'))
// Checks if the current time is before 9AM
if (now.isBefore(time.add(9, "h"))) {state = 2;}
// Generate hour blocks 
hours.forEach(function(hour, i) {
    // Checks if the current block is in the past, present, or future relative to the current time.
    time.add(1, "h")
    if (state < 2 && now.isBefore(time)) {state++;}
    // Creates HTML structure for each hour
    $(".container").append($('<div ' + hour + ' class="row time-block">' +
    '<p class="col-1 hour">' + hour + '</p>' +
    '<textarea id="text' + hour + '" class="col-10 ' + states[state] + '">' + notes[i] + '</textarea>' +
    '<button id="save' + hour + '" class="col-1 saveBtn">Save</button>'  +
    '</div>'));
    // Adds event listener to save current note to local storage
    $("#save" + hour).on("click", function() {
        notes[i] = $("#text" + hour).val();
        localStorage.setItem("notes", JSON.stringify(notes));
    })
});

