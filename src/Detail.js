import React from 'react';
import { useParams } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: '1',
    author: 'John Doe',
    fullText: 'Full text'
  },
  {
    id: 2,
    title: '2',
    author: 'Jane Doe',
    fullText: 'Full text'
  },
  // 3,4,5
];

const Detail = () => {
  const { id } = useParams();
  const post = blogPosts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <div className="container mt-5"><h1>...</h1></div>;
  }

  return (
    <div className="container mt-5">
      <h1>{post.title}</h1>
      <p>By {post.author}</p>
      <p>{post.fullText}</p>
    </div>
  );
};

export default Detail;