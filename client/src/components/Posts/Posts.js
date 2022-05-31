import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../redux/posts';
import './Posts.css';
import Post from './Post/Post';
import Loader from '../Loader/Loader';

export default function Posts() {
  const [posts, arePostsLoading] = useSelector(state => [state.posts.posts, state.posts.arePostsLoading]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  
  const postElements = posts.map(post => {
    return <Post key={post._id} post={post} />
  });

  return (
    <section className="posts">
      {arePostsLoading && <Loader />}

      {postElements}
    </section>
  )
}