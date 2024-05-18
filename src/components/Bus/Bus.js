// import logo from '../../logo.svg'
import "./Bus.css";

import React, { useState, useEffect } from "react";
import SearchInput from "../Search/SearchInput.js";
import SearchResults from "../Search/SearchResults.js";
import Alert from "react-bootstrap/Alert";
import Map from "../Map/Map.js"


const Bus = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);

  const handleBusClick = (busLocation) => {
    setSelectedBus(busLocation);
  };
              

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            //userLocation is an object with the following properties
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm === "") {
      setFilteredResults([])
      setMessage(false)
      setWarningMessage("Debe ingresar un número de colectivo");
      setWarning(true);
      return;
    }

    try {
      setLoading(true);
      setMessage("Cargando...");
      const url =
        "https://corsproxy.io/?" +
        encodeURIComponent(
          `https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?client_id=${clientId}&client_secret=${clientSecret}`
        );
      const response = await fetch(url);
      const data = await response.json();
      console.log("Carga completa");
      setMessage("Search results");
      setLoading(false);
      setWarning(false);
      return data; // Devuelve los datos obtenidos de la API
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setWarning(true);
      setWarningMessage("Error al cargar los datos");
    }
  };

  const filterResultsAsync = async () => {
    const data = await handleSearch(); //espero la asincronía
    if (data) {
      const filteredResults = data.filter((result) => {
        const routeNumber = result.route_short_name.match(/\d+/);
        return routeNumber && routeNumber[0] === searchTerm;
      });
      if (filteredResults.length === 0) {
        setWarning(true);
        setWarningMessage("No se hallaron colectivos con la linea buscada");
      } else {
        setFilteredResults(filteredResults);
      }
    }
  };

  return (
    <div className="Container">
      <div className="Bus-container">
        <div className="Bus-content">
          <div className="Search-container">
            <h1 className="App-link">Bus Tracker</h1>
            <SearchInput
              value={searchTerm}
              onChange={handleSearchChange}
              onSearch={filterResultsAsync}
              isLoading={isLoading}
            />
          </div>
          {warning && <Alert variant={"warning"}>{warningMessage}</Alert>}
          <h1>{message}</h1>
          <div>
            {filteredResults.length > 0 && (
              <SearchResults
                results={filteredResults}
                message={message}
                userLocation={userLocation}
                onBusClick={handleBusClick}
              />
            )}
          </div>
        </div>
      </div>
      <div className="Map-container">
        {selectedBus && userLocation && (
          <Map userLocation={userLocation} busLocation={selectedBus} />
        )}
      </div>
    </div>
  );
};
export default Bus;
