import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import React, {useState} from "react";
import "../Bus/Bus.css";
import { getDistance } from "geolib";
import Map from "../Map/Map.js"


const Results = ({ results, message, userLocation, onBusClick }) => {
  const AVERAGE_BUS_SPEED = 8.33;


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



  return (
    <div className="searchResults-container">

      <div className="Results-container">
        <ListGroup as="ol" numbered>
          {results.map((result) => {
            const distance = calculateDistance({
              latitude: result.latitude,
              longitude: result.longitude,
            });
            const formattedDistance = distance !== null ? distance.toLocaleString('es-MX') : "Calculando...";
            const timeInMinutes = distance !== null ? calculateTime(distance) : "Calculando...";

            return (
              <React.Fragment key={result.id}>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start list-group-item"
                  onClick={() => onBusClick({ latitude: result.latitude, longitude: result.longitude })}
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
