import React from "react";
import { Link } from "react-router-dom";

class CountryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: {},
      borderingCountriesAlphCodes: [],
      borderingCountries: [],
    };
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  componentDidMount() {
    fetch(
      `https://restcountries.eu/rest/v2/alpha/${this.props.match.params.countryAlphaCode}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ country: data });
        this.setState({ borderingCountriesAlphCodes: data.borders });

        let countryRequests = this.state.borderingCountriesAlphCodes.map(
          (country) =>
            fetch(`https://restcountries.eu/rest/v2/alpha/${country}`)
        );
        Promise.all(countryRequests)
          .then((responses) => Promise.all(responses.map((r) => r.json())))
          .then((borderingCountry) =>
            this.setState({ borderingCountries: borderingCountry })
          );
      });
  }

  render() {
    document.title = this.state.country.name;
    document.getElementById("favicon").href = this.state.country.flag;
    if (this.state.country.currencies) {
      return (
        <div className='container country-page-container'>
          <div className='columns  is-vcentered'>
            <div className='column is-half'>
              <div className='buttons'>
                <button
                  className='button'
                  onClick={() => {
                    this.goBack();
                  }}
                >
                  <i className='fas fa-long-arrow-alt-left'></i>
                  Back
                </button>
                <button
                  className='button'
                  onClick={() => {
                    this.props.history.push("/");
                  }}
                >
                  Home
                </button>
              </div>
              <figure className='image is-5by3'>
                <img
                  className='image'
                  src={this.state.country.flag}
                  alt={`${this.state.country.name} flag`}
                />
              </figure>
            </div>
            <div className='column is-half'>
              <h1 className='title'>{this.state.country.name}</h1>
              <div className='columns'>
                <div className='column'>
                  <p>
                    <strong>Native Name: </strong>{" "}
                    {this.state.country.nativeName}
                  </p>
                  <p>
                    <strong>Population: </strong>
                    {this.state.country.population.toLocaleString()}
                  </p>
                  <p>
                    <strong>Region: </strong> {this.state.country.region}
                  </p>
                  <p>
                    <strong>Sub Region: </strong> {this.state.country.subregion}
                  </p>
                  <p>
                    <strong>Capital: </strong> {this.state.country.capital}
                  </p>
                </div>
                <div className='column'>
                  <p>
                    <strong>Top Level Domain: </strong>
                    {this.state.country.topLevelDomain}
                  </p>
                  <p>
                    <strong>Currency: </strong>
                    {this.state.country.currencies[0].name}
                  </p>
                  <p>
                    <strong>Languages: </strong>
                  </p>
                  <div className='tags'>
                    {this.state.country.languages.map((lang) => (
                      <span key={lang.name} className='tag lang-tag'>
                        {lang.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className='columns'>
                <div className='column'>
                  <p>
                    <strong>Borders:</strong>
                  </p>
                  <div className='tags'>
                    {this.state.borderingCountries.map((bCountry) => {
                      return (
                        <span key={bCountry.name} className='tag'>
                          <Link to={`/${bCountry.alpha3Code.toLowerCase()}`}>
                            {bCountry.name}
                          </Link>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>LOADING...</h1>;
    }
  }
}
export default CountryDetail;
