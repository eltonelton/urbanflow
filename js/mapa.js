const map = L.map("map").setView(
[-20.846, -42.654],
13
);

L.tileLayer(
'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    maxZoom:19,
    attribution:
    '&copy; OpenStreetMap'
}
).addTo(map);

L.marker([
-20.846,
-42.654
])

.addTo(map)

.bindPopup(
'Ônibus 101'
)

.openPopup();

L.marker([
-20.855,
-42.648
])

.addTo(map)

.bindPopup(
'Ônibus 102'
);
