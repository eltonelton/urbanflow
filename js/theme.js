const themeBtn =
document.getElementById(
"themeToggle"
);

const savedTheme =
localStorage.getItem(
"theme"
);

/* ====================
   TEMA SALVO
   ==================== */

if(savedTheme === "dark"){

    document.body.classList
    .add("dark");
}

/* ====================
   TROCAR TEMA
   ==================== */

if(themeBtn){

    themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList
        .toggle("dark");

        localStorage.setItem(
        "theme",

        document.body.classList
        .contains("dark")

        ? "dark"
        : "light"
        );
    });
}
