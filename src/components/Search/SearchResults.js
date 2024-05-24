import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import React, {useState} from "react";
import "../Bus/Bus.css";
import { getDistance } from "geolib";


const Results = ({ results, message, userLocation, onBusClick }) => {
  const AVERAGE_BUS_SPEED = 6.33; // 6.33m/s×3.6=22.788km/h
  const [selectedBusId, setSelectedBusId] = useState(null); // Estado para rastrear el ítem seleccionado



  const calculateDistance = (busLocation) => {

    if (!userLocation) {
      return null;
    }

    const distanceInMeters = getDistance(userLocation, {
      latitude: busLocation.latitude,
      longitude: busLocation.longitude,
    });

    return distanceInMeters;
  };

  const calculateTime = (distance) => {
    if (distance != null){
      const timeInSeconds = distance / AVERAGE_BUS_SPEED;
      const timeInMinutes = timeInSeconds / 60;
      return timeInMinutes.toFixed(0);//two decimals
    }
    return null
  }

  const handleBusClick = (busId, busLocation) => {
    setSelectedBusId(busId);
    onBusClick(busLocation)
  }

  const sortedResults = results
  .map((result) => ({
    ...result,
    distance: calculateDistance({
      latitude: result.latitude,
      longitude: result.longitude,
    }),
  }))
  .sort((a, b) => (a.distance || 0) - (b.distance || 0)); // If result is negative, a > b, otherwise b > a




  return (
    <div className="searchResults-container">

      <div className="Results-container">
        <ListGroup as="ol" numbered>
          {sortedResults.map((result) => {
          const formattedDistance = result.distance !== null ? result.distance.toLocaleString('es-MX') : "Calculando...";
          const timeInMinutes = result.distance !== null ? calculateTime(result.distance) : "Calculando...";
            return (
              <React.Fragment key={result.id}>
                <ListGroup.Item
                  as="li"
                  className={`d-flex justify-content-between align-items-start list-group-item ${selectedBusId === result.id ? 'clicked' : ''}`}
                  onClick={() => handleBusClick(result.id, { latitude: result.latitude, longitude: result.longitude })}
                >
                  <div className="ms-2">
                    <div className="fw-bold">Terminal: {result.trip_headsign}</div>
                    Distancia del colectivo hacia ti (metros): {formattedDistance} <br />
                    Distancia del colectivo hacia ti (minutos): {timeInMinutes}
                  </div>
                  <Badge bg="primary" pill>
                    {result.route_short_name}
                  </Badge>
                </ListGroup.Item>
              </React.Fragment>
            );
          })}
        </ListGroup>
      </div>
    </div>

    
  );
};

export default Results;
