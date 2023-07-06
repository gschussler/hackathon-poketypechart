// const fetch = require('fetch');

// const lookupElement = function (selectedElement) {
//   fetch(`https://pokeapi.co/api/v2/type/"${selectedElement}"`)
//     .then((ElementObj) => {
//       const noDam = [];
//       ElementObj.damage_relations.no_damage_to.forEach((type) => {
//         noDam.push(type);
//       });
      
//       return {
//         noDamto: noDam,
//         quarterDam: ,
//         halfDam: ,
//         normDam: ,
//         twiceDam: ,
//         quadDam: ,
//       }
//     })
// }

console.log('this is a popup!');
//

document.addEventListener('DOMContentLoaded', function () {
  const bigWindow = document;
  document.getElementById('snorlax').addEventListener('click', function () {
    // Window.location.assign('http://google.com'); 
    let contents = bigWindow.querySelector('#base_content');
    console.log(contents)
    console.log('Clicked Da Snorlax!', contents);
    let contentsParent = contents.parent();
    contents.remove();
  }, false);
}, false);

//TypeChart with clickable types that send a GET request to pokeapi based on the type clicked
  //separate these buttons into a row (for defense type) and a column (for attack type)
  //within the main chart, coloring for the four effectiveness types (super effective, normal, not effective, no effect)

  //There are 18 types

    //ATTACK COLUMN can select ONE type at a time
      //Selecting a type deselects the previous type for attack
    
    //DEFENSE ROW can select up to TWO at a time
      //Selecting beyond two just gives a warning to deselect if you want to change

  //below chart, a number modifier that updates effectiveness and shows which types are being compared
    