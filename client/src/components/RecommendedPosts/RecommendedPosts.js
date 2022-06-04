import { useEffect, useState } from 'react';
import { getRecommendedPosts } from '../../api/posts';
import './RecommendedPosts.css';
import Post from '../Post/Post';
import Loader from '../Loader/Loader';

export default function RecommendedPosts({excludedPostId, tags}) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const getPosts = async () => {
      const fetchedPosts = await getRecommendedPosts({excludedPostId, tags});
      setIsLoading(false);
      setPosts(fetchedPosts);
    };

    getPosts();
  }, [excludedPostId, tags]);

  const postsJsx = posts.map(post => {
    return (
      <Post key={post._id} post={post} disableButtons={true} />
    );
  })

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="recommended-posts grow-and-fade-in-animation">
      <div className="recommended__heading">
        <h2>You may also like these posts:</h2>
      </div>

      <div className="recommended__posts">
        {postsJsx}
      </div>
    </section>
  )
}