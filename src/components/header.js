import React, { Component } from 'react';
// import logo from './../logo.svg';

class Header extends Component {
  render() {
    return (
    <header  className="App-header">
        <h1 className="App-title">
            HAXcrew
        </h1>

        <nav className="nav">
            <ul>
                <li><a href="/" title="Home">Home</a></li>
                <li><a href="about" title="about">About</a></li>
                <li><a href="raid-roster" title="Raid Roster">Raid Roster</a></li>
                <ul>
                    <li><a href="guild-roster" title="Guild Roster">Guild Roster</a></li>
                </ul>
                <li><a href="loading" title="">loading bar</a></li>
            </ul>
        </nav>
    </header> 
    );
  }
}

export default Header;