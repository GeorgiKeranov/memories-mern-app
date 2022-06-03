import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../../api/posts';
import Main from '../Main/Main';
import Loader from '../Loader/Loader';

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const fetchedPost = await getPostById(id);
      setPost(fetchedPost);
      setLoading(false);
    };

    getPost();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Main>
      {post ? (
        <div>{post.title}</div>
      ) : (
        <h1>The post is not found, you can view all of the available posts on <Link to="/">this page</Link></h1>
      )}
    </Main>
  )
}