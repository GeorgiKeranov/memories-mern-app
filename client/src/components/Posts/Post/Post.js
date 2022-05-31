import { useDispatch, useSelector } from 'react-redux';
import { setPostToEdit, removePost } from '../../../redux/posts';
import './Post.css';
import PostTimeDifference from './PostTimeDifference/PostTimeDifference';
import PostLikes from './PostLikes/PostLikes';

export default function Post({post}) {
  const dispatch = useDispatch();
  const authenticatedUser = useSelector(state => state.auth.user);
  
  let isAuthor = false;
  if (authenticatedUser) {
    isAuthor = post.author._id === authenticatedUser._id;
  }

  const postIntroStyle = { backgroundImage: `url(${post.image})` };

  function handleEditPost() {
    dispatch(setPostToEdit(post));
  }

  function handlePostRemove() {
    dispatch(removePost(post._id));
  }

  return (
    <div className="post">
      <div className="post__intro" style={postIntroStyle}>
        <div className="post__heading">
          <h4>{post.author.firstName} {post.author.lastName}</h4>

          <PostTimeDifference createdAt={post.createdAt} />
        </div>

        {isAuthor &&
          <div className="post__edit">
            <button className="btn-action btn-action--edit" onClick={handleEditPost}>EDIT</button>
          </div>
        }
      </div>

      <div className="post__details">
        <p className="post__tags">{post.tags.map(tag => `#${tag} `)}</p>

        <h3>{post.title}</h3>

        <p>{post.message}</p>

        <div className="post__actions">
          <PostLikes postId={post._id} postLikes={post.likes} authenticatedUser={authenticatedUser} />

          {isAuthor &&
            <div className="post__remove">
              <button className="btn-action btn-action--remove" onClick={handlePostRemove}>REMOVE</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}