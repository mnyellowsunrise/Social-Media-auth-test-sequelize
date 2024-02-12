import React, { useState, useEffect } from 'react';
import axios from '../axios-config';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        console.log('Fetched posts:', response.data.posts);
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts', error);
        console.log('Error response:', error.response);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/posts', {
        content: newPostContent,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setPosts([...posts, response.data.post]);
      setNewPostContent('');
    } catch (error) {
      console.error('Error creating post', error);
      console.log('Error response:', error.response);
    }
  };
  

  

  return (
    <div>
      <h2>Posts</h2>

      <form onSubmit={handlePostSubmit}>
        <label>
          New Post:
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
        </label>
        <button type="submit">Post</button>
      </form>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.content}</strong>
              <p>Author: {post.User ? post.User.email : 'Unknown'}</p> {/* Update here */}
              
              {/* Section for displaying comments */}
              <ul>
                {post.Comments ? (
                  post.Comments.map((comment) => (
                    <li key={comment.id}>
                      <p>{comment.content}</p>
                      <p>Comment by: {comment.User ? comment.User.email : 'Unknown'}</p> {/* Update here */}
                    </li>
                  ))
                ) : (
                  <li>No comments yet.</li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Posts;

