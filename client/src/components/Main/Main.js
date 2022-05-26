import './Main.css';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

export default function Main() {
  return (
    <main className="main">
      <div className="container">
        <div className="main__columns">
          <div className="main__content">
            <Posts />
          </div>

          <div className="main__sidebar">
            <Form />
          </div>
        </div>
      </div>
    </main>
  )
}
