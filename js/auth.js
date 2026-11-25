const cookieBanner =
document.getElementById(
"cookieBanner"
);

const cookieAccepted =
localStorage.getItem(
"cookieAccepted"
);

if(
cookieBanner &&
!cookieAccepted
){

    cookieBanner.style.display =
    "block";
}

const acceptBtn =
document.getElementById(
"acceptCookies"
);

if(acceptBtn){

    acceptBtn.addEventListener(
    "click",
    () => {

        localStorage.setItem(
        "cookieAccepted",
        "true"
        );

        cookieBanner.style.display =
        "none";
    });
}

/* =========================
   LOGIN
   ========================= */

const form =
document.getElementById(
"loginForm"
);

if(form){

    form.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const nome =
        document
        .getElementById("nome")
        .value
        .trim();

        if(nome.length < 2){

            alert(
            "Digite um nome válido."
            );

            return;
        }

        localStorage.setItem(
        "urbanflow_user",
        nome
        );

        window.location.href =
        "index.html";
    });
}
const usuario =
localStorage.getItem(
"urbanflow_user"
);

if(
usuario &&
window.location.pathname
.includes("login.html")
){

    console.log(
    "Usuário encontrado."
    );
}
