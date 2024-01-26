// Assign elements to variables
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
// Global error flag
let isError = false;

function cleanInputString(str) {
    const regex = /[+-\s]/g;
    return str.replace(regex, '');
  }
  
  function isInvalidInput(str) {
    const regex = /\d+e\d+/i;
    return str.match(regex);
  }

  function addEntry() {
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
    const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input
      type="number"
      min="0"
      id="${entryDropdown.value}-${entryNumber}-calories"
      placeholder="Calories"
    />`;
    targetInputContainer.insertAdjacentHTML("beforeend",HTMLString);
  }
    function calculateCalories(e) {
        e.preventDefault();
        isError = false;

      // Call Inputs for various elements
      // for breakfast
        const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
        const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
      // for luch
        const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
        const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
      // for dinner
        const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
        const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
      // for snack
        const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
        const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
      // for exercise
        const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');
        const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
        
      // Declare a budgetCalories variable and pass an array containing budgetNumberInput
        const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
        
      // Check the truthiness of the global error flag
        if (isError) {
          // End the function execution
          return calculateCalories();
        }
      // Declare a consumedCalories variable and assign it the sum
        const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
        const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;

        const surplusOrDeficit = remainingCalories >= 0 ? 'Surplus' : 'Deficit';
      // Assign an empty template literal to the innerHTML property
      output.innerHTML = `
        <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
        <hr>
        <p>${budgetCalories} Calories Budgeted</p>
        <p>${consumedCalories} Calories Consumed</p>
        <p>${exerciseCalories} Calories Burned</p>
    `;
    output.classList.remove('hide');
      }
  function getCaloriesFromInputs(list) {
    let calories = 0;
    
    for (let i = 0; i < list.length; i++) {
      const currVal =  cleanInputString(list[i].value);
      const invalidInputMatch = isInvalidInput(currVal);

      if (invalidInputMatch){
        alert(`Invalid Input: ${invalidInputMatch[0]}`);
        isError = true;
        return null;
      }
      calories += Number(currVal); 
    }
    return calories;
   
  }

  function clearForm(){
    const inputContainers = Array.from(document.querySelectorAll('.input-container'));
    for (let i = 0; i< inputContainers.length; i++) {
      inputContainers[i].innerHTML = '';
  
    }
    budgetNumberInput.value ="";
    output.innerText = "";
    output.classList.add('hide');
    clearButton.addEventListener("click", clearForm)
  }

  addEntryButton.addEventListener("click", addEntry);
  calorieCounter.addEventListener("submit", calculateCalories());

