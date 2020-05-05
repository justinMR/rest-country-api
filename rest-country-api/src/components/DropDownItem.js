import React from "react";

const DropDownItem = (props) => {
  return (
    <a href='#' className='dropdown-item' onClick={props.handleClick}>
      {props.name}
    </a>
  );
};

export default DropDownItem;
