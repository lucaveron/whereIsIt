import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "../Bus/Bus.css";

const Map = ({ userLocation, busLocation }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      return;
    }

    // Crear el mapa
    mapRef.current = L.map("map").setView([userLocation.latitude, userLocation.longitude], 13);

    // Añadir capa de mapa de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);

    // Añadir control de enrutamiento
    L.marker([userLocation.latitude,  userLocation.longitude]).addTo(mapRef.current)
    .bindPopup('Your location')
    .openPopup();
    L.Routing.control({
      waypoints: [
        L.latLng(userLocation.latitude, userLocation.longitude),
        L.latLng(busLocation.latitude, busLocation.longitude)
      ],
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1"
      }),
      lineOptions: {
        styles: [{ color: "blue", opacity: 0.6, weight: 4 }]
      },
      createMarker: function() { return null; }, 
      show: false,
      addWaypoints: false,
      routeWhileDragging:false,
      geocoder: null,
    }).addTo(mapRef.current);

  }, [userLocation, busLocation]);

  return <div id="map" style={{ height: "400px", width: "100%" }} />;
};

export default Map;
