import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "../Bus/Bus.css";

const Map = ({ userLocation, busLocation }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const [routeInfo, setRouteInfo] = useState({ distance: null, time: null });

  useEffect(() => {
    if (!userLocation) {
      return;
    }

    const markerIconUrl =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";
    const markerShadowUrl =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png";

    const customIcon = L.icon({
      iconUrl: markerIconUrl,
      shadowUrl: markerShadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const routeIcon = L.icon({
      iconUrl: markerIconUrl, 
      shadowUrl: markerShadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    if (mapRef.current) {
      mapRef.current.setView(
        [userLocation.latitude, userLocation.longitude],
        13
      );
    } else {
      mapRef.current = L.map("map").setView(
        [userLocation.latitude, userLocation.longitude],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      L.marker([userLocation.latitude, userLocation.longitude], {
        icon: customIcon,
      })
        .addTo(mapRef.current)
        .bindPopup("You")
        .openPopup();
    }

    if (busLocation) {
      if (routingControlRef.current) {
        mapRef.current.removeControl(routingControlRef.current);
      }

      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(userLocation.latitude, userLocation.longitude),
          L.latLng(busLocation.latitude, busLocation.longitude),
        ],
        router: L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1",
        }),
        lineOptions: {
          styles: [{ color: "blue", opacity: 0.6, weight: 4 }],
        },
        autoRoute: true,
        createMarker: function (i, waypoint, n) {
         
          if (i === 0) {
            return L.marker(waypoint.latLng, { icon: customIcon });
          }
          
          return L.marker(waypoint.latLng, { icon: routeIcon });
        },
        show: false,
        addWaypoints: false, // disallow interactive waypoints
        routeWhileDragging: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        createGeocoder: () => null,
        itineraryFormatter: () => null, 
        itinerary: {
          show: false, 
        },
      }).addTo(mapRef.current);
      routingControlRef.current.on("routesfound", (e) => {
        const route = e.routes[0];
        const summary = route.summary;
        const distance = (summary.totalDistance / 1000).toFixed(1) + " km";
        const time = Math.round(summary.totalTime / 60) + " min";
        setRouteInfo({ distance, time });
      });
    }
  }, [userLocation, busLocation]);

  return( <div>
    <div id="map" style={{ height: "500px", width: "100%" }}></div>
    {routeInfo.distance && routeInfo.time && (
      <div className="route-info" style={{display:"none"}}>
        <h2>Distancia: {routeInfo.distance}</h2>
        <h3>Tiempo: {routeInfo.time}</h3>
      </div>
    )}
  </div>);
};

export default Map;
