import React from "react";
import { Link } from "react-router-dom";

const CountryCard = (props) => {
  return (
    <div key={props.country.name} className='card'>
      <div
        className='card-image-container'
        style={{ backgroundImage: `url(${props.country.flag})` }}
      ></div>
      <div className='card-content'>
        <p className='title is-4'>
          <Link to={`/${props.country.alpha3Code.toLowerCase()}`}>
            {props.country.name}
          </Link>
        </p>
        <p className='subtitle'>
          <strong>Population:</strong>{" "}
          {props.country.population.toLocaleString()}
        </p>
        <p className='subtitle'>
          <strong>Region:</strong> {props.country.region}
        </p>
        <p className='subtitle'>
          <strong>Capital:</strong> {props.country.capital}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
