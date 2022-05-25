import { useState, useEffect } from 'react';
import Post from './Post/Post';
import { fetchPosts } from '../../api/posts';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  
  const postElements = posts.map(post => {
    return <Post key={post._id} title={post.title} />
  });

  useEffect(() => {
    fetchPosts()
      .then(posts => setPosts(posts));
  }, []);

  return (
    <section className="posts">
      <h2>Posts</h2>

      {postElements}
    </section>
  )
}