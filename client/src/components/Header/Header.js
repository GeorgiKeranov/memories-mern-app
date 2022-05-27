import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__title">
          <h2>MEMORIES</h2>
        </div>

        <div className="header__navigation">
          <nav>
            <ul>
              <Link to="/">Home</Link>

              <Link to="/register">Register</Link>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}