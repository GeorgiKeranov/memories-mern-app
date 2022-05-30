import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth';
import './Header.css';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  function logout(e) {
    e.preventDefault();
    dispatch(logoutUser());
  }

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

                {user ? (
                  <li>
                    <a href="/logout" onClick={logout}>Logout</a>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>

                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}