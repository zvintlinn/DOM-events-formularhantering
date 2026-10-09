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

function validateForm() {
  //Tömmer array
  errors.length = 0;

  // Kontrollera formulärets obligatoriska fält
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

  // Returnerar true när inga felmeddelanden finns = alla fält är ifyllda
  if (errors.length === 0) {
    return true;
  }
}

/**
 * Visar felmeddelanden på sidan.
 */

function displayErrors() {
  // Rensa tidigare felmeddelanden - undviker dubletter
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
  saveHistory(name, email, tel, font);

  // Spara och uppdatera historiken
  renderHistory();
}

/**
 * Sparar historiken i localStorage.
 */

function saveHistory(name, email, phone, font) {
  //Deklarerar variabel för objekt på nytt
  const student = {
    name: name,
    email: email,
    phone: phone,
    font: font,
  };

  //Laddar om tidigare historik från localstorage
  loadHistory();

  // Spara ny history i localStorage
  history.unshift(student);

  const studentJson = JSON.stringify(history);

  localStorage.setItem("cards", studentJson);
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
  // Rensa tidigare visad historik - förhindrar dubletter
  historySection.innerHTML = "";

  // Skriv ut innehållet i history till DOM
  for (let i = 0; i < history.length; i++) {
    const sectionEl = document.createElement("section");
    sectionEl.style.border = "1px solid #ccc";
    sectionEl.style.margin = "5px";
    sectionEl.style.padding = "5px";

    const pEl = document.createElement("p");
    pEl.style.fontFamily = history[i].font;
    pEl.innerHTML = `${history[i].name}<br>${history[i].email}<br>${history[i].phone}`;

    sectionEl.appendChild(pEl);
    historySection.appendChild(sectionEl);
  }
}

/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */

function clearForm() {
  // Återställ formulär och studentkort
  form.reset();
  previewFullname.textContent = "Namn";
  previewFullname.style.fontFamily = "";
  previewEmail.textContent = "E-post";
  previewEmail.style.fontFamily = "";
  previewPhone.textContent = "Telefon";
  previewPhone.style.fontFamily = "";

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
  historySection.innerHTML = "";
}

// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateForm() === true) {
    // - skapa studentkort om valideringen lyckas
    createStudentCard();
  }
});

// När användaren klickar på "Rensa"
clearButton.addEventListener("click", clearForm);

// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", deleteHistory);

// När sidan laddas:
// - läs in och visa eventuell tidigare historik
window.addEventListener("load", loadHistory);
window.addEventListener("load", renderHistory);
