import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__columns">
          <div className="header__title">
            <h2>MEMORIES</h2>
          </div>

          <div className="header__navigation">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}