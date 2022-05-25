import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../redux/posts';
import Post from './Post/Post';

export default function Posts() {
  const posts = useSelector(state => state.posts.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  
  const postElements = posts.map(post => {
    return <Post key={post._id} title={post.title} />
  });

  return (
    <section className="posts">
      <h2>Posts</h2>

      {postElements}
    </section>
  )
}