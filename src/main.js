var categorySection = document.querySelector('.category-choice');
var newActivitySection = document.querySelector('.new-activity');

var startButton = document.querySelector('#start-activity-button');

// ********** DON'T NEED THESE UNLESS USED ELSEWHERE ***********

// var studButton = document.querySelector('#stud-button');
// var medButton = document.querySelector('#med-button');
// var exButton = document.querySelector('#ex-button');

// ******^* DON'T NEED THESE UNLESS USED ELSEWHERE *^**********


var savedActivities = [];

var currentActivity = new Activity;
// var currentActivity;

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

// ********** DON'T NEED THESE UNLESS USED ELSEWHERE ***********

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

newActivitySection.addEventListener('click', function(event) {
  // function for that start activity button
  if(event.target.id === startButton.id) {
    var selectedCategory = 'Study';
    var descriptionInput = document.querySelector('#task-input').value;
    var minuteInput = document.querySelector('#minute-input').value;
    var secondInput = document.querySelector('#second-input').value;
    var currentActivity = new Activity(selectedCategory, descriptionInput, minuteInput, secondInput);
    debugger;
    console.log('test');
  }
});

