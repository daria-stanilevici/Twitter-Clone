import axios from 'axios';
import React, { useState } from 'react';

const defaultProfilePic = '/images/profilePic.png';

function CreatePostForm({ loggedInUser, setPosts }) {
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePost = async (e) => {
    e.preventDefault();

    if (!loggedInUser?._id) {
      alert('Please login first');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/posts/createPost', {
        content: postContent,
        userId: loggedInUser?._id,
      });

      setPosts((prevPosts) => [response.data.post, ...prevPosts]);
    } catch (err) {
      console.error(err);
      setError('An error occurred while posting.');
    } finally {
      setLoading(false);
      setPostContent('');
    }
  };

  return (
    <div className="postFormContainer">
      <div className="userImageContainer">
        <img className="profilePic" src={defaultProfilePic} alt="User" />
      </div>

      <div className="textAreaContainer">
        <textarea className="postTextArea"placeholder="What is happening?!"value={postContent}onChange={(e) => setPostContent(e.target.value)}></textarea>
        <div className="buttonsContainer">
          <button onClick={handlePost}className="submitButton"disabled={!postContent || loading}>Post</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostForm;