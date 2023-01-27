// wait till document is fully loaded
    const container = $('.container');
    const daily_planner_container = ('<div>');
    const currentDay = $('#currentDay');

    

    function init(){
        renderHeaderDate();
        renderTimeBlocks();

        
    }
    // display header date
    function renderHeaderDate(){
        let todaysDate = moment().format("dddd, MMMM Do");
        currentDay.text(todaysDate);
    }

    /// display time 00blocks
    function renderTimeBlocks(){

        for (let i = 9; i < 20; i++) {
            const row = $('<div class="row">');
            container.append(row);
            const hourCol = $('<div>')
                .attr('class', 'col-2 hour time-block')
                .text(AMorPM(i));
            let areaColor= "";
            if (i <  moment().format("HH")){
                areaColor = "past";
            }else if( i > moment().format("HH")){
                areaColor = "future";
            }else{
                areaColor = "present";
            }
            const planCol = $('<textarea>')
                .attr({'class': `col-9 description ${areaColor}`,
                'id': i   
            });

            const saveIcon = $('<i class="far fa-save"></i>');
            const saveCol = $('<div>').attr('class', 'saveBtn col-1');
            saveCol.append(saveIcon);

            row.append(hourCol, planCol, saveCol);
            
        }
        

    }

    function AMorPM(hour){
        let day = hour < 12 ? "AM" : "PM";   
        let hourOfDay = hour % 12;
        hourOfDay = hourOfDay ?  hourOfDay : 12;
        return hourOfDay + day;
    }
    
    init();
    //save tasks
    function saveTasks(input){
        localStorage.setItem('tasks', JSON.stringify(input))
    }

    let savedTasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(savedTasks);
    function renderTasks(){

        if (savedTasks){
            savedTasks.forEach(savedTask => {
                // console.log(savedTask.taskID, savedTask.task);
                const task = $(`#${savedTask.taskID}`).val();
                console.log(task);
            });
        }
        
    }

    // retreive savedtasks
   

    $('.saveBtn').on('click', function(e){
        e.preventDefault();
        let taskID = $(this).siblings(".future").attr("id");
        let task = $(this).siblings(".future").val().trim();
        //console.log(taskID, task);
        let tasksArr = [];
        if (savedTasks){
            tasksArr = savedTasks;
        }
        if (task === ""){
            return;
        }
        tasksArr.push({'taskID': taskID, 'task': task})
        saveTasks(tasksArr);
        renderTasks();

    })




   
    