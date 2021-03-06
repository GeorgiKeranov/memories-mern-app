import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFormDataInEditMode, removePost } from '../../redux/posts';
import './Post.css';
import PostTimeDifference from '../PostTimeDifference/PostTimeDifference';
import PostLikes from './PostLikes/PostLikes';

export default function Post({post, disableButtons}) {
  const dispatch = useDispatch();
  const authenticatedUser = useSelector(state => state.auth.user);
  
  let isAuthor = false;
  if (authenticatedUser) {
    isAuthor = post.author._id === authenticatedUser._id;
  }

  const postIntroStyle = { backgroundImage: `url(${post.image})` };

  function handleEditPost() {
    dispatch(setFormDataInEditMode(post));
  }

  function handlePostRemove() {
    dispatch(removePost(post._id));
  }

  const postLinkJsx = <Link className="post__link" to={`/posts/${post._id}`}></Link>;

  return (
    <div className={`post${disableButtons ? ' post--no-buttons' : ''}`}>
      <div className="post__intro" style={postIntroStyle}>
        <div className="post__heading">
          <h4>{post.author.firstName} {post.author.lastName}</h4>

          <PostTimeDifference createdAt={post.createdAt} />
        </div>

        {postLinkJsx}

        {(!disableButtons && isAuthor) &&
          <div className="post__edit">
            <button className="btn-action btn-action--edit" onClick={handleEditPost}>EDIT</button>
          </div>
        }
      </div>

      <div className="post__details">
        <p className="post__tags">{post.tags.map(tag => `#${tag} `)}</p>

        <h3>{post.title}</h3>

        <p className="post__description">{post.message}</p>

        {postLinkJsx}
        
        {!disableButtons &&
          <div className="post__actions">
            <PostLikes postId={post._id} postLikes={post.likes} authenticatedUser={authenticatedUser} />

            {isAuthor &&
              <div className="post__remove">
                <button className="btn-action btn-action--remove" onClick={handlePostRemove}>REMOVE</button>
              </div>
            }
          </div>
        }
      </div>
    </div>
  )
}