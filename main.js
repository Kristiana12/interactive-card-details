const inputs = document.querySelectorAll('.input-wrapper input');
const btnSubmit = document.getElementById('submit');

const inputName = document.getElementById('name');
const inputCardNumber = document.getElementById('card-number');
const inpuExpMonth = document.getElementById('exp-month');
const inpuExpYear = document.getElementById('exp-year');
const inpuCVC = document.getElementById('cvc');

const cardNumbersEL = document.getElementById('front__card-numbers');
const cardNameEL = document.getElementById('front__card-name');
const cardExpDateEL = document.getElementById('front__card-exp-date');
const cardCVCEL = document.getElementById('back__card-cvc');

//Display Cardholder Name
const displayCardholderName = () => {
  //replacing all numbers to empty strings
  const cardholderName = inputName.value.replace(/[0-9]/g, '');
  //Mutating the UI
  cardNameEL.textContent = cardholderName.toUpperCase().trim();
};

//Allow only numbers to be pressed on Card Numbers
const displayCardNumbers = () => {
  const cardNumbersValue = inputCardNumber.value;
  let cardnumbersCopy = cardNumbersValue.split('');

  //show Numbers UI
  cardNumbersEL.innerHTML = cardnumbersCopy.join('');
};

//Allow only numbers - Date - Month - CVC
function onlyNumberKey(evt) {
  // Only ASCII character in that range allowed
  const ASCIICode = evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
    return false;
  }
  return true;
}

//Display error when field is blank
const displayErrorMessage = (inputField) => {
  if (inputField.value === '') {
    let errorMessage = "Can't be blank";

    console.log(inputField.parentNode);
    inputField.parentNode.classList.add('error-message');
    inputField.insertAdjacentHTML('afterend', `<p>${errorMessage}</p>`);
  }
};

const maxlengthCromeSupport = (inputField, maxlength) => {
  let max = maxlength;

  if (inputField.length > maxlength) {
    return false;
  }
};

//EXP month evaluation
const expMonthValidation = () => {
  const expMonthValue = inpuExpMonth.value;
  if (1 < expMonthValue < 10) {
  }
};

//Input on focus STYLING - add border
inputs.forEach((input) => {
  //Add - Remove Class on Focus In / Out
  const parentEL = input.closest('.input-wrapper');
  input.addEventListener('focusin', () => {
    parentEL.classList.add('input-wrapper-border');
  });
  input.addEventListener('focusout', () => {
    parentEL.classList.remove('input-wrapper-border');
  });
});

inputName.addEventListener('input', displayCardholderName);
inputCardNumber.addEventListener('input', displayCardNumbers);
btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const inputWrappers = document.querySelectorAll('.input-wrapper');
  inputs.forEach((input) => {
    displayErrorMessage(input);
    console.log('h');
  });
});
