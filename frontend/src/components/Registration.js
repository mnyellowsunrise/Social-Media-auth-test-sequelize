import React, { useState } from 'react';
import axios from '../axios-config';

const Registration = () => {
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
    console.log('Submit button clicked'); // Add this log to check if the submit button click is detected

    try {
      // Make an HTTP POST request to the backend API for user registration
      const response = await axios.post('http://localhost:3000/auth/register', formData);

      // Handle the response, e.g., display a success message
      console.log('Registration successful', response.data);
    } catch (error) {
      // Handle registration error, e.g., display an error message
      console.error('Error during registration', error.response.data);
    }
  };

  // Add a log to check if the component is rendering
  console.log('Rendering Registration component');

  return (
    <div>
      <h2>User Registration</h2>
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
        <button type="button" onClick={handleSubmit}>Register</button>
      </form>
    </div>
  );
};

export default Registration;
