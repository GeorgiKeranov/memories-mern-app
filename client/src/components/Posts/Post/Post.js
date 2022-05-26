import './Post.css';

export default function Post(props) {
  const post = props.post;

  const postIntroStyle = {
    backgroundImage: `url(${post.image})`
  };

  let timeDifference = (new Date() - new Date(post.createdAt)) / 1000 / 60;
  let timeDifferenceString = 'minute';
  if (timeDifference >= 60) {
    timeDifference /= 60;
    timeDifferenceString = 'hour';

    if (timeDifference >= 24) {
      timeDifference /= 24;
      timeDifferenceString = 'day';
    }
  }

  timeDifference = Math.round(timeDifference);

  return (
    <div className="post">
      <div className="post__intro" style={postIntroStyle}>
        <div className="post__heading">
          <h4>{post.creator}</h4>

          <p>{timeDifference} {timeDifferenceString}{timeDifference > 1 ? 's' : ''} ago</p>
        </div>
      </div>

      <div className="post__details">
        <p className="post__tags">{post.tags.map(tag => `#${tag} `)}</p>

        <h3>{post.title}</h3>

        <p>{post.message}</p>

        <div className="post__actions">
          <div className="post__like">
            <p className="post__likes-count">{post.likeCount} LIKE{post.likeCount === 1 ? '' : 'S'}</p>

            <button className="btn-like">Like</button>
          </div>
        </div>
      </div>
    </div>
  )
}