// window.addEventListener('load', randomizeCover); //onload
window.addEventListener('click', filterClick); //global click
// savedCoversSection.addEventListener('dblclick', deleteCover); 


// function clickHandler(event) {
//   if (event.target.classList.contains('random-cover-button')) {
//     randomizeCover();
//   } else if (event.target.classList.contains('make-new-button')) {
//     showFormPage();
//   } else if (event.target.classList.contains('view-saved-button')) {
//     showSavedCoversPage();
//   } else if (event.target.classList.contains('home-button')) {
//     showHomePage();
//   } else if (event.target.classList.contains('create-new-book-button')) {
//     createCover(event);
//   } else if (event.target.classList.contains('save-cover-button')) {
//     saveCover();
//   }
// }

function filterClick(event) {
    if (event.target.classList.contains("category-choice")) {
        displayCategory(event)
    } else if (event.target.classList.contains("form")) {
        validateInputs(event)
    };

    //if (categoryButtons) {displayCategory(event)};
    //if (formStartButton) {validateInputs(event)}
}

var newActivitySection = document.querySelector('.new-activity');
var formSection = document.getElementById('form');


var currentActivity = new Activity;
var savedActivites = [];

//categorySection.addEventListener('click', displayCategory);
// make 1 global 'click' listener


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

//formSection.addEventListener('submit', validateInputs);

function validateInputs(event) {
    event.preventDefault();
    var task = document.getElementById('task-input');
    var minuteInput = document.getElementById('minute-input');
    var secondInput = document.getElementById('second-input');
    //?? sparseInt() inside conditional ???
    if (currentActivity.category === undefined || task.value.trim() === "" || sparseInt(minuteInput.value === "") || sparseInt(secondInput.value === "")) {
      displayErrorMessage(task, '<img class="warning" src="assets/warning.svg"> Please Fill In All Fields To Continue!');
    } else {
      currentActivity = new Activity(currentActivity.category, task.value.trim(), sparseInt(minuteInput.value), sparseInt(secondInput.value));
      updateForm(task);    
    };
}
      // TERNARY OPPORTUNITY 
    // if (conditonal...) {do this...} else {to that...} 
    // ternary = (conditional...) ? (do this...) : (do that...)
  


function changeDisplays() {
  var timerSection = document.querySelector('.timer-wrapper');
  var formSection = document.querySelector('.form'); // CAN BE CHANGED TO JUST FORM

  timerSection.classList.toggle('hidden');
  formSection.classList.toggle('hidden'); // CAN BE CHANGED TO JUST FORM
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
function displayErrorMessage(input, message){
  var formError = input.parentElement;
  var addError = form.querySelector('small');

  addError.innerHTML = message;
  formError.className = 'form error-message';
}

function updateForm(input) {
  var formError = input.parentElement;
  var addError = formSection.querySelector('small');

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
