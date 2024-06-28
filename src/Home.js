import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: '1',
    author: 'John Doe',
    excerpt: 'Part text',
    fullText: 'Full text'
  },
  {
    id: 2,
    title: '2',
    author: 'Jane Doe',
    excerpt: 'Part text',
    fullText: 'Full text'
  },
];

const Home = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <div className="home-container">
      <div className="teal-box">
        <h1 className="home-title">Home</h1>
      </div>
      <div className="centered-container">
        <h2 className="blog-title">Blog</h2>
        {isAuthenticated ? (
          blogPosts.map((post) => (
            <div key={post.id} className="blog-post">
              <h3 className="blog-post-title">{post.title}</h3>
              <p className="blog-post-author">By {post.author}</p>
              <p className="blog-post-excerpt">{post.excerpt}</p>
              <Link to={`/detail/${post.id}`}>
                <button className="blog-post-button">Read on</button>
              </Link>
            </div>
          ))
        ) : (
          <p>Log in to see blog posts.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
