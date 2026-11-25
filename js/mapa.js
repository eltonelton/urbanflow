const map = L.map("map")
.setView(
[-20.846,-42.654],
13
);

L.tileLayer(
"https://tile.openstreetmap.org/{z}/{x}/{y}.png",
{
    maxZoom:19,

    attribution:
    "&copy; OpenStreetMap"
}
)
.addTo(map);

/* =====================
   CARREGAR LINHAS
   ===================== */

fetch("data/linhas.json")

.then(response =>
response.json())

.then(data => {

    const rota = [];

    data.forEach(linha => {

        L.marker([
            linha.lat,
            linha.lng
        ])

        .addTo(map)

        .bindPopup(
        `
        <strong>
        ${linha.nome}
        </strong>

        <br>

        ${linha.rota}
        `
        );

        rota.push([
            linha.lat,
            linha.lng
        ]);
    });

    const linhaAzul =
    L.polyline(
    rota,
    {
        color:"#2563eb",
        weight:5
    })
    .addTo(map);

    map.fitBounds(
    linhaAzul.getBounds()
    );

});
