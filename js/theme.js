"use strict";

const themeButton = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("urbanflow_theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  if (themeButton) {
    themeButton.setAttribute("aria-label", "Ativar tema claro");
  }
}

if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem(
      "urbanflow_theme",
      isDark ? "dark" : "light"
    );

    themeButton.setAttribute(
      "aria-label",
      isDark ? "Ativar tema claro" : "Ativar tema escuro"
    );
  });
}
