// Array of text entered by user by hour
var notes = JSON.parse(localStorage.getItem("notes"));
if (notes == null) {
    notes = ["", "", "", "", "", "", "", "", ""]
}
// Current moment and iterated time which will count up by the hour
var now = moment();
var time;
// Integer to deterimine state (past, present, or future) and an array with matching values
var state = 0;
var states = ["past", "present", "future"];
// Array of hour labels to iterate over
var hours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

if (moment('22:00:00', 'hh:mm:ss').isBefore('23:00:00', 'hh:mm:ss')) {
    state = 2
};
// Generate hour blocks
hours.forEach(function(hour, i) {
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

