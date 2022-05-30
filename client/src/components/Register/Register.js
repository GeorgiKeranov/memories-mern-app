import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetErrorMessage, setErrorMessage } from '../../redux/auth';
import Loader from '../Loader/Loader';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, errorMessage, isLoading] = useSelector(state => [state.auth.user, state.auth.errorMessage, state.auth.isLoading]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  // On component unmount clear the auth.errorMessage from redux store
  useEffect(() => {
    return () => {
      dispatch(resetErrorMessage());
    };
  }, [dispatch]);

  // When user is registered and saved in redux store redirect to home page
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate])

  function handleChange(event) {
    const element = event.target;

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [element.name]: element.value
      };
    });
  }

  async function submitForm(event) {
    event.preventDefault();

    // Validate if password and repeat password are the same
    if (formData.password !== formData.repeatPassword) {
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          password: '',
          repeatPassword: ''
        }
      });

      return dispatch(setErrorMessage('Passwords don\'t match!'));
    }

    const formDataNoRepeatPass = {...formData};
    delete formDataNoRepeatPass.repeatPassword;

    dispatch(registerUser(formDataNoRepeatPass));
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="form form--authenticate">
      <h2>Register</h2>

      <form onSubmit={submitForm}>
        <div className="form__two-cols">
          <input type="text" name="firstName" placeholder="First Name *" required onChange={handleChange} value={formData.firstName}/>

          <input type="text" name="lastName" placeholder="Last Name *" required onChange={handleChange} value={formData.lastName}/>
        </div>

        <input type="email" name="email" placeholder="Email Address *" required onChange={handleChange} value={formData.email}/>

        <input type="password" name="password" autoComplete="aus" placeholder="Password *" required minLength="8" onChange={handleChange} value={formData.password}/>
        
        <input type="password" name="repeatPassword" placeholder="Repeat Password *" required minLength="8" onChange={handleChange} value={formData.repeatPassword}/>

        {errorMessage && <p className="form__error-message">{errorMessage}</p>}

        <button className="btn" type="submit">Register</button>
      </form>

      <div className="form__right-aligned">
        <Link to="/login">Already have an account? Click here!</Link>
      </div>
    </div>
  )
}