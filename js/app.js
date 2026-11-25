"use strict";

const usuario = localStorage.getItem("urbanflow_user");
const termsAccepted = localStorage.getItem("urbanflow_terms_accepted");

const onLoginPage = window.location.pathname.endsWith("login.html");
const onPublicPage =
  window.location.pathname.endsWith("terms.html") ||
  window.location.pathname.endsWith("privacy.html");

if (!onLoginPage && !onPublicPage && (!usuario || termsAccepted !== "true")) {
  window.location.replace("login.html");
}

const welcomeUser = document.getElementById("welcomeUser");

if (welcomeUser && usuario) {
  welcomeUser.textContent = `Olá, ${usuario}! Para onde vamos?`;
}

const logoutButton = document.getElementById("logoutBtn");

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("urbanflow_user");
    localStorage.removeItem("urbanflow_terms_accepted");
    localStorage.removeItem("urbanflow_terms_accepted_at");
    window.location.replace("login.html");
  });
}
