import { useState } from 'react';

export default function Comments({initialComments}) {
  const [comments, setComments] = useState(initialComments);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="comments">
      {commentsJsx}
    </div>
  )
}