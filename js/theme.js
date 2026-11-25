"use strict";

const themeButton = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeStorageKey = "urbanflow_theme";

function getSavedTheme() {
  try {
    return localStorage.getItem(themeStorageKey);
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // O tema ainda funciona na página atual mesmo se o navegador
    // bloquear o armazenamento local.
  }
}

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark", isDark);

  if (themeButton) {
    const label = isDark ? "Ativar tema claro" : "Ativar tema escuro";
    themeButton.setAttribute("aria-label", label);
    themeButton.setAttribute("title", label);
  }

  if (themeIcon) {
    themeIcon.textContent = isDark ? "☀️" : "🌙";
  }
}

applyTheme(getSavedTheme() === "dark" ? "dark" : "light");

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark")
      ? "light"
      : "dark";

    saveTheme(nextTheme);
    applyTheme(nextTheme);
  });
}
