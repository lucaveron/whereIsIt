import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "../Bus/Bus.css";

const Map = ({ userLocation, busLocation }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!userLocation) {
      return;
    }

    const markerIconUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";
    const markerShadowUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png";
    
    // Crear un icono personalizado para el marcador del usuario
    const customIcon = L.icon({
      iconUrl: markerIconUrl,
      shadowUrl: markerShadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Crear un icono personalizado para la ruta
    const routeIcon = L.icon({
      iconUrl: markerIconUrl,  // Puedes cambiar esta URL a la que prefieras
      shadowUrl: markerShadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    if (mapRef.current) {
      mapRef.current.setView([userLocation.latitude, userLocation.longitude], 13);
    } else {
      // Crear el mapa
      mapRef.current = L.map("map").setView([userLocation.latitude, userLocation.longitude], 13);

      // Añadir capa de mapa de OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      // Añadir marcador de la ubicación del usuario
      L.marker([userLocation.latitude, userLocation.longitude], { icon: customIcon }).addTo(mapRef.current)
        .bindPopup('You')
        .openPopup();
    }

    if (busLocation) {
      // Eliminar el control de enrutamiento existente si existe
      if (routingControlRef.current) {
        mapRef.current.removeControl(routingControlRef.current);
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
        autoRoute: true,
        createMarker: function (i, waypoint, n) {
          // Si es el primer marcador, usar el icono personalizado del usuario
          if (i === 0) {
            return L.marker(waypoint.latLng, { icon: customIcon });
          }
          // Para los demás marcadores, usar el icono personalizado de la ruta
          return L.marker(waypoint.latLng, { icon: routeIcon });
        },
        show: false,
        addWaypoints: false, // Desactiva los waypoints interactivos
        routeWhileDragging: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        createGeocoder: () => null,
        itineraryFormatter: () => null, // Desactiva la creación del itinerario,
        itinerary: {
          show: false, // Esconde el itinerario
        } // Desactiva la creación de geocoders,

      }).addTo(mapRef.current);
    }
  }, [userLocation, busLocation]);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default Map;
