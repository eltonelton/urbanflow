"use strict";

const themeButton = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeStorageKey = "urbanflow_theme";

function readSavedTheme() {
  try {
    return localStorage.getItem(themeStorageKey);
  } catch {
    return null;
  }
}

function updateTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark", isDark);

  if (themeButton) {
    const label = isDark ? "Ativar tema claro" : "Ativar tema escuro";
    themeButton.setAttribute("aria-label", label);
    themeButton.setAttribute("title", label);
  }

  if (themeIcon) {
    themeIcon.textContent = isDark ? "☀" : "☾";
  }
}

const initialTheme = readSavedTheme() === "dark" ? "dark" : "light";
updateTheme(initialTheme);

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark")
      ? "light"
      : "dark";

    try {
      localStorage.setItem(themeStorageKey, nextTheme);
    } catch {
      // A troca continua funcionando na página atual mesmo sem armazenamento.
    }

    updateTheme(nextTheme);
  });
}
