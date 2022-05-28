import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: ''
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
      <h2>Register</h2>

      <form>
        <div className="form__two-cols">
          <input type="text" name="firstName" placeholder="First Name *" onChange={handleChange} value={formData.firstName}/>

          <input type="text" name="lastName" placeholder="Last Name *" onChange={handleChange} value={formData.lastName}/>
        </div>

        <input type="email" name="email" placeholder="Email Address *" onChange={handleChange} value={formData.email}/>

        <input type="password" name="password" placeholder="Password *" onChange={handleChange} value={formData.password}/>
        
        <input type="password" name="repeatPassword" placeholder="Repeat Password *" onChange={handleChange} value={formData.repeatPassword}/>

        <button className="btn" onClick={submitForm}>Register</button>
      </form>

      <div className="form__right-aligned">
        <Link to="/login">Already have an account? Click here!</Link>
      </div>
    </div>
  )
}