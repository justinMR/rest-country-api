import React from "react";
import "./App.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import "bulma/css/bulma.css";
//Components
import Nav from "../src/components/Nav";
import DropDown from "../src/components/DropDown";
import CountryCardCollection from "../src/components/CountryCardCollection";
//Page
import CountryDetail from "../src/pages/CountryDetail";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      search: "",
      selectValue: "",
      isDarkModeActive: false,
    };
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/")
      .then((response) => response.json())
      .then((data) => this.setState({ countries: data }));
     
  }

  search = (event) => {
    let searchItem = event.target.value;
    this.setState({ search: searchItem });
  };

  selectValue = (event) => {
    let selectedValue = event.target.value;
    this.setState({ selectValue: selectedValue });
  };

  handleSelect(aName) {
    this.setState({ selectValue: aName });
  }

  handleToggleDarkMode() {
    this.setState({ isDarkModeActive: !this.state.isDarkModeActive });
  }

  render() {
    const filteredCountries = this.state.countries
    .filter((country) => {
      return (
        country.name
        .toLowerCase()
        .indexOf(this.state.search.toLowerCase()) !== -1
        );
      })
      .filter((country) => {
        if (this.state.selectValue === "") {
          return country.name;
        } else if (this.state.selectValue === country.region) {
          return country.name;
        }
      });
      
      return (
        <div className={`App ${this.state.isDarkModeActive ? "darkMode" : ""}`}>
        <Nav toggleDarkMode={this.handleToggleDarkMode.bind(this)} darkModeOn={this.state.isDarkModeActive}></Nav>
        <div className='container'>
          <section className='section'>
            <HashRouter basename='/'>
              <Switch>
                <Route exact path='/'>
                  <nav className='level'>
                    <div className='level-left'>
                      <input
                        onChange={(event) => this.search(event)}
                        placeholder='Search a country'
                        className='input'
                      />
                    </div>
                    <div className='level-right'>
                      <DropDown setSelect={this.handleSelect.bind(this)} />
                    </div>
                  </nav>
                  <CountryCardCollection countries={filteredCountries} />
                </Route>
                <Route
                  exact
                  path='/:countryAlphaCode'
                  render={(props)=>(
                    <CountryDetail key={props.match.params.countryAlphaCode} {...props}/>
                  )}
                />
              </Switch>
            </HashRouter>
          </section>
        </div>
      </div>
    );
  }
}
export default App;
