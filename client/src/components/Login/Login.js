import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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

    console.log(formData);
  }

  return (
    <div className="form form--authenticate">
      <h2>Login</h2>

      <form>
        <input type="email" name="email" placeholder="Email Address *" onChange={handleChange} value={formData.email}/>

        <input type="password" name="password" placeholder="Password *" onChange={handleChange} value={formData.password}/>
        
        <button className="btn" onClick={submitForm}>Login</button>
      </form>

      <div className="form__right-aligned">
        <Link to="/register">Don't have an account? Click here!</Link>
      </div>
    </div>
  )
}