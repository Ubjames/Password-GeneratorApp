const result = document.querySelector("#display");
const lengthEl = document.querySelector("#number-field");
const uppercaseEl = document.querySelector("#Uppercase");
const lowercaseEl = document.querySelector("#Lowercase");
const numbersEl = document.querySelector("#Numbers");
const symbolsEl = document.querySelector("#Symbols");
const slider = document.querySelector("#slider");
const clipboard = document.querySelector(".fa-copy");
const downloadIcon = document.querySelector(".fa-download");
const generateEl = document.querySelector("button");
const strengthCheckerController = document.querySelector("#strength-checker");
const hard = document.querySelector("#hard");
const easy = document.querySelector("#easy");
const labelForHard = document.querySelector("#hard-label");
const labelForEasy = document.querySelector("#easy-label");
const strengthChecker = document.querySelector(".password-state");
const $alert = document.querySelector("#alert-box");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboard.addEventListener("click", (e) => {
  const textarea = document.createElement("textarea");
  const password = result.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  $alert.innerHTML = "Password copied to clipboard";
  const alertOut = setTimeout(() => {
    $alert.classList.toggle("active");
  }, 500);

  setTimeout(() => {
    clearTimeout(alertOut);
    $alert.classList.remove("active");
  }, 2800);
});

downloadIcon.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = result.innerText;

  if (!password) {
    return;
  }

  document.body.appendChild(textarea);
  textarea.value = password;
  savePassword(textarea.value, "password.txt");

  function savePassword(textToWrite, fileNameToSaveAs) {
    var textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";

    if (window.webkitURL != null) {
      // Chrome allows the link to be clicked
      // without actually adding it to the DOM.
      downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
      // Firefox requires the link to be added to the DOM
      // before it can be clicked.
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.onclick = destroyClickedElement;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
    }

    downloadLink.click();
    textarea.remove();
    $alert.innerHTML = "Password Downloaded";
    const alertOut = setTimeout(() => {
      $alert.classList.toggle("active");
    }, 1000);

    setTimeout(() => {
      clearTimeout(alertOut);
      $alert.classList.remove("active");
    }, 3000);
  }
});
// console.log()
generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  let hasLower = lowercaseEl.checked;
  let hasUpper = uppercaseEl.checked;
  let hasNumber = numbersEl.checked;
  let hasSymbol = symbolsEl.checked;

  let numberOfCheckedBoxes = document.querySelectorAll(
    ".charsetting input[type=checkbox]:checked"
  ).length;
  // console.log(numberOfCheckedBoxes);
  if (length > 50) {
    alert("please enter a password length that is less than 50");
  } else if (
    (numberOfCheckedBoxes == 2 && length < 2) ||
    (numberOfCheckedBoxes == 3 && length < 3) ||
    (numberOfCheckedBoxes == 4 && length < 4)
  ) {
    alert("please increase the password length");
  } else {
    result.innerText = generatePassword(
      hasLower,
      hasUpper,
      hasNumber,
      hasSymbol,
      length
    );
  }

  function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );

    // Doesn't have a selected type
    if (typesCount === 0) {
      return "";
    }

    // create a loop
    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }
    const finalPassword = generatedPassword.slice(0, length);

    // console.log(easy);
    // console.log(labelForHard);
    let easyStrength = easy.checked;
    let hardStrength = hard.checked;

    let controllerIsActive = strengthCheckerController.checked;
    if (!controllerIsActive) {
      dontCheckStrength();
    } else if (controllerIsActive == true && hardStrength == true) {
      hardPassword();
    } else {
      easyPassword();
    }
    function dontCheckStrength() {
      strengthChecker.style.width = "0";
    }
    function easyPassword() {
      /*  bad: #ff0000
            poor: #ff3c00
            weak: #ff9100
            good: #bbff00
            better: #5eff00
            striong: #009e35
            * 1.5, 3.5, 5.5, 7.5, 9.5, 11.5
        */

      if (finalPassword.length <= 3) {
        strengthChecker.style.width = "1.5em";
        strengthChecker.style.backgroundColor = "#ff0000";
      } else if (finalPassword.length == 4) {
        strengthChecker.style.width = "3.5em";
        strengthChecker.style.backgroundColor = "#ff3c00";
      } else if (finalPassword.length == 5 || finalPassword.length == 6) {
        strengthChecker.style.width = "5.5em";
        strengthChecker.style.backgroundColor = "#ff9100";
      } else if (finalPassword.length == 7 || finalPassword.length == 8) {
        strengthChecker.style.width = "7.5em";
        strengthChecker.style.backgroundColor = "#bbff00";
      } else if (
        finalPassword.length == 9 ||
        finalPassword.length == 10 ||
        finalPassword.length == 11
      ) {
        strengthChecker.style.width = "9.5em";
        strengthChecker.style.backgroundColor = "#5eff00";
      } else if (finalPassword.length >= 12) {
        strengthChecker.style.width = "11.5em";
        strengthChecker.style.backgroundColor = "#009e35";
        return hardPassword();
      }
    }

    function hardPassword() {
      if (finalPassword.length <= 6) {
        strengthChecker.style.width = "1.5em";
        strengthChecker.style.backgroundColor = "#ff0000";
      } else if (finalPassword.length == 7 || finalPassword.length == 8) {
        strengthChecker.style.width = "3.5em";
        strengthChecker.style.backgroundColor = "#ff3c00";
      } else if (
        (hasNumber === true &&
          length == 10 &&
          hasLower === false &&
          hasUpper === false &&
          hasSymbol === false) ||
        (hasNumber === false &&
          length == 10 &&
          hasLower === true &&
          hasUpper === false &&
          hasSymbol === false) ||
        (hasNumber === false &&
          length == 10 &&
          hasLower === false &&
          hasUpper === true &&
          hasSymbol === false) ||
        (hasNumber === false &&
          length == 10 &&
          hasLower === false &&
          hasUpper === false &&
          hasSymbol === true)
      ) {
        strengthChecker.style.width = "5.5em";
        strengthChecker.style.backgroundColor = "#ff9100";
      } else if (
        (hasSymbol == true &&
          hasNumber == true &&
          length == 11 &&
          hasUpper == false &&
          hasLower == false) ||
        (hasSymbol == false &&
          hasNumber == false &&
          length == 11 &&
          hasUpper == true &&
          hasLower == true) ||
        (hasSymbol == false &&
          hasNumber == true &&
          length == 11 &&
          hasUpper == false &&
          hasLower == true) ||
        (hasSymbol == true &&
          hasNumber == false &&
          length == 11 &&
          hasUpper == false &&
          hasLower == true) ||
        (hasSymbol == false &&
          hasNumber == true &&
          length == 11 &&
          hasUpper == true &&
          hasLower == false)
      ) {
        strengthChecker.style.width = "7.5em";
        strengthChecker.style.backgroundColor = "#bbff00";
      } else if (
        (hasSymbol == true &&
          hasNumber == true &&
          hasUpper == true &&
          length == 12 &&
          hasLower == false) ||
        (hasLower == true &&
          hasNumber == true &&
          hasSymbol == true &&
          length == 12 &&
          hasUpper == false) ||
        (hasUpper == true &&
          hasLower == true &&
          hasNumber == true &&
          length == 12 &&
          hasSymbol == false) ||
        (hasUpper == true &&
          hasLower == true &&
          hasSymbol == true &&
          length == 12 &&
          hasNumber == false)
      ) {
        strengthChecker.style.width = "9.5em";
        strengthChecker.style.backgroundColor = "#5eff00";
      } else if (
        (hasUpper == true &&
          hasLower == true &&
          hasSymbol == true &&
          hasNumber == true &&
          length == 10) ||
        length == 13 ||
        length == 12 ||
        length >= 14
      ) {
        strengthChecker.style.width = "11.5em";
        strengthChecker.style.backgroundColor = "#009e35";
      }
    }
    return finalPassword;
  }
});

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=|`~:;$%<>/,.@";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
lengthEl.addEventListener("input", syncCharacterAmount);
slider.addEventListener("input", syncCharacterAmount);

function syncCharacterAmount(e) {
  const value = e.target.value;
  lengthEl.value = value;
  slider.value = value;
  let checker = document.querySelector(".progressbar");
}

setInterval(() => {
  let controllerIsActive = strengthCheckerController.checked;
  if (controllerIsActive) {
    // easyPassword();
    hard.setAttribute("enabled", "true");
    easy.setAttribute("enabled", "true");
    easy.removeAttribute("disabled", "true");
    hard.removeAttribute("disabled", "true");
    labelForEasy.classList.remove("fade");
    labelForHard.classList.remove("fade");
  } else {
    hard.removeAttribute("enabled", "true");
    easy.removeAttribute("enabled", "true");
    hard.setAttribute("disabled", "true");
    easy.setAttribute("disabled", "true");
    labelForEasy.classList.add("fade");
    labelForHard.classList.add("fade");
  }
}, 0.01);

/* add-ins */
const social = document.querySelector(".social");
const feedbackBtn = document.querySelector(".Feedback");
feedbackBtn.addEventListener("click", () => {
  social.classList.toggle("visible");
});
