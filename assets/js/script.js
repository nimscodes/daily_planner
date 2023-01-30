// wait till document is fully loaded
const container = $('.container');
const daily_planner_container = ('<div>');
const currentDay = $('#currentDay');

// display header date
function renderHeaderDate() {
    let todaysDate = moment().format("dddd, MMMM Do");
    currentDay.text(todaysDate);
}

/// display time blocks
function renderTimeBlocks() {

    for (let i = 9; i < 20; i++) {
        const row = $('<div class="row">');
        container.append(row);
        const hourCol = $('<div>')
            .attr('class', 'col-2 hour time-block')
            .text(AMorPM(i));
        let areaColor = "";
        if (i < moment().format("HH")) {
            areaColor = "past";
        } else if (i > moment().format("HH")) {
            areaColor = "future";
        } else {
            areaColor = "present";
        }
        const planCol = $('<textarea>')
            .attr({
                'class': `col-9 description ${areaColor}`,
                'id': i
            });

        const saveIcon = $('<i class="far fa-save"></i>');
        const saveCol = $('<div>').attr('class', 'saveBtn col-1');
        saveCol.append(saveIcon);

        row.append(hourCol, planCol, saveCol);

    }

}
// dislpay time in AM or PM
function AMorPM(hour) {
    let day = hour < 12 ? "AM" : "PM";
    let hourOfDay = hour % 12;
    hourOfDay = hourOfDay ? hourOfDay : 12;
    return hourOfDay + day;
}

// retrieve saved tasks
let savedTasks = JSON.parse(localStorage.getItem("tasks"));
console.log(savedTasks);

// initialize app
function init() {
    renderHeaderDate();
    renderTimeBlocks();

    renderTasks();
}

//save tasks or events
function saveTasks(input) {
    localStorage.setItem('tasks', JSON.stringify(input))
}

// display events on app reload
function renderTasks() {

    if (savedTasks) {
        savedTasks.forEach(savedTask => {
            $(`#${savedTask.taskID}`).val(savedTask.task);
        });
    }

}


init();

$('.saveBtn').on('click', function (e) {
    e.preventDefault();
    let taskID = $(this).siblings(".future").attr("id");
    let task = $(this).siblings(".future").val().trim();
    //console.log(taskID, task);
    let tasksArr = [];
    if (savedTasks) {
        tasksArr = savedTasks;
    }
    if (task === "") {
        return;
    }
    tasksArr.push({ 'taskID': taskID, 'task': task })
    saveTasks(tasksArr);
    renderTasks();

})





