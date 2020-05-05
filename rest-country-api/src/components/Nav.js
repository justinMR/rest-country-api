import React from "react";

const Nav = (props) => {
  return (
    <div className='level lead-nav-level'>
      <div className='container'>
        <nav id='main-nav' className='level'>
          <div className='level-left'>
            <div className='level-item'>
              <h1 className='title is-size-4-mobile'>Where in the world?</h1>
            </div>
          </div>
          <div className='level-right'>
            <div className='level-item'>
              <button className='button' onClick={() => props.toggleDarkMode()}>
                <i className='far fa-moon'></i>
                <i className='far fa-sun'></i>
                <h2>Mode</h2>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
