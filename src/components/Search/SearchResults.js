import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import React from "react";
import "../Bus/Bus.css";

const Results = ({ results, message }) => {
  return (
    <div className="searchResults-container">
    <div className="Results-container">
      <ListGroup as="ol" numbered>
        {results.map((result) => (
            <React.Fragment key={result.id}>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start">
              <div className="ms-2  ">
                <div className="fw-bold">Terminal: {result.trip_headsign}</div>
                Distancia del colectivo hacia ti(metros): <br/>
                Distancia del colectivo hacia ti(minutos):
              </div>
              <Badge bg="primary" pill>
              {result.route_short_name}
              </Badge>
            </ListGroup.Item>
            </React.Fragment>
        ))}
      </ListGroup>
    </div>
    </div>
  );
};
export default Results;

// function DefaultExample() {
//   return (
//     <ListGroup as="ol" numbered>
//       <ListGroup.Item
//         as="li"
//         className="d-flex justify-content-between align-items-start"
//       >
//         <div className="ms-2 me-auto">
//           <div className="fw-bold">Subheading</div>
//           Cras justo odio
//         </div>
//         <Badge bg="primary" pill>
//           14
//         </Badge>
//       </ListGroup.Item>
//       <ListGroup.Item
//         as="li"
//         className="d-flex justify-content-between align-items-start"
//       >
//         <div className="ms-2 me-auto">
//           <div className="fw-bold">Subheading</div>
//           Cras justo odio
//         </div>
//         <Badge bg="primary" pill>
//           14
//         </Badge>
//       </ListGroup.Item>
//       <ListGroup.Item
//         as="li"
//         className="d-flex justify-content-between align-items-start"
//       >
//         <div className="ms-2 me-auto">
//           <div className="fw-bold">Subheading</div>
//           Cras justo odio
//         </div>
//         <Badge bg="primary" pill>
//           14
//         </Badge>
//       </ListGroup.Item>
//     </ListGroup>
//   );
// }

// export default DefaultExample;
