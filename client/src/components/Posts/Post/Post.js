export default function Post(props) {
  const post = props.post;

  const postIntroStyle = {
    backgroundStyle: `url(${post.image})`
  };

  return (
    <div className="post">
      <div className="post__intro" style={postIntroStyle}>
        <h4>{post.author}</h4>

        <p>{post.createdAt}</p>
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