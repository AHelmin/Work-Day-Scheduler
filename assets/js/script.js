//TODO
//setInterval to display time and to check time against hour blocks for css change--MAYBE DONT NEED THIS
//change post 12 pm times to am/pm format--DONE
//time diff function to be able to determine where the blocks lie relative to current time--DONE
//label each hour block with 24h time--DONE
//add event listener in jquery for the save hour block input text to local storage--DONE
//ask about adding dayjs advance formats

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {

  const now = dayjs();
  // console.log(now);
  const nowHour = now.format('HH');
  // console.log(nowHour);
  const hourBlockCont = $('#hour-block-container');
  // console.log(hourBlockCont)
  const headerDay = $('#currentDay');
  // console.log(headerDay);
  $('#header-p').hide()

  
  
headerDay.text(now.format('dddd, MMMM D'))

function createHourBlocks() {
  for (var i = 9; i < 18; i++) {
    var blockId = i;
    if (i < 12) {
    var hourBlockText = i + 'AM';
   //why doesn't let or const scope to the rest of the function, while var will????
  } else if ( i === 12) {
    var hourBlockText = i + 'PM'
  } else {
    var hourBlockText = (i - 12) + 'PM'
  }
    hourBlockCont.append(`<div id="${blockId}" class="row time-block past">
    <div class="col-2 col-md-1 hour text-center py-3">${hourBlockText}</div>
    <textarea id="text" class="col-8 col-md-10 description" rows="3"> </textarea>
    <button id ="saveBtn" class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
  </div>`)
  }};

function colorBlocks() {
  for (var i = 0; i < hourBlockCont.children().length; i++){
    // console.log(hourBlockCont.children().length)
    var child = hourBlockCont.children().eq(i);
    // console.log(child.text());
    var childHour = parseInt(child.attr('id'))
    // console.log(childHour)
    var difference = parseInt(nowHour) - childHour;
    // console.log(difference);
    if (difference > 0) {
      child.removeClass('present', 'future').addClass('past');
    } else if (difference ===0) {
      child.removeClass('past', 'future').addClass('present');
    } else {
      child.removeClass('past', 'present').addClass('future');
    }
  }
};

function writeStorage() {
  var taskData = JSON.parse(localStorage.getItem('taskData') || '{}');
  // console.log(taskData)
  var taskDataLength = Object.keys(taskData).length
  console.log(taskDataLength)
  
  for (var i = 0; i < taskDataLength; i++) {
    //add 9 to correct for the hour ids starting at 9
    var idCorrectValue = i + 9
    var selector = "#" + idCorrectValue 
    console.log(selector)
    console.log(taskData[idCorrectValue].task)
    $(selector).children().eq(1).text(taskData[idCorrectValue].task)
  }
};

hourBlockCont.on('click', '.saveBtn', function() {
  console.log('ok');
  var taskData = JSON.parse(localStorage.getItem('taskData') || '{}');
  var thisHourId = $(this).parent().attr('id');
  var thisHourTask = $(this).siblings('#text').val();
  taskData[thisHourId] = {
    task: thisHourTask
  }
  localStorage.setItem('taskData', JSON.stringify(taskData));
  $('#header-p').show();
  savedTimer();
});

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


