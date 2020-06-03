var currentActivity = new Activity;
var pastActivities = [];

document.addEventListener('click', function(event) {
  event.preventDefault();

  if (event.target.parentElement.classList.contains("category-choice")) {
       displayCategory(event);
  } else if (event.target.type === "submit") {
       validateInputs(event);
  } else if (event.target.classList.contains("start-time")) {
    runTimer(event);
  } else if (event.target.classList.contains("log-activity")) {
    currentActivity.markComplete(currentActivity);
    updatePastActivities();
    changeToCompletedDisplay();
  } else if (event.target.classList.contains("create-new-act")) { 
    alert("hi")
    window.location.reload(true);
  }   
});

function changeToCompletedDisplay() {
 // alert("hi");
  var timerSection = document.querySelector('.timer-wrapper');
  var completedSection = document.querySelector('.completed-activity');
  var currentPageTitle = document.querySelector('h2');
  timerSection.classList.toggle('hidden');
  completedSection.classList.toggle('hidden');
  currentPageTitle.innerText = 'Completed Activity';
}

function displayCategory(event) {
    var categorySection = document.querySelector('.category-choice');
    for (var i = 1; i < categorySection.children.length; i++) {
        var categoryChild = categorySection.children[i];
        if (categoryChild.id === event.target.id) {
            currentActivity.category = event.target.name;
            categoryChild.childNodes[1].src = `./assets/${categoryChild.name}-active.svg`;
            categoryChild.classList.add(`${categoryChild.name}-color`);
            // SPLIT SELECTED COLOR CLASS <--------------------------------------------------
            categoryChild.classList.add(`${categoryChild.name}-border`);
        } else {
            categoryChild.childNodes[1].src = `./assets/${categoryChild.name}.svg`;
            categoryChild.classList.remove(`${categoryChild.name}-color`);
            // SPLIT SELECTED COLLOR CLASS<--------------------------------------------------
            categoryChild.classList.remove(`${categoryChild.name}-border`);
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
    task.classList.add('error-message');
  } else {
    addErrorMessage.classList.add('hidden');
    task.classList.remove('error-message');
    currentActivity = new Activity(currentActivity.category, task.value.trim(), parseInt(minuteInput.value), parseInt(secondInput.value));
    changeDisplays();
  };
};

function changeDisplays() {
  var formSection = document.getElementById('form');
  var timerSection = document.querySelector('.timer-wrapper');
  var currentPageTitle = document.querySelector('h2');
  timerSection.classList.toggle('hidden');
  formSection.classList.toggle('hidden');
  currentPageTitle.innerText = 'Current Activity';
  updateTimerPage();
};

function updateTimerPage() {
    var timerButton = document.querySelector('.start-time');
    var userTask = document.querySelector('.user-task');
    var clockTime = document.querySelector('.time');
    // CHAKDED THE TIMER BUTTON CLASS TO AVTIVITY BORDER SO ONLY BORDER TOOK IN THE COLOR
    timerButton.classList.add(`${currentActivity.category}-border`);
    userTask.innerText = currentActivity.description;
    clockTime.innerText = convertToClock(currentActivity.totalSeconds);
};

function isNumber(event) {
  var charNum = String.fromCharCode(event.which);
  if(!(/[0-9]/.test(charNum))){
    event.preventDefault();
  }
}

function runTimer() {
  currentActivity.startTimer();
  var startTimerButton = document.querySelector('.start-time');
  startTimerButton.disabled = true;
  var outputTime = document.querySelector('.time');
  var refresher = setInterval(function(){
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

function displayCompletedActivity() {
  var logButton = document.querySelector('.log-activity');
  var outputTime = document.querySelector('.time');
  logButton.classList.remove('hidden');

  outputTime.innerHTML = "That was easier than CSS";
  outputTime.classList.add('shrink-text');
}


// ////////// ADDITIONS

function updatePastActivities() {
  pastActivities.push(currentActivity);
  displayPastActivities();
  //  saveToStorage(pastActivities);
  // COULD EVENTUALLY INCLUDE: saveToStorage(pastActivities)
  // MUST do markComplete first
}

// *************** RENDER FUNCTION ****************

// COULD EVENTUALLY INCLUDE: saveToStorage(pastActivities)
// MUST do markComplete first
function displayPastActivities() {
  var activityWrapper = document.querySelector(".activity-wrapper");
  //  saveToStorage(pastActivities);
  activityWrapper.innerHTML = "";
  pastActivities.forEach(function(activity) {
    activityWrapper.insertAdjacentHTML("afterbegin", `
      <article class="activity-cards" id=${activity.id}>
        <p class="${currentActivity.category}-border card-category">${activity.category}</p>
        <p class="${currentActivity.category}-border card-time">${activity.minutes} MIN : ${activity.seconds} SEC</p>
        <p class="card-description">${activity.description}</p>
      </article>
      `
     );
  });
}
