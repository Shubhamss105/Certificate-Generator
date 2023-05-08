import React, { useState } from 'react';
import { useToasts } from "react-toast-notifications";
// import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const { addToast } = useToasts();

  const { name, email, password, password_confirmation } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !password_confirmation) {
      addToast("Please Fill all the Fields", {
        appearance: "warning",
        autoDismiss: true,
      });
      return;
    }
    if (password !== password_confirmation) {
      addToast("Passwords Do Not Match", {
        appearance: "warning",
        autoDismiss: true,
      });
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/signup', formData);
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={name} onChange={handleChange} />

      <label>Email:</label>
      <input type="email" name="email" value={email} onChange={handleChange} />

      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />

      <label>Confirm Password:</label>
      <input
        type="password"
        name="password_confirmation"
        value={password_confirmation}
        onChange={handleChange}
      />

      <button type="submit">Signup</button>
    </form>
  );
};

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/signin', formData);
      localStorage.setItem('token', res.data.token);
      console.log(res.data.message);
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" name="email" value={email} onChange={handleChange} />

      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />

      <button type="submit">Signin</button>
    </form>
  );
};

export default function Authentication() {
  return (
    <div>
      <h1>Signup</h1>
      <Signup />

      <h1>Signin</h1>
      <Signin />
    </div>
  );
}

