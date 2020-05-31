var categorySection = document.querySelector('.category-choice');
var newActivitySection = document.querySelector('.new-activity');
var formSection = document.getElementById('form');
var startTimerButton = document.querySelector('.start-time');

var currentActivity = new Activity;
var savedActivites = [];

categorySection.addEventListener('click', displayCategory);
formSection.addEventListener('submit', inputValidation)
startTimerButton.addEventListener('click', runTimer);

function displayCategory(event) {
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

function inputValidation(event) {
  event.preventDefault();
  var task = document.getElementById('task-return');
  var minuteInput = document.getElementById('minute-return');
  var secondInput = document.getElementById('second-return');
  if (currentActivity.category === undefined || task.value.trim() === "" || minuteInput.value === "" || secondInput.value === "") {
    errorMessage(task, '<img class="warning" src="assets/warning.svg"> Please Fill In All Fields To Continue!');
  } else {
    currentActivity = new Activity(currentActivity.category, task.value.trim(), parseInt(minuteInput.value), parseInt(secondInput.value));
    success(task);
  };
}

function changeDisplays() {
  var timerSection = document.querySelector('.timer-wrapper');
  timerSection.classList.toggle('hidden');
  formSection.classList.toggle('hidden'); // CAN BE CHANGED
  updateTimerPage();
};

function updateTimerPage() {
    var timerButton = document.querySelector('.start-time');
    var userTask = document.querySelector('.user-task');
    var clockTime = document.querySelector('.time');
    timerButton.classList.add(`${currentActivity.category}-color`);
    userTask.innerText = `${currentActivity.description}`;
    clockTime.innerText = `${currentActivity.startTimer()}`;
};

// function naming conventions are suppose to imply an action
// suggestions: validateForm() alertError(), resetForm(), validateNumber()
function errorMessage (input, message) {
  var formError = input.parentElement;
  var addError = formSection.querySelector('small');
  addError.innerHTML = message;
  formError.className = 'form error-message';
}

function success(input) {
  var formError = input.parentElement;
  var addError = form.querySelector('small');
  addError.innerHTML = '';
  formError.className = 'form';
  changeDisplays();
}


function isNumber(event) {
  var charNum = String.fromCharCode(event.which);
  if(!(/[0-9]/.test(charNum))){
    event.preventDefault();
  }
}

function runTimer() {
  var now = Date.now();
  var endTime = now + currentActivity.totalSeconds * 1000;
  var outputTime = document.querySelector('.time');

  startTimerButton.disabled = true;
  var countdown = setInterval(function() {
    var secondsLeft = Math.floor((endTime - Date.now()) / 1000);
    // set the innerText of the html to the below;
    outputTime.innerHTML = convertToClock(secondsLeft);
    console.log(convertToClock(secondsLeft));
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      alert('TIMES UP');
    };
  }, 990);
};

function convertToClock(secondsLeft) {
  var minutes = Math.floor(secondsLeft / 60);
  var seconds = secondsLeft % 60;
  if (seconds < 10 && minutes < 10) {
    return `0${minutes}:0${seconds}`;
  } else if (seconds < 10 && minutes >= 10) {
    return `${minutes}:0${seconds}`;
  } else if (seconds >= 10 && minutes < 10) {
    return `0${minutes}:${seconds}`;
  };
  return `${minutes}:${seconds}`;
};
