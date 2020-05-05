import React from "react";
//import DropDownItem from "./DropDownItem";

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      textToDisplay: "Filter by Region",
    };
    this.setDropDownText = this.setDropDownText.bind(this);
  }

  toggleisActive = (event) => {
    this.setState({ isActive: !this.state.isActive });
  };

  setDropDownText(region) {
    this.setState({ textToDisplay: region });
  }

  render() {
    return (
      <div
        id='test'
        className={`dropdown ${this.state.isActive ? "is-active" : ""}`}
      >
        <div className='dropdown-trigger'>
          <button
            className='button'
            aria-haspopup='true'
            aria-controls='dropdown-menu'
            onClick={this.toggleisActive}
          >
            <span>{this.state.textToDisplay}</span>
            <span className='icon is-small'>
              <i className='fas fa-angle-down' aria-hidden='true' />
            </span>
          </button>
        </div>
        <div className='dropdown-menu' id='dropdown-menu' role='menu'>
          <div className='dropdown-content'>
            <button
              className='dropdown-item'
              onClick={() => {
                this.props.setSelect("");
                this.setDropDownText("Filter by Region");
              }}
            >
              (All Regions)
            </button>
            <button
              className='dropdown-item'
              onClick={() => {
                this.props.setSelect("Africa");
                this.setDropDownText("Africa");
              }}
            >
              Africa
            </button>
            <button
              className='dropdown-item'
              onClick={() => {
                this.props.setSelect("Americas");
                this.setDropDownText("Americas");
              }}
            >
              Americas
            </button>
            <button
              className='dropdown-item'
              onClick={() => {
                this.props.setSelect("Asia");
                this.setDropDownText("Asia");
              }}
            >
              Asia
            </button>
            <button
              className='dropdown-item'
              onClick={() => {
                this.props.setSelect("Europe");
                this.setDropDownText("Europe");
              }}
            >
              Europe
            </button>
            <button
              className='dropdown-item'
              onClick={() => {
                this.props.setSelect("Oceania");
                this.setDropDownText("Oceania");
              }}
            >
              Oceania
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DropDown;
