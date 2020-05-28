var categorySection = document.querySelector('.category-choice');

var studButton = document.querySelector('#stud-button');
var medButton = document.querySelector('#med-button');
var exButton = document.querySelector('#ex-button');

categorySection.addEventListener('click', function(event) {

  studButton.isActive = event.target.id === studButton.id;
  exButton.isActive = event.target.id === exButton.id;
  medButton.isActive = event.target.id === medButton.id;


  if (studButton.isActive === true) {
    studButton.childNodes[1].src = `./assets/${studButton.name}-active.svg`;
  } else {
    studButton.childNodes[1].src = `./assets/${studButton.name}.svg`;
  }

  if (exButton.isActive === true) {
    exButton.childNodes[1].src = `./assets/${exButton.name}-active.svg`;
  } else {
    exButton.childNodes[1].src = `./assets/${exButton.name}.svg`;
  }

  if (medButton.isActive === true) {
    medButton.childNodes[1].src = `./assets/${medButton.name}-active.svg`;
  } else {
    medButton.childNodes[1].src = `./assets/${medButton.name}.svg`;
  }

  // var targetName = event.target.name;
  // studButton.childNodes[1].src = `./assets/${targetName}-active.svg`
})


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
