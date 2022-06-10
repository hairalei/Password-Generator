const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const ALPHABETS = "qwertyuiopasdfghjklzxcvbnm";

function getRandomUpper() {
  return ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)].toUpperCase();
}

function getRandomLower() {
  return ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
}

function getRandomNumber() {
  const numbers = "01234556789";
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.?";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

//Shuffle the password
function shufflePassword(str) {
  return str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function generatePassword() {
  const func = [];
  let password = "";
  let passwordLength = lengthEl.value;

  if (uppercaseEl.checked) {
    func.push(getRandomUpper);
  }
  if (lowercaseEl.checked) {
    func.push(getRandomLower);
  }
  if (numbersEl.checked) {
    func.push(getRandomNumber);
  }
  if (symbolsEl.checked) {
    func.push(getRandomSymbol);
  }

  //Generate initial characters
  func.forEach((f) => {
    password += f();
  });

  //Generate remaining random characters
  let remained = passwordLength - password.length;

  for (let i = 0; i < remained; i++) {
    const randomFunction = func[Math.floor(Math.random() * func.length)];
    password += randomFunction();
  }

  //Generate the FINAL password;
  resultEl.textContent = shufflePassword(password);
}

//////
///////Event listeners
generateEl.addEventListener("click", function (e) {
  generatePassword();
});

clipboardEl.addEventListener("click", () => {
  if (!resultEl.textContent) return;

  //Copy to clipboard
  navigator.clipboard.writeText(resultEl.textContent);
  clipboardEl.classList.add("copied");

  setTimeout(() => clipboardEl.classList.remove("copied"), 2000);
});
