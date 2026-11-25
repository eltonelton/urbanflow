const params =
new URLSearchParams(
window.location.search
);

const id =
Number(
params.get("id")
);

const container =
document.getElementById(
"detalhesContainer"
);

fetch("data/linhas.json")

.then(response =>
response.json())

.then(data => {

    const linha =
    data.find(item =>
    item.id === id);

    if(!linha){

        container.innerHTML =

        `
        <div class="card">

            Linha não encontrada.

        </div>
        `;

        return;
    }

    let statusClasse =
    "status-success";

    let statusTexto =
    "Em operação";

    if(
    linha.status ===
    "atencao"
    ){

        statusClasse =
        "status-warning";

        statusTexto =
        "Poucas vagas";
    }

    if(
    linha.status ===
    "lotado"
    ){

        statusClasse =
        "status-danger";

        statusTexto =
        "Lotado";
    }

    container.innerHTML =

    `
    <div class="card">

        <h2>
            ${linha.nome}
        </h2>

        <br>

        <p>

            <strong>Rota:</strong>

            ${linha.rota}

        </p>

        <br>

        <p>

            <strong>Horário:</strong>

            ${linha.horario}

        </p>

        <br>

        <p>

            <strong>Vagas:</strong>

            ${linha.vagas}

        </p>

        <br>

        <span
        class="status ${statusClasse}">

            ${statusTexto}

        </span>

        <br><br><br>

        <a
        href="mapa.html"
        class="button">

            Abrir Mapa

        </a>

    </div>
    `;
});
