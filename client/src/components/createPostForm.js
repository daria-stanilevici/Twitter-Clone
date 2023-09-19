import React, { useState } from 'react';

function CreatePostForm(userLoggedIn) {
  const defaultProfilePic = '/images/profilePic.png';

  const [postContent, setPostContent] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleTextareaChange = (event) => {
    const content = event.target.value;
    setPostContent(content);
    
    setIsButtonDisabled(content.trim() === '');
  };

  return (
    <div className="postFormContainer">
        <div className="userImageContainer">
            <img className='profilePic' src={defaultProfilePic} alt="User" />
        </div>
        
        <div className="textAreaContainer">
            <textarea className='postTextArea' placeholder='What is happening?!' value={postContent} onChange={handleTextareaChange}></textarea>
            <div className='buttonsContainer'>
                <button className='submitButton' disabled={isButtonDisabled}>Post</button>
            </div>
        </div>
    </div>
  );
}

export default CreatePostForm;
