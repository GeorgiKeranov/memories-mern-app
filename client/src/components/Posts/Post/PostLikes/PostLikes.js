import { likePost } from '../../../../redux/posts';
import { useDispatch } from 'react-redux'

export default function PostLikes({postId, postLikes, authenticatedUser}) {
  const dispatch = useDispatch();

  let likeBtnClasses = 'btn-like';

  if (authenticatedUser) {
    const isPostLikedByCurrentUser = postLikes.includes(authenticatedUser._id);
  
    if (isPostLikedByCurrentUser) {
      likeBtnClasses += ' btn-like--liked';
    }
  }
  
  function handleLikePost() {
    dispatch(likePost(postId));
  }

  return (
    <div className="post__like">
      <p className="post__likes-count">{postLikes.length} LIKE{postLikes.length === 1 ? '' : 'S'}</p>

      <button className={likeBtnClasses} onClick={handleLikePost}>Like</button>
    </div>
  )
}