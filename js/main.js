"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: LINNEAH OLOFSSON
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");

// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */

function validateForm(event) {
  // Kontrollera formulärets obligatoriska fält
  errors.length = 0;

  if (fullnameInput.value.trim() === "") {
    errors.push("Du behöver ange ett namn");
  }

  if (emailInput.value.trim() === "") {
    errors.push("Du behöver ange en korrekt e-postadress");
  }

  if (phoneInput.value.trim() === "") {
    errors.push("Du behöver ange ett telefonnummer");
  }

  // Visa eventuella felmeddelanden
  displayErrors();

  // Kontrollera formulärets obligatoriska fält
  if (errors.length === 0) {
    return true;
  }
}

/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
  // Rensa tidigare felmeddelanden
  errorList.innerHTML = "";
  // Skriv ut aktuella felmeddelanden till DOM
  errors.forEach((error) => {
    const liEl = document.createElement("li");
    const textNode = document.createTextNode(error);

    liEl.appendChild(textNode);
    errorList.appendChild(liEl);
  });
}

/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
  // Hämta information från formuläret
  const name = fullnameInput.value.trim();
  const email = emailInput.value.trim();
  const tel = phoneInput.value.trim();
  const font = fontSelect.value;

  // Uppdatera studentkortet
  previewFullname.textContent = name;
  previewFullname.style.fontFamily = font;

  previewEmail.textContent = email;
  previewEmail.style.fontFamily = font;

  previewPhone.textContent = tel;
  previewPhone.style.fontFamily = font;
  // Lägg till studentkortet i historiken
  loadHistory();
  saveHistory(name, email, tel, font);
  // Spara och uppdatera historiken
}

/**
 * Sparar historiken i localStorage.
 */
function saveHistory(name, email, phone, font) {
  // Spara history i localStorage
  const user = {
    name: name,
    email: email,
    phone: phone,
    font: font,
  };
  loadHistory();

  history.unshift(user);

  const usersJson = JSON.stringify(history);

  localStorage.setItem("cards", usersJson);
}

/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
  // Hämta eventuell sparad historik
  const localStorageData = localStorage.getItem("cards");
  const cards = JSON.parse(localStorageData);

  // Uppdatera history
  if (cards === null) {
    history = [];
  } else {
    history = cards;
  }
}

/**
 * Visar historiken på sidan.
 */
function renderHistory() {
  // Rensa tidigare visad historik
  // Skriv ut innehållet i history till DOM
}

/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
  // Återställ formulär och studentkort
  form.reset();
  previewFullname.textContent = "Namn";
  previewEmail.textContent = "E-post";
  previewPhone.textContent = "Telefon";
  // Rensa eventuella felmeddelanden
  errorList.innerHTML = "";
}

/**
 * Raderar hela historiken.
 */
function deleteHistory() {
  // Radera sparad historik
  localStorage.removeItem("cards");
  // Uppdatera history och visningen på sidan
}

// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
form.addEventListener("submit", function (event) {
  event.preventDefault();

  validateForm();

  // - skapa studentkort om valideringen lyckas
  if (validateForm() === true) {
    createStudentCard();
  }
});

// När användaren klickar på "Rensa"
clearButton.addEventListener("click", clearForm);

// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", deleteHistory);

// När sidan laddas:
// - läs in och visa eventuell tidigare historik
onload.addEventListener("onload", loadHistory);
