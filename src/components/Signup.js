import axios from "axios";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { addToast } = useToasts();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [password, setPassword] = useState("");


  const submitHandler = async () => {
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
    console.log(name, email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/signup",
        {
          name,
          email,
          password,
          password_confirmation
        },
        config
      );
      console.log(data);
      addToast("Registration Successful", {
        appearance: "success",
        autoDismiss: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate('/login')
    } catch (error) {
      addToast("Error Occurred! " + error.response.data.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };



  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
            <h1>Admin Sign Up</h1>
            <div className="mb-3">
    <label for="first-name" className="form-label">Name</label>
    <input type="text" className="form-control" id="first-name" placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label for="email" className="form-label">Email Address</label>
    <input type="email" className="form-control" id="email" placeholder="Enter Your Email Address" onChange={(e) => setEmail(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label for="password" className="form-label">Password</label>
    <div className="input-group">
      <input type="password" className="form-control" id="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required/>
      <button className="btn btn-outline-secondary" type="button" id="password-toggle">Show</button>
    </div>
  </div>
  <div className="mb-3">
    <label for="confirm-password" className="form-label">Confirm Password</label>
    <div className="input-group">
      <input type="password" className="form-control" id="confirm-password" placeholder="Confirm password" onChange={(e) => setpassword_confirmation(e.target.value)} required/>
      <button className="btn btn-outline-secondary" type="button" id="confirm-password-toggle" onClick={handleClick}>Show</button>
    </div>
  </div>
  <button type="submit" className="btn btn-primary mt-2 w-100" onClick={submitHandler}>Sign Up</button>
            </div>

        </div>
</div>

  );
};

export default Signup;