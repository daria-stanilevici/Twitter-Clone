import React, { useEffect, useState } from 'react';
import CreatePostForm from './createPostForm';
import '../home.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BsChat } from 'react-icons/bs'
import { FaRetweet } from 'react-icons/fa6'
import { BsHeartFill } from 'react-icons/bs'
import { BsHeart } from 'react-icons/bs'
import moment from 'moment';

const defaultProfilePic = '/images/profilePic.png';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load the user
    const user = JSON.parse(window.localStorage.getItem('x_user'));
    if (user?.username) {
      setLoggedInUser(user);
    }
  }, []);

  useEffect(() => {
    // Fetch posts
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts/getPosts');
        setPosts(response.data.posts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const handleRepost = async (e, el) => {
    if (!loggedInUser?._id) {
      alert('Please login first');
      return;
    }
    e.preventDefault();
    setLoading(true);
    try {
      const postId = el?.originalPostRef?._id ? el?.originalPostRef?._id : el?._id;
      const content = el?.content;
      await axios.post('http://localhost:5000/api/posts/reTweet', {
        userId: loggedInUser?._id,
        postId,
        content,
      });
      // Refetch posts after retweeting
      const response = await axios.get('http://localhost:5000/api/posts/getPosts');
      setPosts(response.data.posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLikeDislike = async (e, el) => {
    if (!loggedInUser?._id) {
      alert('Please login first');
      return;
    }
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.put(`http://localhost:5000/api/posts/likePost/${el._id}/${loggedInUser?._id}`);
      if (result.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post._id === el._id) {
              if (el?.like?.includes(loggedInUser?._id)) {
                post.like = post.like.filter((likeUserId) => likeUserId !== loggedInUser?._id);
              } else {
                post.like.push(loggedInUser?._id);
              }
            }
            return post;
          })
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="row">
        <nav className="col-2">
          <Link to="/"><i className="fa-brands fa-x-twitter"></i></Link>
          <Link to="/"><i className="fa-solid fa-house"></i></Link>
          <Link to="/search"><i className="fas fa-search"></i></Link>
          <Link to="/notifications"><i className="fa-regular fa-bell"></i></Link>
          <Link to="/messages"><i className="fa-regular fa-envelope"></i></Link>
          <Link to="/profile"><i className="fa-regular fa-user"></i></Link>
          <Link to="/logout"><i className="fas fa-sign-out-alt"></i></Link>
        </nav>
        <div className="mainSectionContainer col-10 col-md-8 col-lg-6">
          <div style={{ width: '100%' }}>
            <div className="titleContainer">
              <h1>Home</h1>
            </div>
            <CreatePostForm loggedInUser={loggedInUser} setPosts={setPosts} />
          </div>

          <div style={{ width: '100%' }}>
            {posts.length === 0 ? (
              <div>Ooops! No posts yet...</div>
            ) : (
              <div>
                {posts.map((el) => (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'start',
                      borderBottom: '1px solid #64696d',
                      gap: '5px',
                      padding: '30px 20px',
                      width: '100%',
                    }}
                    key={el?._id}>
                    <div className="userImageContainer">
                      <img className='profilePic' src={defaultProfilePic} alt="User" />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginTop: '2px',
                        marginLeft: '20px',
                        width: '100%',
                        position: 'relative',
                      }}>
                      <div
                        style={{
                          marginTop: '5px',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'start',
                          alignItems: 'center',
                          gap: '10px',
                        }}>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', textDecoration: 'underline' }}>
                          {el?.postedBy?.username}
                        </span>
                        <span style={{ color: '#64696d' }}>
                          @{el?.postedBy?.email?.split('@')[0]}
                        </span>
                        <span style={{ color: '#64696d' }}>{moment(el?.postedOn).startOf('day').fromNow()}</span>
                      </div>
                      <div>
                        <span style={{ marginTop: '8px', display: 'block' }}>{el?.content}</span>
                      </div>
                      <div
                        style={{
                          marginTop: '5px',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'start',
                          gap: '250px',
                        }}>
                        {el?.isRePost && (
                          <div
                            style={{
                              position: 'absolute',
                              top: -25,
                              left: -45,
                              backgroundColor: 'transparent',
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'start',
                              alignItems: 'center',
                              gap: '10px',
                            }}>
                            <FaRetweet style={{ width: '15px', height: '15px' }} />
                            <span style={{ fontSize: '14px' }}>
                              {`Retweet by ${loggedInUser?._id === el?.postedBy?._id ? 'you' : `@${el?.postedBy?.email?.split('@')[0]}`}`}
                            </span>
                          </div>
                        )}
                        <div>
                          <BsChat style={{ width: '20px', height: '20px' }} />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                          onClick={(e) => handleRepost(e, el)}>
                          <FaRetweet style={{ width: '20px', height: '20px' }} />
                          <span>
                            {el?.originalPostRef?.rePost?.length || el?.rePost?.length > 0
                              ? el?.originalPostRef?.rePost?.length || el?.rePost?.length
                              : null}
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                          onClick={(e) => toggleLikeDislike(e, el)}>
                          {el?.like?.includes(loggedInUser?._id) ? (
                            <BsHeartFill style={{ width: '20px', height: '20px', color: 'red' }} />
                          ) : (
                            <BsHeart style={{ width: '20px', height: '20px' }} />
                          )}
                          <span>{el?.like?.length > 0 ? el?.like?.length : null}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;