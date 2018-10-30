import React, { Component } from 'react';
// import logo from './../logo.svg';
import '../styles/nav.css';

class Header extends Component {
  render() {
    return (
    <header  className="App-header">
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="/">HAXcrew</a>
          <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <div className="navbar-toggler-icon">
              <span className="toggler-open"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg></span>
              
              <span className="toggler-close">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg></span>
            </div>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Guild Info
                </button>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="/guild-roster">Guild Roster</a>
                  <a className="dropdown-item" href="/raid-roster">Raid Roster</a>
                  <a className="dropdown-item" href="https://goo.gl/forms/o59prAd3Y9LuLAG43" target="_blank" rel="noopener noreferrer">Sign Up</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/media">Media</a>
              </li><li className="nav-item">
                <a className="nav-link" href="/test">Sandbox</a>
              </li>
            </ul>
          </div>
        </nav>
    </header> 
    );
  }
}

export default Header;