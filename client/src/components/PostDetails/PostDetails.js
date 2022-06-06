import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../../api/posts';
import './PostDetails.css';
import Main from '../Main/Main';
import Loader from '../Loader/Loader';
import PostTimeDifference from '../PostTimeDifference/PostTimeDifference';
import RecommendedPosts from '../RecommendedPosts/RecommendedPosts';
import Comments from './Comments/Comments';

export default function PostDetails() {
  const navigate = useNavigate();
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

  if (!post) {
   navigate('/');
  }

  return (
    <Main>
      <section className="post-details grow-and-fade-in-animation">
        <div className={`post__content${!post.image ? ' post__content--full-width' : ''}`}>
          <div className="post__heading">
            <h1>{post.title}</h1>

            <PostTimeDifference createdAt={post.createdAt} />
          </div>

          <p className="post__tags">{post.tags.map(tag => `#${tag} `)}</p>

          {post.image &&
            <div className="post__image-mobile">
              <img src={post.image} alt={post.title} />
            </div>
          }

          <p>{post.message}</p>

          <Comments initialComments={post.comments} />

          <h2>Created by: {post.author.firstName} {post.author.lastName}</h2>
        </div>
      
        {post.image &&
          <div className="post__image">
            <img src={post.image} alt={post.title} />
          </div>
        }
      </section>

      <RecommendedPosts excludedPostId={post._id} tags={post.tags} />
    </Main>
  )
}