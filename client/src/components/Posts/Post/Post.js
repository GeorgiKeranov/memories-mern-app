export default function Post(props) {
  const post = props.post;

  const postIntroStyle = {
    backgroundImage: `url(${post.image})`
  };

  let timeDifference = (new Date() - new Date(post.createdAt)) / 1000 / 60;
  let timeDifferenceString = `${Math.round(timeDifference)} minutes ago`;
  if (timeDifference >= 60) {
    timeDifference /= 60;
    timeDifferenceString = `${Math.round(timeDifference)} hours ago`;

    if (timeDifference >= 24) {
      timeDifference /= 24;
      timeDifferenceString = `${Math.round(timeDifference)} days ago`;
    }
  }

  return (
    <div className="post">
      <div className="post__intro" style={postIntroStyle}>
        <h4>{post.creator}</h4>

        <p>{timeDifferenceString}</p>
      </div>

      <div className="post__details">
        <p className="post__tags">{post.tags.map(tag => `#${tag} `)}</p>

        <h3>{post.title}</h3>

        <p>{post.message}</p>
      </div>

      <div className="post__actions">
        <div className="post__like">
          <button className="btn-like">Like</button>

          <p className="post__likes-count">{post.likeCount} LIKE{post.likeCount > 1 ? 'S' : ''}</p>
        </div>
      </div>
    </div>
  )
}