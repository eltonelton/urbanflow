const usuario =
localStorage.getItem(
"urbanflow_user"
);

/* ====================
   PROTEÇÃO
   ==================== */

if(
!usuario &&
!window.location.pathname
.includes("login.html")
){

    window.location.href =
    "login.html";
}

/* ====================
   SAUDAÇÃO
   ==================== */

const welcomeUser =
document.getElementById(
"welcomeUser"
);

if(welcomeUser){

    welcomeUser.innerHTML =

    `Olá, ${usuario || "Usuário"}!`;
}

/* ====================
   LOGOUT
   ==================== */

const logoutBtn =
document.getElementById(
"logoutBtn"
);

if(logoutBtn){

    logoutBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
        "urbanflow_user"
        );

        window.location.href =
        "login.html";
    });
}
