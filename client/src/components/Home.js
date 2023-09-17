import React from 'react';
import '../home.css';

function Home() {
  return (
    <div className='wrapper'>
      <div className='row'>
        <nav className='col-2'>
          <a href="/">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a href="/">
            <i className="fa-solid fa-house"></i>
            <span style={{ fontWeight: 'bold' }}>Home</span>
          </a>

          <a href="/search">
            <i className="fas fa-search"></i>
            <span>Explore</span>
          </a>

          <a href="/notifications">
            <i className="fa-regular fa-bell"></i>
            <span>Notifications</span>
          </a>
          <a href="/messages">
            <i className="fa-regular fa-envelope"></i>
            <span>Messages</span>
          </a>
          <a href="/profile">
            <i className="fa-regular fa-user"></i>
            <span>Profile</span>
          </a>
          <a href="/logout">
            <i className="fas fa-sign-out-alt"></i>
            <span>Exit</span>
          </a>
        </nav>

        <div className='mainSectionContainer col-10 col-md-8 col-lg-6'>
          <span>Main Section</span>
        </div>

        <div className='d-none d-md-block col-md-2 col-lg-4'>
          <span>Third Column</span>
        </div>
      </div>
    </div>
  );
}

export default Home;