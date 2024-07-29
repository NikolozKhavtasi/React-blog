import React, { useState, useEffect } from 'react';
import './App.css';
import NavbarComponent from './Navbar';
import { fetchPosts, deletePost, addPost, editPost, addComment, deleteComment } from './api';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isAlternate, setIsAlternate] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', author: '', text: '' });
  const [newComment, setNewComment] = useState({ text: '' });
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        const testPost = { id: 'test-post', title: 'Test', author: 'Tester', text: 'test test test test test 12345' };
        setPosts([testPost, ...data]);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
    };

    checkAuth();
  }, []);

  const toggleDesign = () => {
    if (isAlternate && !isAuthenticated) {
      navigate('/sign-in');
    } else {
      setIsAlternate(!isAlternate);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const addedPost = await addPost(newPost);
      setPosts([addedPost, ...posts]);
      setNewPost({ title: '', author: '', text: '' });
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  const handleEditPost = async (id) => {
    const updatedPost = { title: 'Updated Post', author: 'Tester', text: 'This post has been updated.' };
    try {
      const editedPost = await editPost(id, updatedPost);
      setPosts(posts.map(post => (post.id === id ? editedPost : post)));
    } catch (error) {
      console.error('Failed to edit post:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAddComment = async (postId, e) => {
    e.preventDefault();
    try {
      const comment = { text: newComment.text };
      await addComment(postId, comment);
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), comment] }
          : post
      ));
      setNewComment({ text: '' });
      setSelectedPostId(null);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await deleteComment(commentId);
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, comments: post.comments.filter(comment => comment.id !== commentId) }
          : post
      ));
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const handleSignInRedirect = () => {
    navigate('/sign-in');
  };

  return (
    <div>
      <NavbarComponent />
      <div className={`home-box ${isAlternate ? 'alternate' : ''}`}>
        <h1 className="home-text">Home</h1>
        {isAuthenticated ? (
          <button onClick={toggleDesign} className="toggle-button">V</button>
        ) : (
          <button onClick={handleSignInRedirect} className="toggle-button">Sign in to see blog posts</button>
        )}
      </div>
      {isAlternate && isAuthenticated && (
        <div className="blog-posts">
          <form onSubmit={handleAddPost} className="add-post-form">
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              placeholder="Title"
              required
            />
            <input
              type="text"
              name="author"
              value={newPost.author}
              onChange={handleInputChange}
              placeholder="Author"
              required
            />
            <textarea
              name="text"
              value={newPost.text}
              onChange={handleInputChange}
              placeholder="Text"
              required
            />
            <button type="submit" className="add-button">Add Post</button>
          </form>
          {posts.map(post => (
            <div key={post.id} className="blog-post">
              <h2 className="blog-title">{post.title}</h2>
              <p className="blog-author">Author: {post.author}</p>
              <p className="blog-text">{post.text}</p>
              <button onClick={() => handleDelete(post.id)} className="delete-button">Delete</button>
              <button onClick={() => handleEditPost(post.id)} className="edit-button">Edit</button>
              <button onClick={() => setSelectedPostId(post.id)} className="comment-button">Add Comment</button>
              {selectedPostId === post.id && (
                <form onSubmit={(e) => handleAddComment(post.id, e)} className="add-comment-form">
                  <textarea
                    name="text"
                    value={newComment.text}
                    onChange={(e) => setNewComment({ text: e.target.value })}
                    placeholder="Add a comment"
                    required
                  />
                  <button type="submit" className="add-comment-button">Submit Comment</button>
                </form>
              )}
              {post.comments && post.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <p className="comment-text">{comment.text}</p>
                  <button onClick={() => handleDeleteComment(post.id, comment.id)} className="delete-comment-button">Delete Comment</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
