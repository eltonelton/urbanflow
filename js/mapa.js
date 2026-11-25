"use strict";

const mapElement = document.getElementById("map");

if (!mapElement) {
  throw new Error("Elemento do mapa não encontrado.");
}

const map = L.map("map", {
  scrollWheelZoom: true
}).setView([-20.846, -42.654], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch("data/linhas.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Não foi possível carregar os dados do mapa.");
    }

    return response.json();
  })
  .then((data) => {
    const rota = [];

    data.forEach((linha) => {
      const position = [linha.lat, linha.lng];

      L.marker(position)
        .addTo(map)
        .bindPopup(`
          <strong>${linha.nome}</strong>
          <br>
          ${linha.rota}
          <br>
          ${linha.horario}
        `);

      rota.push(position);
    });

    if (rota.length > 0) {
      const polyline = L.polyline(rota, {
        color: "#9bbd50",
        weight: 5,
        opacity: 0.85
      }).addTo(map);

      map.fitBounds(polyline.getBounds(), {
        padding: [24, 24]
      });
    }
  })
  .catch(() => {
    const message = document.createElement("div");
    message.className = "card";
    message.style.marginTop = "20px";
    message.textContent = "Não foi possível carregar as linhas no mapa.";
    mapElement.after(message);
  });
