var categorySection = document.querySelector('.category-choice');
var newActivitySection = document.querySelector('.new-activity');
//var startButton = document.querySelector('#start-activity-button');

var currentActivity = new Activity;
var savedActivites = [];

categorySection.addEventListener('click', displayCategory);
// changed this annonymous function to a named function and defined it below.  
// Only calling 1 function so it had no purpose being annonymous.

function displayCategory() {

    for (var i = 1; i < categorySection.children.length; i++) {
        var categoryChild = categorySection.children[i];
        if (categoryChild.id === event.target.id) {

            currentActivity.category = event.target.name;

            categoryChild.isActive = true;
            categoryChild.childNodes[1].src = `./assets/${categoryChild.name}-active.svg`;
            categoryChild.classList.add(`${categoryChild.name}-color`);
        } else {
            categoryChild.isActive = false;
            categoryChild.childNodes[1].src = `./assets/${categoryChild.name}.svg`;
            categoryChild.classList.remove(`${categoryChild.name}-color`);
        };
    };
}

var form = document.getElementById('form');
// form needs to be global but the rest do not

var task = document.getElementById('task-input');
var minuteInput = document.getElementById('minute-input');
var secondInput = document.getElementById('second-input');
//var formInputs = document.getElementsByTagName('input')

form.addEventListener('submit',function(event) {
  event.preventDefault();
  inputValidation();
});
// this could be a named function as well, 
// add event.preventDefault() to the functions that need it below...

function inputValidation() {
  var buttonValue = currentActivity.category;
  var taskValue = task.value.trim();
  var minuteValue = minuteInput.value.trim();
  var secondValue = secondInput.value.trim();
// I don't think we need these variables
  if(taskValue === "" || minuteValue === "" || secondValue === "") {
    errorMessage(task, '<img class="warning" src="assets/warning.svg"> Please Fill In All Fields To Continue!');
  } else {
    currentActivity = new Activity(buttonValue, task.value, minuteInput.value, secondInput.value);
    success(task);
  };
};

function changeDisplays() {
  var timerSection = document.querySelector('.timer-wrapper');
  var formSection = document.querySelector('.form');

  timerSection.classList.toggle('hidden');
  formSection.classList.toggle('hidden');
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
  // TERNARY OPPORTUNITY 
  // if (conditonal...) {do this...} else {to that...} 
  // ternary = (conditional...) ? (do this...) : (do that...)

  }
};

function changeDisplays() {
  var timerSection = document.querySelector('.timer-wrapper');
  var formSection = document.querySelector('.form');
// formSection already has a querySelector, and it's global (see 'form' above)
  timerSection.classList.toggle('hidden');
  formSection.classList.toggle('hidden');
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
function errorMessage (input, message){
  var formError = input.parentElement;
  var addError = form.querySelector('small');

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
