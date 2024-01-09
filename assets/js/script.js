
$(document).ready(function () {

  const now = dayjs();
  const nowHour = now.format('HH');
  const hourBlockCont = $('#hour-block-container');
  const headerDay = $('#currentDay');
  $('#header-p').hide();

headerDay.text(now.format('dddd, MMMM D'));

//writes the hours blocks in HTML uses loop variable to label the block id and text dynamically, and also dynamically builds the arrays of objects for local storage
function createHourBlocks() {
  var taskData = JSON.parse(localStorage.getItem('taskData') || '[]');
  for (var i = 9; i < 18; i++) {
    var index = i - 9
    if (!taskData[index] || taskData[index].task === '') {
      taskData[index] = {task: ''}
    }
    var blockId = i;
    if (i < 12) {
    var hourBlockText = i + 'AM';
  } else if ( i === 12) {
    var hourBlockText = i + 'PM'
  } else {
    var hourBlockText = (i - 12) + 'PM'
  }
    hourBlockCont.append(`<div id="${blockId}" class="row time-block past">
    <div class="col-2 col-md-1 hour text-center py-3">${hourBlockText}</div>
    <textarea class="text col-8 col-md-10 description" rows="3"> </textarea>
    <button id ="saveBtn" class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
  </div>`)
 
  }
  localStorage.setItem('taskData', JSON.stringify(taskData));
};

  //uses the current time to change the CSS class which is responsible for the hour block background color
function colorBlocks() {
  for (var i = 0; i < hourBlockCont.children().length; i++){
    var child = hourBlockCont.children().eq(i);
    var childHour = parseInt(child.attr('id'))
    var difference = parseInt(nowHour) - childHour;
    if (difference > 0) {
      child.removeClass('present', 'future').addClass('past');
    } else if (difference === 0) {
      child.removeClass('past', 'future').addClass('present');
    } else {
      child.removeClass('past', 'present').addClass('future');
    }
  }
};

//writes storage to hour blocks, uses the index as a reference to the object, and to find and write to the correct hour block, and loops through the array
function writeStorage() {
  var taskData = JSON.parse(localStorage.getItem('taskData'));
  var taskDataLength = taskData.length
  for (var i = 0; i < taskDataLength; i++) {
    //add 9 to correct for the hour ids starting at 9
    var idCorrectValue = i + 9
    var selector = "#" + idCorrectValue 
    $(selector).children().eq(1).text(taskData[i].task)
  }
};

//event listener attached to the hour block container, specifically listens to each button and saves tasks based on that id to local storage
hourBlockCont.on('click', '.saveBtn', function() {
  var taskData = JSON.parse(localStorage.getItem('taskData'));
  var thisHourId = $(this).parent().attr('id');
  var thisHourTask = $(this).siblings('.text').val();
  taskData[thisHourId - 9].task = thisHourTask
  localStorage.setItem('taskData', JSON.stringify(taskData));
  $('#header-p').show();
  savedTimer();
});

//this function is used to hide the task saved paragraph at the top of the page upon clicking the save button
function savedTimer(){
  var secondsLeft = 1
  setInterval( function() {
    secondsLeft--;
    if (secondsLeft === 0){
      $('#header-p').hide();
    }
  }, 1000)
};


createHourBlocks();
colorBlocks();
writeStorage();

});


