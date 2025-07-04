import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
  username: '',
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  age: '',
  phone: '',
  start_date: '',
  end_date: '',
  school: '',
});


  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
      setSuccess(response.data.message || 'Registration successful!');
      console.log(formData)
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
     <input name="username" placeholder="Username" onChange={handleChange} />
<input name="email" type="email" placeholder="Email" onChange={handleChange} />
<input name="password" type="password" placeholder="Password" onChange={handleChange} />
<input name="first_name" placeholder="First Name" onChange={handleChange} />
<input name="last_name" placeholder="Last Name" onChange={handleChange} />
<input name="age" type="number" placeholder="Age" onChange={handleChange} />
<input name="phone" placeholder="Phone Number" onChange={handleChange} />
<input name="start_date" type="date" placeholder="Join Year" onChange={handleChange} />
<input name="end_date" type="date" placeholder="Pass Year" onChange={handleChange} />
<input name="school" placeholder="School" onChange={handleChange} />

      <button type="submit">Register</button>

      {/* Feedback */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default RegisterForm;
