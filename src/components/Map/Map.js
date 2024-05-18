import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "../Bus/Bus.css";

const Map = ({ userLocation, busLocation }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);


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

   // Eliminar el control de enrutamiento existente
   if (routingControlRef.current) {
    routingControlRef.current.removeFrom(mapRef.current);
  }

  // Crear el nuevo control de enrutamiento con opciones personalizadas
  routingControlRef.current = L.Routing.control({
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
    // createMarker: function() { return null; }, 
    // show: false,
    // addWaypoints: false,
    // routeWhileDragging:false,
    // geocoder: null,
    // formatter: new L.Routing.Formatter({
    //   language: "en",
    //   units: "metric",
    //   roundingSensitivity: 10
    // }),
    // routeLine:false
     autoRoute:true,
    // routeLine:false
  }).addTo(mapRef.current);

}, [userLocation, busLocation]);

return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default Map;