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

//body
  //typechartcontainer
    //typeChartDef
      //18 columns
    //typeChartAtk
      //18 rows
  //result text of comparison

const typeDict = {
  1: "normal",
  2: "fire",
  3: "water",
  4: "grass",
  5: "electric",
  6: "ice",
  7: "fighting",
  8: "poison",
  9: "ground",
  10: "flying",
  11: "psychic",
  12: "bug",
  13: "rock",
  14: "ghost",
  15: "dragon",
  16: "dark",
  17: "steel",
  18: "fairy"
}

const newBody = document.createElement('body');
newBody.innerHTML = '<h1>Snorlax</h1>';
document.body.parentNode.replaceChild(newBody, document.body);

const typeChartContainer = document.createElement('div');
typeChartContainer.setAttribute("id", "typeChartContainer")
newBody.appendChild(typeChartContainer);

const typeChartDef = document.get

for (let i = 1; i < 19; i++) {
  const newDiv = document.createElement('div');
  newDiv.setAttribute("class", "type");
  newDiv.setAttribute("id", `${typeDict[i]}`)
}
// const base = document.querySelector('#base_content');
// const baseParent = base.parentNode;
// base.remove();

const defendersArr = ['Normal'
//
// let body = document.querySelector('#body');
// let bodyParent = body.parent();
// body.remove();
// document.addEventListener('DOMContentLoaded', function () {
//   document.getElementById('snorlax').addEventListener('click', function () {
//     // Window.location.assign('http://google.com'); 
//     let contents = bigWindow.querySelector('#body');
//     console.log(contents)
//     console.log('Clicked Da Snorlax!', contents);
//     // let contentsParent = contents.parent();
//     contents.remove();
//   }, false);
// }, false);

//TypeChart with clickable types that send a GET request to pokeapi based on the type clicked
  //separate these buttons into a row (for defense type) and a column (for attack type)
  //within the main chart, coloring for the four effectiveness types (super effective, normal, not effective, no effect)

  //There are 18 types

    //ATTACK COLUMN can select ONE type at a time
      //Selecting a type deselects the previous type for attack
    
    //DEFENSE ROW can select up to TWO at a time
      //Selecting beyond two just gives a warning to deselect if you want to change

  //below chart, a number modifier that updates effectiveness and shows which types are being compared