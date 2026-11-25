const container =
document.getElementById(
"busContainer"
);

const searchInput =
document.getElementById(
"busSearch"
);

let linhas = [];

/* ====================
   CARREGAR JSON
   ==================== */

fetch("data/linhas.json")

.then(response =>
response.json())

.then(data => {

    linhas = data;

    renderLinhas(data);

});

/* ====================
   RENDER
   ==================== */

function renderLinhas(lista){

    container.innerHTML = "";

    lista.forEach(linha => {

        let statusClass =
        "status-success";

        let textoStatus =
        "Em operação";

        if(
        linha.status ===
        "atencao"
        ){
            statusClass =
            "status-warning";

            textoStatus =
            "Poucas vagas";
        }

        if(
        linha.status ===
        "lotado"
        ){
            statusClass =
            "status-danger";

            textoStatus =
            "Lotado";
        }

        container.innerHTML +=

        `
        <div class="bus-card">

            <div>

                <h3>
                    ${linha.nome}
                </h3>

                <p>
                    ${linha.rota}
                </p>

                <p>
                    Horário:
                    ${linha.horario}
                </p>

                <p>
                    Vagas:
                    ${linha.vagas}
                </p>

            </div>

            <div>

                <span
                class="status ${statusClass}">
                    ${textoStatus}
                </span>

                <br><br>

                <a
                class="button"
                href="detalhes.html?id=${linha.id}">

                    Ver Detalhes

                </a>

            </div>

        </div>
        `;
    });

}

/* ====================
   PESQUISA
   ==================== */

searchInput.addEventListener(
"keyup",
e => {

    const termo =
    e.target.value
    .toLowerCase();

    const resultado =
    linhas.filter(item =>

        item.nome
        .toLowerCase()
        .includes(termo)

        ||

        item.rota
        .toLowerCase()
        .includes(termo)

    );

    renderLinhas(
    resultado
    );
});
