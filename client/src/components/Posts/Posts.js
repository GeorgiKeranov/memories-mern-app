import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../redux/posts';
import Post from './Post/Post';
import Loader from '../Loader/Loader';

export default function Posts() {
  const [posts, isLoading] = useSelector(state => [state.posts.value, state.posts.isLoading]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  
  const postElements = posts.map(post => {
    return <Post key={post._id} post={post} />
  });

  return (
    <section className="posts">
      <h2>Posts</h2>

      {isLoading && <Loader />}

      {postElements}
    </section>
  )
}