import React from 'react';

function createPostForm(userLoggedIn) {
  const defaultProfilePic = '/images/profilePic.png';

  return (
    <div className="postFormContainer">
        <div className="userImageContainer">
            <img className='profilePic' src={defaultProfilePic} alt="User's profile picture" />
        </div>
        
        <div className="textAreaContainer">
            <textarea className='postTextArea' placeholder='What is happening?!'></textarea>
            <div className='buttonsContainer'>
                <button className='submitButton'>Post</button>
            </div>
        </div>
    </div>
  );
}

export default createPostForm;
