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
  // Lägg till studentkortet i historiken
  // Spara och uppdatera historiken
}

/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
  // Spara history i localStorage
}

/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
  // Hämta eventuell sparad historik
  // Uppdatera history
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
  // Rensa eventuella felmeddelanden
}

/**
 * Raderar hela historiken.
 */
function deleteHistory() {
  // Radera sparad historik
  // Uppdatera history och visningen på sidan
}

// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
form.addEventListener("submit", function (event) {
  event.preventDefault();

  validateForm();

  if (validateForm() === true) {
    console.log("hej");
  }
});
// - skapa studentkort om valideringen lyckas

// När användaren klickar på "Rensa"
clearButton.addEventListener("click", clearForm);

// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", deleteHistory);

// När sidan laddas:
// - läs in och visa eventuell tidigare historik
