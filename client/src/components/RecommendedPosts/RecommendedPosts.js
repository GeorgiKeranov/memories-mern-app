import { useEffect, useState } from 'react';
import { getRecommendedPosts } from '../../api/posts';
import './RecommendedPosts.css';
import Post from '../Post/Post';

export default function RecommendedPosts({excludedPostId, tags}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await getRecommendedPosts({excludedPostId, tags});
      setPosts(fetchedPosts);
    };

    getPosts();
  }, [excludedPostId, tags]);

  const postsJsx = posts.map(post => {
    return (
      <Post key={post._id} post={post} />
    );
  })

  return (
    <section className="recommended-posts grow-and-fade-in-animation">
      <h2>Recommended Posts</h2>

      <div className="recommended__posts">
        {postsJsx}
      </div>
    </section>
  )
}