import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange() {

  }

  return (
    <div class='form form--authenticate'>
      <h2>Login</h2>

      <form>
        <input type="email" name="email" placeholder="Email Address *" onChange={handleChange} value={formData.email}/>

        <input type="password" name="password" placeholder="Password *" onChange={handleChange} value={formData.password}/>
        
        <button class="btn">Login</button>
      </form>

      <div className="form__right-aligned">
        <Link to="/register">Don't have an account? Click here!</Link>
      </div>
    </div>
  )
}