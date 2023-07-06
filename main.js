//body
  //typechartcontainer
    //typeChartDef
      //18 columns
    //typeChartAtk
      //18 rows
  //result text of comparison

//type dictionary for possible pokemon types
const typeDict = {
  0: "normal",
  1: "fire",
  2: "water",
  3: "grass",
  4: "electric",
  5: "ice",
  6: "fighting",
  7: "poison",
  8: "ground",
  9: "flying",
  10: "psychic",
  11: "bug",
  12: "rock",
  13: "ghost",
  14: "dragon",
  15: "dark",
  16: "steel",
  17: "fairy"
}

//object to store click status for the one attack type and the array of defense types
const clickStatus = {};

//declare attack type and defense type variables
const attackType = null;
const defenseTypes = [];

//tried to get a dropdown menu going, but i realized too late that I'm getting a CORS error since the fetch request to pokeAPI is coming from leetcode lmaoooo
const genDropdownChoices = async () => {
  const genSelect = document.getElementById("genSelect");
  genSelect.addEventListener("change", handleGenChange);

  try {
    const generations = await fetchGenerations();

    generations.forEach(generation => {
      const option = document.createElement("option");
      option.value = generation.url.split("/")[6];
      option.innerText = generation.name;
      genSelect.appendChild(option);
    });
  } catch (err) {
    console.log(err);
  }
}
//tied to the dropdown menu, gets all generations to fill the menu
const fetchGenerations = async () => {
  try {
    const response = await fetch("https://pokeapi.co/aip.v2.generation/");
    const data = await response.json();
    return data.results;
  } catch (err) {
    throw new Error("Failed to fetch generation data.");
  }
}
//was meant to handle when someone clicked on the gen dropdown menu
const handleGenChange = () => {
  const selectElement = document.getElementById("genSelect");
  const selectedGen = selectElement.value;

    //async function to handle the calculation of type effectiveness
  const calcEffective = async (atkType, defTypes, selectedGen) => {
    //result number representing the modifier
    let mod = 1;

    //fetch type data for atkType
    const atkRes = await fetch(`https://pokeapi.co/api/v2/type/${atkType}`);
    const atkData = await atkRes.json();

    //more than one possible, loop through defTypes param
    for(let defType of defTypes) {
      //fetch type data for defType
      const defRes = await fetch(`https://pokeapi.co/api/v2/type/${defType}`);
      const defData = await defRes.json();

      //check if super-effective, not-effective, or no effect
      const isDouble = atkData.damage_relations.double_damage_to.some((type) => type.name === defType);
      const isHalf = atkData.damage_relations.half_damage_to.some((type) => type.name === defType);
      const noEffect = atkData.damage_relations.no_damage_to.some((type) => type.name === defType);

      //mutate modifier based on results of previous checks
      if(isDouble) mod *= 2;
      else if (isHalf) mod *= 0.5;
      else if (noEffect) {
        mod *= 0;
        break;
      }
    }
    return mod.toFixed(2);
  }
}

//meant to handle clicking on attack types on left of chart
  //interacts with the eventListeners that were created on the cells, but not functioning
const handleColumnClick = (type) => {
  if(attackType === type) {
    attackType = null;
  } else if (!attackType) {
    attackType = type;
  }
}

//same as column click, but for the defense types
const handleRowClick = (type) => {
  if(defenseTypes.length === 2) {
    const index = defenseTypes.indexOf(type);
    if(index > -1) {
      defenseTypes.splice(index, 1);
    }
  } else {
    const index = defenseTypes.indexOf(type);
    if(index === -1) {
      defenseTypes.push(type);
    }
  }
}

//body replacement of leetcode so that we can append our own HTML
const newBody = document.createElement('body');
document.body.parentNode.replaceChild(newBody, document.body);
newBody.style.overflow = "hidden";
newBody.style.margin = 0;

//placed title in a div to separate from body container
const title = document.createElement('div');
const h1 = document.createElement('h1');
h1.innerText = 'Pokemon Type Chart';
title.appendChild(h1);
newBody.appendChild(title);

//dropdown menu added using JS DOM methods
const genSelect = document.createElement('select');
genSelect.setAttribute("id", "genSelect");
genSelect.innerText = 
newBody.appendChild(genSelect);

//create table
const chart = document.createElement('chart');
chart.style.display = 'grid';
chart.style.height = '700px';
chart.style.width = '700px';
chart.style.marginLeft = "50px";
chart.style.gridTemplateColumns = 'repeat(19, 50px)';
chart.style.gridTemplateRows = 'repeat(19, 50px)';

//fill in table cells by row and column
for(let row = 0; row < 19; row++) {
  for(let col = 0; col < 19; col++) {
    //include every cell except the upper left
    //give cells the same border, remove border from upper left cell
      const cell = document.createElement('td');
      cell.style.border = '1px solid rgba(0, 0, 0, 0.187)';
      chart.appendChild(cell);
      if(row === 0 && col === 0) {
        cell.style.border = 'none';
      }
      if(row === 0 || col === 0) {
        cell.style.padding = '3px';
      }
      //if cell is in column 0, it is one of the clickable buttons
        //got a bit lost in the logic, I believe I removed what made sense for the defense row eventListener
          //clicking works, but there isn't a limit on defense. only normal can be clicked on attack row
      if (col === 0 && row !== 0) {
        const atkType = typeDict[row - 1];
        cell.innerText = atkType;
        cell.addEventListener('click', function() {
          const isAtkClicked = Object.values(clickStatus).some((status, index) => status && index > 0
          );
          if(isAtkClicked) {
            clickStatus[atkType] = !clickStatus[atkType];
            cell.style.backgroundColor = clickStatus[atkType] ? '2px solid purple' : '1px solid rgba(0, 0, 0, 0.187)';
          }

          clickStatus[atkType] = !clickStatus[atkType];
          cell.style.border = clickStatus[atkType] ? '2px solid purple' : '1px solid rgba(0, 0, 0, 0.187)';
          

          const defTypes = [];
          for(let i = 1; i < chart.rows[0].cells.length; i++) {
            // const defType = chart.rows[0].cells[i].innerText;
            const defType = typeDict[i - 1];

            if(clickStatus[defType] && i > 0) {
              return;
            }
            defTypes.push(defType);
          }
          const effectiveness = calcEffective(atkType, defTypes);
          
          if(effectiveness === 1) {

          } else {
            cell.textContent = effectiveness;
            if(effectiveness > 1) {
              cell.style.backgroundColor = 'green';
              cell.style.color = 'white';
            } else if (effectiveness > 0) {
              cell.style.backgroundColor = 'red';
              cell.style.color = 'white';
            } else if (effectiveness === 0) {
              cell.style.backgroundColor
            }
          }
          console.log(`Attack Type: ${atkType}`);
          console.log(`Defense Types: ${defTypes.join(", ")}`);
          console.log(`Effectiveness: ${effectiveness}`);
        });
      }

      if(row === 0 && col !== 0) {
        const type = typeDict[col - 1];
        cell.innerText = type;

        clickStatus[type] = false;

        cell.addEventListener('click', function() {
          clickStatus[type] = !clickStatus[type];
          cell.style.border = clickStatus[type] ? '2px solid purple' : '1px solid rgba(0, 0, 0, 0.187)';
        });
      }
    }
  }
genDropdownChoices();
newBody.appendChild(chart);

// const typeChartContainer = document.createElement('div');
// typeChartContainer.setAttribute("id", "typeChartContainer");
// typeChartContainer.style.display = "grid";
// typeChartContainer.style.border = "1px solid black";
// typeChartContainer.style.gridTemplateRows = "repeat(auto-fit, minmax(40px, 1fr)";
// newBody.appendChild(typeChartContainer);

// const typeChartDef = document.createElement('div');
// typeChartDef.setAttribute("id", "typeChartDef");
// typeChartDef.style.border = "1px solid green";
// typeChartDef.style.gridTemplateColumns = "repeat(18, 1fr)";

// const typeChartAtk = document.createElement('div');
// typeChartAtk.setAttribute("id", "typeChartAtk");
// typeChartAtk.style.border = "1px solid red";
// typeChartAtk.style.gridColumn = 1 / -2;
// typeChartAtk.style.gridRow = 1;
// typeChartContainer.appendChild(typeChartAtk);


// for (let i = 1; i < 19; i++) {
//   const newDiv = document.createElement('div');
//   newDiv.setAttribute("class", "def-type");
//   newDiv.setAttribute("id", `${typeDict[i]}`)
//   newDiv.style.borderRight = "1px solid green";
//   typeChartDef.appendChild(newDiv)
// }
// typeChartContainer.appendChild(typeChartDef);

// for (let i = 1; i < 19; i++) {
//   const newDiv = document.createElement('div');
//   newDiv.setAttribute("class", "def-type");
//   newDiv.setAttribute("id", `${typeDict[i]}`)
//   newDiv.style.display = "grid"
//   typeChartDef.appendChild(newDiv);
// }
// const base = document.querySelector('#base_content');
// const baseParent = base.parentNode;
// base.remove();

// const defendersArr = ['Normal'
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