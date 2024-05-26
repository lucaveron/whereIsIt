// src/components/About/About.js
import React from "react";
import "./About.css";
import reactLogo from "../../logo.svg";
import boostrapLogo from "../../assets/img/boostrapLogo.png";

const About = () => {
  const technologies = [
    { name: "React", logo: reactLogo },
    { name: "Boostrap", logo: boostrapLogo },
  ];

  return (
    <div className="about-wrapper">
      <div className="about-container">
        <div className="container-text">
          <h1>About the Bus Tracker Application</h1>
          <p>
            Welcome to the Bus Tracker Application, your go-to solution for
            knowing the distance of Buenos Aires buses from your location, both
            in time and meters. This application leverages the transportation
            API provided by the City of Buenos Aires, which offers real-time
            information about the current positions of all the buses in the
            city.
          </p>
          <p>
            I utilize the Leaflet library to display a map, though please note
            that the user location might not be perfectly accurate due to the
            map’s data originating from Ukraine. The time distance is calculated
            based on a general rule, assuming that the average bus speed in
            Argentina is 22.78 km/h. This value represents the average speed of
            buses in Argentina.
          </p>
          <p>
            The distance in meters is measured directly in a straight line from
            the bus to your location at the time of the search. It does not
            account for additional factors such as streets, turns and blockages.
          </p>
          {/* <p>
          &copy; {new Date().getFullYear()} Luca Verón
        </p> */}
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          &copy; {new Date().getFullYear()} Luca Verón. Created with:
          {technologies.map((tech, index) => (
            <img
              key={index}
              src={tech.logo}
              alt={tech.name}
              title={tech.name}
              className="tech-logo"
            />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default About;
