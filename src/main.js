var currentActivity = new Activity;
var pastActivities = [];

if (pastActivities !== null) {
  window.onload = function loadStorage() {
    retrieveFromStorage();
    revive(pastActivities);
  };
};

document.addEventListener('click', function delegate(event) {
  event.preventDefault();
  if (event.target.parentElement.classList.contains('category-choice')) {
    displayCategory(event);
  } else if (event.target.type === 'submit') {
    if (validateInputs()) {
      updateTimerPage();
      changeDisplay('Current Activity');
    };
  } else if (event.target.classList.contains('start-time')) {
    runTimer(event);
  } else if (event.target.classList.contains('log-activity')) {
    updatePastActivities();
    changeDisplay('Completed Activity');
  } else if (event.target.classList.contains('create-new-act')) {
    changeDisplay('New Activity');
  };
});

function changeDisplay(titleOfPage) {
  var completedSection = document.querySelector('.completed-activity');
  var currentPageTitle = document.querySelector('h2');
  var formSection = document.getElementById('form');
  var timerSection = document.querySelector('.timer-wrapper');
  currentPageTitle.innerText = titleOfPage;
  completedSection.classList.add('hidden');
  formSection.classList.add('hidden');
  timerSection.classList.add('hidden');
  if (titleOfPage === 'New Activity') {
    window.location.reload(true);
  } else if (titleOfPage === 'Current Activity') {
    timerSection.classList.remove('hidden');
  } else if (titleOfPage === 'Completed Activity') {
    completedSection.classList.remove('hidden');
  };
};

function displayCategory(event) {
  var categorySection = document.querySelector('.category-choice');
  for (var i = 1; i < categorySection.children.length; i++) {
    var categoryChild = categorySection.children[i];
    if (categoryChild.id === event.target.id) {
      currentActivity.category = event.target.name;
      categoryChild.childNodes[1].src = `./assets/${categoryChild.name}-active.svg`;
      categoryChild.classList.add(`${categoryChild.name}-color`);
      categoryChild.classList.add(`${categoryChild.name}-border`);
    } else {
      categoryChild.childNodes[1].src = `./assets/${categoryChild.name}.svg`;
      categoryChild.classList.remove(`${categoryChild.name}-color`);
      categoryChild.classList.remove(`${categoryChild.name}-border`);
    };
  };
};

function updateTimerPage() {
  var outputTime = document.querySelector('.time');  
  var timerButton = document.querySelector('.start-time');
  var userTask = document.querySelector('.user-task');
  timerButton.classList.add(`${currentActivity.category}-border`);
  outputTime.innerText = convertToClock(currentActivity.totalSeconds);
  userTask.innerText = currentActivity.description;

};

function displayCompletedActivity() {
  var logButton = document.querySelector('.log-activity');
  var outputTime = document.querySelector('.time');
  var timerButton = document.querySelector('.start-time');
  logButton.classList.remove('hidden');
  outputTime.classList.add('shrink-text');
  outputTime.innerHTML = 'That was easier than CSS';
  timerButton.innerHTML = 'COMPLETED!';
};

function displayPastActivities() {
  var activityWrapper = document.querySelector('.activity-wrapper');
  activityWrapper.innerHTML = '';
  pastActivities.forEach(function(activity) {
    activityWrapper.insertAdjacentHTML('afterbegin', `
      <article class="activity-cards" id=${activity.id}>
        <p class="${activity.category}-border card-category">${activity.category}</p>
        <p class="${activity.category}-border card-time">${activity.minutes} MIN : ${activity.seconds} SEC</p>
        <p class="card-description">${activity.description}</p>
      </article>
      `
    );
  });
};

function validateInputs() {
  var addErrorMessage = document.querySelector('small');
  var minuteInput = document.getElementById('minute-return');
  var secondInput = document.getElementById('second-return');
  var task = document.getElementById('task-return');
  if (currentActivity.category === undefined || task.value.trim() === '' || minuteInput.value === '' || secondInput.value === '') {
    addErrorMessage.classList.remove('hidden');
    task.classList.add('error-message');
    return false;
  } else {
    addErrorMessage.classList.add('hidden');
    task.classList.remove('error-message');
    currentActivity = new Activity(currentActivity.category, task.value.trim(), parseInt(minuteInput.value), parseInt(secondInput.value));
    return true;
  };
};

function updatePastActivities() {
  currentActivity.markComplete();
  pastActivities.push(currentActivity);
  currentActivity.saveToStorage(pastActivities);
  displayPastActivities();
};

function retrieveFromStorage() {
  var retrievedActivities = localStorage.getItem('pastActivities');
  pastActivities = JSON.parse(retrievedActivities);
};

function revive(array) {
  var savedActivity;
  pastActivities = [];
  array.forEach(function(activity) {
    savedActivity = new Activity(activity.category, activity.description, activity.minutes, activity.seconds, activity.id);
    pastActivities.push(savedActivity);
  });
  displayPastActivities();
};

function runTimer() {
  var startTimerButton = document.querySelector('.start-time');
  var outputTime = document.querySelector('.time');
  currentActivity.startTimer();
  startTimerButton.disabled = true;
  var refresher = setInterval(function() {
    if (currentActivity.secondsLeft() < 0) {
      clearInterval(refresher);
      displayCompletedActivity();
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

function isNumber(event) {
  var charNum = String.fromCharCode(event.which);
  if (!(/[0-9]/.test(charNum))) {
    event.preventDefault();
  };
};
