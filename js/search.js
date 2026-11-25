"use strict";

const container = document.getElementById("busContainer");
const searchInput = document.getElementById("busSearch");

let linhas = [];

fetch("data/linhas.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Não foi possível carregar as linhas.");
    }

    return response.json();
  })
  .then((data) => {
    linhas = data;
    renderLinhas(data);
  })
  .catch(() => {
    container.innerHTML = `
      <div class="card">
        <h2>Linhas indisponíveis</h2>
        <p>Não foi possível carregar os dados neste momento.</p>
      </div>
    `;
  });

function getStatus(linha) {
  if (linha.status === "atencao") {
    return {
      className: "status-warning",
      text: "Poucas vagas"
    };
  }

  if (linha.status === "lotado") {
    return {
      className: "status-danger",
      text: "Lotado"
    };
  }

  return {
    className: "status-success",
    text: "Em operação"
  };
}

function renderLinhas(lista) {
  container.innerHTML = "";

  if (lista.length === 0) {
    container.innerHTML = `
      <div class="card">
        <h2>Nenhuma linha encontrada</h2>
        <p>Tente pesquisar pelo número da linha ou por outro destino.</p>
      </div>
    `;
    return;
  }

  lista.forEach((linha) => {
    const status = getStatus(linha);

    container.innerHTML += `
      <article class="bus-card">
        <div>
          <h3>${linha.nome}</h3>
          <p>${linha.rota}</p>
          <p>Horário: ${linha.horario}</p>
          <p>Vagas: ${linha.vagas}</p>
        </div>

        <div>
          <span class="status ${status.className}">
            ${status.text}
          </span>
          <br><br>
          <a class="button" href="detalhes.html?id=${linha.id}">
            Ver detalhes
          </a>
        </div>
      </article>
    `;
  });
}

searchInput.addEventListener("input", (event) => {
  const termo = event.target.value.trim().toLowerCase();

  const resultado = linhas.filter((linha) =>
    linha.nome.toLowerCase().includes(termo) ||
    linha.rota.toLowerCase().includes(termo)
  );

  renderLinhas(resultado);
});
