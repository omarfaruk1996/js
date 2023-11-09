import L from "leaflet";

export function initMap(component) {
  if (!component.map) {
    component.map = L.map("map").setView([0, 0], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(component.map);

    const markers = [
      {
        lat: 36.66134,
        lon: 138.18768,
        title: "Zenkoji",
        description:
          "Zenkoji is a famous Buddhist temple located in Nagano, Japan.",
      },
      {
        lat: 36.66566,
        lon: 138.17999,
        title: "R & E DXCenter",
        description: "Engineers make Innovation",
      },
    ];

    markers.forEach((marker) => {
      const customIcon = L.icon({
        iconUrl: "/mapdefault.png",
        iconSize: [30, 30],
      });

      const markerPopupContent = `
      <div class="card">
      <div class="card-body border border-secondary"> <!-- Primary color border -->
          <h5 class="card-title text-center bg-light border">${marker.title}</h5>
          <p class="card-text">${marker.description}</p>
          <p class="card-text">
              <small class="text-muted">Latitude: ${marker.lat}, Longitude: ${marker.lon}</small>
          </p>
          <a href="/about" class="btn btn-secondary text-white">タクシー配</a>
          <a href="/event" class="btn btn-secondary text-white">イベント確認・申</a>
      </div>
  </div>
`;

      const otherMarker = L.marker([marker.lat, marker.lon], {
        icon: customIcon,
      }).addTo(component.map);
      otherMarker.bindPopup(markerPopupContent).openPopup();
    });
  }
}

export function showUserLocation(component) {
  if (component.userMarker) {
    component.map.removeLayer(component.userMarker);
  }

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const userIcon = L.icon({
        iconUrl: "/mmp.png",
        iconSize: [30, 30],
      });

      component.userMarker = L.marker([lat, lon], { icon: userIcon }).addTo(
        component.map
      );
      component.userMarker.bindPopup("Your Location").openPopup();
      component.map.setView([lat, lon], 13);
    });
  }
}
