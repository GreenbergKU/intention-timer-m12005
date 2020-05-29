var categorySection = document.querySelector('.category-choice');
var newActivitySection = document.querySelector('.new-activity')

var studButton = document.querySelector('#stud-button');
var medButton = document.querySelector('#med-button');
var exButton = document.querySelector('#ex-button');

categorySection.addEventListener('click', function(event) {

  studButton.isActive = event.target.id === studButton.id;
  exButton.isActive = event.target.id === exButton.id;
  medButton.isActive = event.target.id === medButton.id;


  if (studButton.isActive === true) {
    studButton.childNodes[1].src = `./assets/${studButton.name}-active.svg`;
    studButton.classList.add('stud-color');
  } else {
    studButton.childNodes[1].src = `./assets/${studButton.name}.svg`;
    studButton.classList.remove('stud-color');
  };

  if (exButton.isActive === true) {
    exButton.childNodes[1].src = `./assets/${exButton.name}-active.svg`;
    exButton.classList.add('ex-color');
  } else {
    exButton.childNodes[1].src = `./assets/${exButton.name}.svg`;
    exButton.classList.remove('ex-color');
  };

  if (medButton.isActive === true) {
    medButton.childNodes[1].src = `./assets/${medButton.name}-active.svg`;
    medButton.classList.add('med-color');
  } else {
    medButton.childNodes[1].src = `./assets/${medButton.name}.svg`;
    medButton.classList.remove('med-color');
  };

});

newActivitySection.addEventListener('keyup', function(event) {
  // console.log('hello');
  var minutesInput = document.querySelector('#minute-input');
  var secondsInput = document.querySelector('#second-input');
  if (parseInt(minutesInput.value) != '' /* && parseInt(secondsInput.value) !== NaN*/) {
    console.log('not e');
  };
});


//


//**** studButton comments ****** */

// Changes button image if clicked
// console.log(
//     "A:", event.target.childNodes[1].src,
//     "B:", event.target.name,
//     "C:", event.target.classList,
// )
// var targetName = event.target.name;
// event.target.childNodes[1].src = `./assets/${targetName}-active.svg`


// console.log("1:", event.target.childNodes[1].src)


//**** studButton comments ****** */

// studButton.isActive = false;
// medButton.isActive = false;
// exButton.isActive = false;
// console.log(studButton.id, "1", event.target.id)
// if (event.target.id === studButton.id) {
//     studButton.isActive = true;
// } else if (event.target.id === medButton.id) {
//     medButton.isActive = true;
// } else if (event.target.id === exButton.id) {
//     exButton.isActive === true;
// }
//     console.log("2:", studButton.isActive,
//     "3:", studButton.childNodes[1].src,
//     )
