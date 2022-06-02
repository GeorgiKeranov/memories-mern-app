import './Main.css';

export default function Main({content, sidebar}) {
  return (
    <main className="main">
      <div className="container">
        <div className="main__columns">
          <div className="main__content">
            {content}
          </div>

          <div className="main__sidebar">
            {sidebar}
          </div>
        </div>
      </div>
    </main>
  )
}
