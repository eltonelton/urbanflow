"use strict";

const form = document.getElementById("loginForm");
const nameInput = document.getElementById("nome");
const modal = document.getElementById("termsModal");
const acceptCheckbox = document.getElementById("acceptTerms");
const confirmButton = document.getElementById("confirmTerms");
const cancelButton = document.getElementById("cancelTerms");

let pendingName = "";

function openTerms() {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  acceptCheckbox.focus();
}

function closeTerms() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  acceptCheckbox.checked = false;
  confirmButton.disabled = true;
  nameInput.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();

  if (name.length < 2) {
    nameInput.setCustomValidity("Digite um nome com pelo menos 2 caracteres.");
    nameInput.reportValidity();
    nameInput.setCustomValidity("");
    return;
  }

  pendingName = name;
  openTerms();
});

acceptCheckbox.addEventListener("change", () => {
  confirmButton.disabled = !acceptCheckbox.checked;
});

cancelButton.addEventListener("click", closeTerms);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeTerms();
  }
});

confirmButton.addEventListener("click", () => {
  if (!acceptCheckbox.checked || !pendingName) {
    return;
  }

  try {
    localStorage.setItem("urbanflow_user", pendingName);
    localStorage.setItem("urbanflow_terms_accepted", "true");
    localStorage.setItem("urbanflow_terms_accepted_at", new Date().toISOString());
    window.location.href = "index.html";
  } catch (error) {
    alert("Não foi possível salvar sua preferência neste navegador. Verifique as configurações de armazenamento.");
  }
});
