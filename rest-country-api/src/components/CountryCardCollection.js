import React from "react";
import CountryCard from "./CountryCard";

const CountryCardCollection = (props) => {
  {
    document.title = "Country Finder";
    document.getElementById("favicon").href = `%PUBLIC_URL%/favicon.ico`;
  }
  return (
    <div className='container'>
      <div className='card-grid-container'>
        {props.countries.map((country) => {
          return <CountryCard key={country.name} country={country} />;
        })}
      </div>
    </div>
  );
};

export default CountryCardCollection;
