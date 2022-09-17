const inputs = document.querySelectorAll('.input-wrapper input');
const btnSubmit = document.getElementById('submit');

const inputName = document.getElementById('name');
const inputCardNumber = document.getElementById('card-number');
const inputExpMonth = document.getElementById('exp-month');
const inputExpYear = document.getElementById('exp-year');
const inputCVC = document.getElementById('cvc');

const cardNumbersEL = document.getElementById('front__card-numbers');
const cardNameEL = document.getElementById('front__card-name');
const cardExpMonthEL = document.getElementById('exp-month-card');
const cardExpYearEL = document.getElementById('exp-year-card');
const cardCVCEL = document.getElementById('back__card-cvc');

const form = document.getElementById('payment');
const confirmation = document.querySelector('.confimation-notice');

const resetCardInformation = () => {
  cardNumbersEL.innerHTML = `0000 0000 0000 0000`;
  cardNameEL.innerHTML = `Jane Appleseed`;
  cardExpMonthEL.innerHTML = `00`;
  cardExpYearEL.innerHTML = `00`;
  cardCVCEL.innerHTML = `000`;
  form.style.display = 'block';
  confirmation.style.display = 'none';
};

//Show Error
const showErrorMessage = (input, message) => {
  const errorMessage = message;
  const paragraph = input.nextElementSibling;

  paragraph.style.display = 'block';
  paragraph.innerHTML = errorMessage;
  input.parentNode.classList.add('error-message');
};

//Hide Error
const hideErrorMessage = (input) => {
  const paragraph = input.nextElementSibling;

  input.parentNode.classList.remove('error-message');
  paragraph.style.display = 'none';
};

//Check if input blank
function checkIfBlank(input) {
  if (input.value === '') {
    showErrorMessage(input, `Can't be blank`);
  } else {
    hideErrorMessage(input);
  }
}

//Validate Card Numbers
const cardNumbersValidation = (input, e) => {
  //Remove all strings from being shown on the card UI
  let cardNumberValue = inputCardNumber.value.trim().replace(/[a-zA-Z]/g, '');
  //Allow only numbers and backspace
  if (cardNumberValue.length < 17) {
    if (
      (e.keyCode > 48 && e.keyCode < 58) ||
      e.keyCode === 8 ||
      (e.keyCode > 95 && e.keyCode < 106)
    ) {
      hideErrorMessage(input);
      //Add space after every 4th element
      cardNumbersEL.innerHTML = cardNumberValue.replace(/\d{4}(?=.)/g, '$& ');
    } //Check if space is added
    else if (e.keyCode === 32) {
      showErrorMessage(input, 'Wrong format, no space allowed');
    } else {
      showErrorMessage(input, 'Wrong format, numbers only');
    }
  }
};

inputName.addEventListener('keyup', () => {
  const inputNameValue = inputName.value;
  cardNameEL.innerHTML = inputNameValue.toUpperCase().trim();
  if (inputNameValue !== '') {
    hideErrorMessage(inputName);
  }
});

inputCardNumber.addEventListener('keyup', (e) => {
  cardNumbersValidation(inputCardNumber, e);
});

//Validate Month
inputExpMonth.addEventListener('keyup', (e) => {
  const inputExpMonthValue = inputExpMonth.value;

  if (isNaN(+inputExpMonthValue)) {
    showErrorMessage(inputExpMonth, 'Ivalid Monat'); //Check if letters
    console.log(isNaN(+inputExpMonthValue));
  } else if (+inputExpMonthValue > 1 && +inputExpMonthValue < 10) {
    hideErrorMessage(inputExpMonth);
    cardExpMonthEL.innerHTML = `0${inputExpMonthValue}`;
  } else if (+inputExpMonthValue >= 10 && +inputExpMonthValue < 13) {
    hideErrorMessage(inputExpMonth);
    cardExpMonthEL.innerHTML = inputExpMonthValue;
  } else if (+inputExpMonthValue == 1) {
    hideErrorMessage(inputExpMonth);
    cardExpMonthEL.innerHTML = `0${inputExpMonthValue}`;
  } else if (inputExpMonthValue === '') {
    hideErrorMessage(inputExpMonth);
    cardExpMonthEL.innerHTML = `00`;
  } else if (+inputExpMonthValue > 12) {
    showErrorMessage(inputExpMonth, `Invalid Month`); //check if month exists
  }
});

// Check Year
inputExpYear.addEventListener('keyup', () => {
  const inputExpYearValue = inputExpYear.value;

  if (+inputExpYearValue > 0 && +inputExpYearValue < 99) {
    hideErrorMessage(inputExpYear);
    cardExpYearEL.innerHTML = inputExpYearValue;
  } else if (inputExpYearValue === '') {
    hideErrorMessage(inputExpYear);
    cardExpYearEL.innerHTML = `00`;
  } else {
    showErrorMessage(inputExpYear, 'Ivalid Year');
  }
});

//CVC UI
inputCVC.addEventListener('keyup', (e) => {
  const inputCVCValue = inputCVC.value;

  if (isNaN(+inputCVCValue)) {
    showErrorMessage(inputCVC, 'Invalid numbers');
  } else {
    hideErrorMessage(inputCVC);
    cardCVCEL.innerHTML = inputCVCValue;
  }
});

// SUBMIT
btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();

  const inputsValidation = [];

  inputs.forEach((input, i) => {
    //Show error when empty
    checkIfBlank(input);

    //Check if the inputs have the right length
    if (i === 1 && input.value.length < 16) {
      showErrorMessage(input, `Numbers missing`); //cardnumbers
    } else if (i === 3 && input.value.length < 2) {
      showErrorMessage(input, `Invalid year`); //year
    } else if (i === 4 && input.value.length < 3) {
      showErrorMessage(input, `Invalid CVC`); //cvc
    }

    inputsValidation.push(input.checkValidity());
  });

  //Check if all fields are valid with the pattern help on HTML
  let formValid = true;

  if (inputsValidation.includes(false)) {
    formValid = false;
  }

  if (formValid) {
    form.style.display = 'none';
    confirmation.style.display = 'block';

    //Reset inputs and Card Information
    const btnContinue = document.getElementById('confirmed');
    btnContinue.addEventListener('click', () => {
      inputs.forEach((input) => {
        input.value = '';
      });

      resetCardInformation();
    });
  }
});
