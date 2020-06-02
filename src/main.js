
var currentActivity = new Activity;
var pastActivities = [];

document.addEventListener('click', function(event) {
  event.preventDefault();

  // event.target = document.getElementByClassName("log-activity");
  if (event.target.parentElement.classList.contains("category-choice")) {
       displayCategory(event);
  } else if (event.target.type === "submit") {
       validateInputs(event);
  } else if (event.target.classList.contains("start-time")) {
      runTimer(event);
  }

//// ADDITION 
  else if (event.target.classList.contains ("log-activity")) {
     console.log("PRE-currentActivity before markComplete() = ", currentActivity)
     //markComplete needs to be looked at
     currentActivity.markComplete(currentActivity);
     updatePastActivities();
  }
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


//
// THIS IS THE UPDATED VALIDATION I CREATED THE ABOVE CAN BE REMOVED
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
  }
}

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
    clockTime.innerText = `${currentActivity.startTimer()}`;
    // clockTime.innerText = convertToClock();
};


function isNumber(event) {
  var charNum = String.fromCharCode(event.which);
  if(!(/[0-9]/.test(charNum))){
    event.preventDefault();
  }
}

function runTimer() {
  var startTimerButton = document.querySelector('.start-time');
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
        <span class="card-text">
          <p class="card-category">${activity.category}</p>
          <p class="card-time">${activity.minutes} MIN : ${activity.seconds} SEC</p>
          <br>
          <p class="card-description">${activity.description}</p>
        </span>
      </article>
      `
     );
  });
}
