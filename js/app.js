"use strict";

const pageName = window.location.pathname.split("/").pop() || "index.html";

const publicPages = new Set([
  "login.html",
  "terms.html",
  "privacy.html",
  "404.html"
]);

let userName = null;
let termsAccepted = null;

try {
  userName = localStorage.getItem("urbanflow_user");
  termsAccepted = localStorage.getItem("urbanflow_terms_accepted");
} catch {
  // A verificação abaixo encaminha para o login se não houver armazenamento.
}

if (
  !publicPages.has(pageName) &&
  (!userName || termsAccepted !== "true")
) {
  window.location.replace("login.html");
}

const welcomeUser = document.getElementById("welcomeUser");

if (welcomeUser && userName) {
  welcomeUser.textContent = `Olá, ${userName}! Para onde vamos?`;
}

const logoutButton = document.getElementById("logoutBtn");

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    try {
      localStorage.removeItem("urbanflow_user");
      localStorage.removeItem("urbanflow_terms_accepted");
      localStorage.removeItem("urbanflow_terms_accepted_at");
    } finally {
      window.location.replace("login.html");
    }
  });
}
