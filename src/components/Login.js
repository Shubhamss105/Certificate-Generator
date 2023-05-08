import { useState } from "react";
import axios from "axios";
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate=useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const { addToast } = useToasts();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      addToast("Please fill in all fields", {
        appearance: 'warning',
        autoDismiss: true,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/signin",
        { email, password },
        config
      );

      addToast("Login Successful", {
        appearance: 'success',
        autoDismiss: true,
      });
    //   localStorage.setItem("userInfo", JSON.stringify(data));
      sessionStorage.setItem("token",JSON.stringify(data.token));
    //   isUserAuthenticated(true);
      setLoading(false);
      navigate('/');
    } catch (error) {
      addToast("Error Occured! " + error.response.data.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
            <h1>Admin Login</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={submitHandler}
              disabled={loading}
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
