var categorySection = document.querySelector('.category-choice');
var newActivitySection = document.querySelector('.new-activity');

var startButton = document.querySelector('#start-activity-button');

var currentActivity;
var savedActivites = [];

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
  }
});   


// newActivitySection.addEventListener('click', function(event) {
//   // function for that start activity button
//   if(event.target.id === startButton.id) {
//     var selectedCategory = 'Study';
//     var descriptionInput = document.querySelector('#task-input').value;
//     var minuteInput = document.querySelector('#minute-input').value;
//     var secondInput = document.querySelector('#second-input').value;
//     var currentActivity = new Activity(selectedCategory, descriptionInput, minuteInput, secondInput);
//     console.log(event.target);
//   }
// });


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

