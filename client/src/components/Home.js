import React from 'react';
import '../App.css';
function Home() {
  return (
    <div className="wrapper">
      <div className="row">
        <nav className="col-2">
          <a className="logo" href="/">
            <faXTwitter/>
          </a>
          <a href="/">
            <faHouse/>
            <span>Home</span>
          </a>
          <a href="/search">
            <faMagnifyingGlass />
            <span>Explore</span>
          </a>
          <a href="/notifications">
            <faBell />
            <span>Notifications</span>
          </a>
          <a href="/messages">
            <faEnvelope />
            <span>Messages</span>
          </a>
          <a href="/profile">
            <faUser />
            <span>Profile</span>
          </a>
          <a href="/logout">
            <faRightFromBracket />
            <span>Exit</span>
          </a>
        </nav>
        <div className="mainSectionContainer col-10 col-md-8 col-lg-6"></div>
        <div className="d-none d-md-block col-md-2 col-lg-4"></div>
      </div>
    </div>
  );
}

export default Home;
