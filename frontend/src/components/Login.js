  // Login.js
  import React, { useState } from 'react';
  import axios from '../axios-config';

  const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.post('http://localhost:3000/auth/login', formData);
        // Save the token in local storage
        localStorage.setItem('token', response.data.token);
        console.log('Login successful', response.data);
      } catch (error) {
        console.error('Error during login', error.response.data);
      }
    };
  
    // Add a log to check if the component is rendering
    console.log('Rendering Login component');
  
    return (
      <div>
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;
  