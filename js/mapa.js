const rota = [

[-20.846,-42.654],

[-20.850,-42.652],

[-20.853,-42.650],

[-20.855,-42.648]

];

const linha = L.polyline(
rota,
{
    color:"#2563eb",
    weight:5
}
).addTo(map);

map.fitBounds(
linha.getBounds()
);
