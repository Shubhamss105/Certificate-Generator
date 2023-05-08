import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import UploadCsv from "./UploadCsv";
import CsvTable from "./CsvTable";
// import TemplateUpload from './TemplateUpload';
import Signup from "./components/Signup";
import Login from "./components/Login";

const PrivateRoute = ({ isAuthenticated }) => {
  const token = sessionStorage.getItem('token');
  return  token ?
    <>
      <Outlet />
    </> : <Navigate replace to='/login' />
};

const App = () => {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  // const navigate=useNavigate();

  const handleClick = () => {
    localStorage.clear("token");
    sessionStorage.clear("token");
    window.location.reload(false);
    // navigate('/');
  };

  return (
    <>
      <button onClick={handleClick}>Logout</button>
      <ToastProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<CsvTable />} />
              <Route path="/signup" element={<Signup />} />
              <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>}/>

          <Route path='/upload-data' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/upload-data' element={<UploadCsv />} />
            </Route>

              <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
      </ToastProvider>
    </>
  );
};

export default App;
