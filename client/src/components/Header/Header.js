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
      <div className="header__title">
        <h2><Link to="/">MEMORIES</Link></h2>
      </div>

      <div className="header__navigation">
        {user &&
          <div className="header__logged-user">
            <span className="header__first-name-letter">{user.firstName[0]}</span>

            <h3>{`${user.firstName} ${user.lastName}`}</h3>
          </div>
        }

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            {user ? (
              <li>
                <button className="btn-cancel" onClick={logout}>Logout</button>
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
    </header>
  );
}