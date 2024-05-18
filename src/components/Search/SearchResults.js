import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import React from "react";
import "../Bus/Bus.css";
import { getDistance } from "geolib";

const Results = ({ results, message, userLocation }) => {
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
            const timeInMinutes = distance != null ? calculateTime(distance) + ' minutes' : 'No data'
            const formattedDistance = distance !== null ? distance.toLocaleString('es-MX') + ' meters' : "No data"
            return (
              <React.Fragment key={result.id}>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start">
                  <div className="ms-2">
                    <div className="fw-bold">
                      Terminal: {result.trip_headsign}
                    </div>
                    Distance between the bus and you (meters): {' '}  
                    {formattedDistance} <br />
                    Distance between the bus and you (minutes):
                    {timeInMinutes}
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
