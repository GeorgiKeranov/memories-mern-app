import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Comments.css';
import { commentOnPost, removePostComment } from '../../../api/posts';
import Loader from '../../Loader/Loader';

export default function Comments({postId, initialComments}) {
  const authenticatedUser = useSelector(state => state.auth.user);
  const [comments, setComments] = useState(initialComments);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    setComments(initialComments);
  }, [postId, initialComments]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!comment) {
      return;
    }
    
    setIsLoading(true);
    
    const newComments = await commentOnPost({postId, comment});

    if (newComments) {
      setComments(newComments);
      setComment('');
    }

    setIsLoading(false);
  }

  async function removeComment(commentId) {
    setIsLoading(true);

    const commentsData = await removePostComment({postId, commentId});

    if (commentsData) {
      setComments(commentsData);
    }

    setIsLoading(false);
  }

  if (isLoading) {
    return <Loader />
  }

  const commentsJsx = comments.map(comment => {
    return (
    <div className="comment" key={comment._id}>
      <div className="comment__image">
        <div className="comment__first-letter">{comment.author.firstName[0]}</div>
      </div>

      <div className="comment__content">
        <div className="comment__actions">
          <h4>{comment.author.firstName} {comment.author.lastName}</h4>

          {(authenticatedUser && authenticatedUser._id === comment.author._id) &&
            <button className="btn-action btn-action--remove" onClick={() => removeComment(comment._id)}></button>
          }
        </div>

        <p>{comment.comment}</p>
      </div>
    </div>
    );
  });

  return (
    <div className="comments">
      {commentsJsx}

      {authenticatedUser &&
        <form className="comment-form" onSubmit={handleSubmit}>
          <div className="comment__image">
            <div className="comment__first-letter">{authenticatedUser.firstName[0]}</div>
          </div>

          <div className="comment__actions">
            <input type="text" name="comment" placeholder="Type a comment" onChange={(e) => setComment(e.target.value)} value={comment} />

            <button className="btn" type="submit">Comment</button>
          </div>
        </form>
      }
    </div>
  )
}