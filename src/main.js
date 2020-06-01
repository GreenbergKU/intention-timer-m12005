var currentActivity = new Activity;
var savedActivites = [];

document.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.parentElement.classList.contains("category-choice")) {
         displayCategory(event);
    } else if (event.target.type === "submit") {
         validateInputs();
    } else if (event.target.classList.contains("start-time")) {
        runTimer(event);
    };
});

function displayCategory(event) {
    var categorySection = document.querySelector('.category-choice');

    for (var i = 1; i < categorySection.children.length; i++) {
        var categoryChild = categorySection.children[i];
        if (categoryChild.id === event.target.id) {
            currentActivity.category = event.target.name;
            categoryChild.childNodes[1].src = `./assets/${categoryChild.name}-active.svg`;
            categoryChild.classList.add(`${categoryChild.name}-color`);
        } else {
            categoryChild.childNodes[1].src = `./assets/${categoryChild.name}.svg`;
            categoryChild.classList.remove(`${categoryChild.name}-color`);
        };
    };
}


function validateInputs() {
  var task = document.getElementById('task-return');
  var minuteInput = document.getElementById('minute-return');
  var secondInput = document.getElementById('second-return');
  var addErrorMessage = document.querySelector('small');

  if (currentActivity.category === undefined || task.value.trim() === "" || minuteInput.value === "" || secondInput.value === "") {
    addErrorMessage.classList.remove('hidden');
  } else {
    addErrorMessage.classList.add('hidden');
    currentActivity = new Activity(currentActivity.category, task.value.trim(), parseInt(minuteInput.value), parseInt(secondInput.value));
    changeDisplays();
  };
};

function changeDisplays() {
  var formSection = document.getElementById('form');
  var timerSection = document.querySelector('.timer-wrapper');
  var currentPageTitle = document.querySelector('h2');
  timerSection.classList.toggle('hidden');
  formSection.classList.toggle('hidden'); // CAN BE CHANGED
  currentPageTitle.innerText = 'Current Activity';
  updateTimerPage();
};

function updateTimerPage() {
    var timerButton = document.querySelector('.start-time');
    var userTask = document.querySelector('.user-task');
    var clockTime = document.querySelector('.time');
    timerButton.classList.add(`${currentActivity.category}-color`);
    userTask.innerText = `${currentActivity.description}`;
    clockTime.innerText = `${convertToClock(currentActivity.totalSeconds)}`;
};

function isNumber(event) {
  var charNum = String.fromCharCode(event.which);
  if(!(/[0-9]/.test(charNum))){
    event.preventDefault();
  }
}

function runTimer() {
  currentActivity.startTimer();
  var outputTime = document.querySelector('.time');
  var refresher = setInterval(function(){
    if (currentActivity.secondsLeft() < 0) {
      clearInterval(refresher);
      alert('TIMES UP');
      outputTime.innerHTML = "00:00";
    } else {
      outputTime.innerHTML = convertToClock(currentActivity.secondsLeft());
    };
  }, 990);
};

function convertToClock(timeInSeconds) {
  var minutes = Math.floor(timeInSeconds / 60);
  var seconds = timeInSeconds % 60;
  if (seconds < 10 && minutes < 10) {
    return `0${minutes}:0${seconds}`;
  } else if (seconds < 10 && minutes >= 10) {
    return `${minutes}:0${seconds}`;
  } else if (seconds >= 10 && minutes < 10) {
    return `0${minutes}:${seconds}`;
  };
  return `${minutes}:${seconds}`;
};
