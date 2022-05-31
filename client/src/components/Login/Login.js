import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetErrorMessage } from '../../redux/auth';
import Loader from '../Loader/Loader';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, errorMessage, isLoading] = useSelector(state => {
    return [
      state.auth.user,
      state.auth.errorMessage,
      state.auth.isLoading
    ];
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // When user is authenticated to the redux store redirect to home page
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // On component unmount clear the auth.errorMessage from redux store
  useEffect(() => {
    return () => {
      dispatch(resetErrorMessage());
    };
  }, [dispatch]);

  function handleChange(event) {
    const element = event.target;

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [element.name]: element.value
      };
    });
  }

  function submitForm(event) {
    event.preventDefault();

    dispatch(loginUser(formData));
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="form form--authenticate grow-and-fade-in-animation">
      <h2>Login</h2>

      <form onSubmit={submitForm}>
        <input type="email" name="email" placeholder="Email Address *" required onChange={handleChange} value={formData.email}/>

        <input type="password" name="password" placeholder="Password *" required onChange={handleChange} value={formData.password}/>
        
        {errorMessage && <p className="form__error-message">{errorMessage}</p>}

        <button className="btn" type="submit">Login</button>
      </form>

      <div className="form__right-aligned">
        <Link to="/register">Don't have an account? Click here!</Link>
      </div>
    </div>
  )
}