import React from 'react';
import createPostForm from './createPostForm';
import '../home.css';

function Home({ userLoggedIn }) {
  return (
    <div className='wrapper'>
      <div className='row'>
        <nav className='col-2'>
          <a href="/">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a href="/">
            <i className="fa-solid fa-house"></i>
          </a>

          <a href="/search">
            <i className="fas fa-search"></i>
          </a>

          <a href="/notifications">
            <i className="fa-regular fa-bell"></i>
          </a>
          <a href="/messages">
            <i className="fa-regular fa-envelope"></i>
          </a>
          <a href="/profile">
            <i className="fa-regular fa-user"></i>
          </a>
          <a href="/logout">
            <i className="fas fa-sign-out-alt"></i>
          </a>
        </nav>

        <div className='mainSectionContainer col-10 col-md-8 col-lg-6'>
          <div className='titleContainer'><h1>Home</h1></div>
          {createPostForm(userLoggedIn)}
        </div>

        <div className='d-none d-md-block col-md-2 col-lg-4'>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Home;
