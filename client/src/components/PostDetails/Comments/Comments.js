import { useState } from 'react';
import { useSelector } from 'react-redux';
import './Comments.css';

export default function Comments({initialComments}) {
  const user = useSelector(state => state.auth.user);
  const [comments, setComments] = useState(initialComments);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState('');

  const commentsJsx = comments.map((comment, index) => {
    return (
    <div className="comment" key={index}>
      <div className="comment__image">
        <div className="comment__first-letter">{comment.author.firstName[0]}</div>
      </div>

      <div className="comment__content">
        <h4>{comment.author.firstName} {comment.author.lastName}</h4>

        <p>{comment.comment}</p>
      </div>
    </div>
    );
  });

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="comments">
      {commentsJsx}

      {user &&
        <form className="comment-form" onSubmit={handleSubmit}>
          <div className="comment__image">
            <div className="comment__first-letter">{user.firstName[0]}</div>
          </div>

          <div className="comment__actions">
            <input type="text" name="comment" placeholder="Type a comment" value={comment} />

            <button className="btn" type="submit">Comment</button>
          </div>
        </form>
      }
    </div>
  )
}