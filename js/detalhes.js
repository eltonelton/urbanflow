"use strict";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const container = document.getElementById("detalhesContainer");

fetch("data/linhas.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Não foi possível carregar os dados da linha.");
    }

    return response.json();
  })
  .then((data) => {
    const linha = data.find((item) => item.id === id);

    if (!linha) {
      container.innerHTML = `
        <div class="card">
          <h2>Linha não encontrada</h2>
          <p>Selecione uma linha disponível na página de ônibus.</p>
          <br>
          <a class="button" href="onibus.html">Ver linhas</a>
        </div>
      `;
      return;
    }

    let statusClass = "status-success";
    let statusText = "Em operação";

    if (linha.status === "atencao") {
      statusClass = "status-warning";
      statusText = "Poucas vagas";
    }

    if (linha.status === "lotado") {
      statusClass = "status-danger";
      statusText = "Lotado";
    }

    container.innerHTML = `
      <article class="card">
        <p class="eyebrow">Linha ${linha.id}</p>
        <h2>${linha.nome}</h2>

        <br>
        <p><strong>Rota:</strong> ${linha.rota}</p>
        <p><strong>Horário:</strong> ${linha.horario}</p>
        <p><strong>Vagas:</strong> ${linha.vagas}</p>

        <br>
        <span class="status ${statusClass}">
          ${statusText}
        </span>

        <br><br>
        <a class="button" href="mapa.html">Abrir mapa</a>
      </article>
    `;
  })
  .catch(() => {
    container.innerHTML = `
      <div class="card">
        <h2>Informações indisponíveis</h2>
        <p>Não foi possível carregar os detalhes da linha.</p>
      </div>
    `;
  });
