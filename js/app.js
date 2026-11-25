"use strict";

const currentPath = window.location.pathname;
const pageName = currentPath.split("/").pop() || "index.html";

const publicPages = new Set([
  "login.html",
  "terms.html",
  "privacy.html",
  "404.html"
]);

let usuario = null;
let termosAceitos = null;

try {
  usuario = localStorage.getItem("urbanflow_user");
  termosAceitos = localStorage.getItem("urbanflow_terms_accepted");
} catch {
  // Se o armazenamento estiver bloqueado, a proteção encaminha
  // para o login, onde a pessoa poderá receber a mensagem adequada.
}

if (
  !publicPages.has(pageName) &&
  (!usuario || termosAceitos !== "true")
) {
  window.location.replace("login.html");
}

const welcomeUser = document.getElementById("welcomeUser");

if (welcomeUser && usuario) {
  welcomeUser.textContent = `Olá, ${usuario}! Para onde vamos?`;
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
