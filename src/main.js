var categorySection = document.querySelector('.category-choice');
var newActivitySection = document.querySelector('.new-activity');

var startButton = document.querySelector('#start-activity-button');

var savedActivities = [];

var currentActivity = new Activity;

categorySection.addEventListener('click', function(event) {

    for (var i = 1; i < categorySection.children.length; i++) {
        var categoryChild = categorySection.children[i];
        if (categoryChild.id === event.target.id) {
            categoryChild.isActive = true;
            categoryChild.childNodes[1].src = `./assets/${categoryChild.name}-active.svg`;
            categoryChild.classList.add(`${categoryChild.name}-color`);
        } else {
            categoryChild.isActive = false;
            categoryChild.childNodes[1].src = `./assets/${categoryChild.name}.svg`;
            categoryChild.classList.remove(`${categoryChild.name}-color`);
        };
                console.log(
                    "i=", i,
                    "categoryChild.isActive=", categoryChild.isActive,
                    "event.target.name=", event.target.name,
                );
}});

// categorySection.addEventListener('click', function(event) {

//   studButton.isActive = event.target.id === studButton.id;
//   exButton.isActive = event.target.id === exButton.id;
//   medButton.isActive = event.target.id === medButton.id;

//   if (studButton.isActive === true) {
//     studButton.childNodes[1].src = `./assets/${studButton.name}-active.svg`;
//     studButton.classList.add('stud-color');
//     startButton.disabled = false;
//   } else {
//     studButton.childNodes[1].src = `./assets/${studButton.name}.svg`;
//     studButton.classList.remove('stud-color');
//   };

//   if (exButton.isActive === true) {
//     exButton.childNodes[1].src = `./assets/${exButton.name}-active.svg`;
//     exButton.classList.add('ex-color');
//     startButton.disabled = false;
//   } else {
//     exButton.childNodes[1].src = `./assets/${exButton.name}.svg`;
//     exButton.classList.remove('ex-color');
//   };

//   if (medButton.isActive === true) {
//     medButton.childNodes[1].src = `./assets/${medButton.name}-active.svg`;
//     medButton.classList.add('med-color');
//     startButton.disabled = false;
//   } else {
//     medButton.childNodes[1].src = `./assets/${medButton.name}.svg`;
//     medButton.classList.remove('med-color');
//   };
// });
// *********^^* DON'T NEED THESE UNLESS USED ELSEWHERE *^^**********

var form = document.getElementById('form');
var task = document.getElementById('task-input');
var minuteInput = document.getElementById('minute-input');
var secondInput = document.getElementById('second-input');

form.addEventListener('submit',function(event) {
  event.preventDefault();

  inputValidation();
});


function inputValidation() {
  var taskValue = task.value.trim();
  var minuteValue = minuteInput.value.trim();
  var secondValue = secondInput.value.trim();

  if(taskValue === "" || minuteValue === "" || secondValue === "") {
    errorMessage(task, '<img class="warning" src="assets/warning.svg"> Please Fill In All Fields To Continue!');
  } else {
    success(task);
  }
}

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
}


function isNumber(event) {
  var charNum = String.fromCharCode(event.which);
  if(!(/[0-9]/.test(charNum))){
    event.preventDefault();
  }
}
