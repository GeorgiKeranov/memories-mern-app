import { useEffect, useState } from 'react';
import { getRecommendedPosts } from '../../api/posts';
import './RecommendedPosts.css';

export default function RecommendedPosts({tags}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await getRecommendedPosts(tags);
      setPosts(fetchedPosts);
    };

    getPosts();
  }, []);

  const postsJsx = posts.map(post => {
    return (
      <div key={post._id} className="recommended__post">
        {post.title}
      </div>
    );
  })

  return (
    <section className="recommended-posts grow-and-fade-in-animation">
      {postsJsx}
    </section>
  )
}