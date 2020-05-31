var categorySection = document.querySelector('.category-choice');
var newActivitySection = document.querySelector('.new-activity');


var startButton = document.querySelector('#start-activity-button');

var currentActivity = new Activity;
var savedActivites = [];

categorySection.addEventListener('click', function(event) {

    for (var i = 1; i < categorySection.children.length; i++) {
        var categoryChild = categorySection.children[i];
        if (categoryChild.id === event.target.id) {
            categoryChild.isActive = true;

            currentActivity.category = event.target.name;

            categoryChild.childNodes[1].src = `./assets/${categoryChild.name}-active.svg`;
            categoryChild.classList.add(`${categoryChild.name}-color`);
        } else {
            categoryChild.isActive = false;
            categoryChild.childNodes[1].src = `./assets/${categoryChild.name}.svg`;
            categoryChild.classList.remove(`${categoryChild.name}-color`);
        };
  }
});

var form = document.getElementById('form');
var task = document.getElementById('task-input');
var minuteInput = document.getElementById('minute-input');
var secondInput = document.getElementById('second-input');

form.addEventListener('submit',function(event) {
  event.preventDefault();
  inputValidation();
});

function inputValidation() {
  var buttonValue = currentActivity.category;
  var taskValue = task.value.trim();
  var minuteValue = minuteInput.value.trim();
  var secondValue = secondInput.value.trim();

  if(taskValue === "" || minuteValue === "" || secondValue === "" || buttonValue === undefined) {
    errorMessage(task, '<img class="warning" src="assets/warning.svg"> Please Fill In All Fields To Continue!');
  } else {
    currentActivity = new Activity(buttonValue, task.value, parseInt(minuteInput.value), parseInt(secondInput.value));
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
