// wait till document is fully loaded
$(document).ready(function() {

    const container = $('.container');
    const daily_planner_container = ('<div>');
    const currentDay = $('#currentDay');

    init();

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


   
    

});