export default function MainColumns({content, sidebar}) {
  return (
    <div className="main__columns">
      <div className="main__content">
        {content}
      </div>

      <div className="main__sidebar">
        {sidebar}
      </div>
    </div>
  )
}