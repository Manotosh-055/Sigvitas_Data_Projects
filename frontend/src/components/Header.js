import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

export const Header = () => {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('userInfo'));


  const logout = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };


  return (
    <header className="navbar-header">
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/home">Data Dashboard</Link>
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/add">Add Data</Link>
            </li>

            <li>
              <Link to="/search" className="btn btn-main">
                + Search
              </Link>
            </li>
          </ul>
          <div className="d-flex gap-3 align-items-center dropdown">
            <div className="d-flex gap-2 align-items-center dropdown">
              <div>
                <img width={35} height={35} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-fMXEWyzl7MNd3Q15JOeyzHxasfVIHK6K_A&usqp=CAU" className='im' alt="" />
              </div>
              <div style={{ color: "white" }} role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                <p className='mb-0' style={{ color: "white" }}>{user?.name}</p>
                <p className='mb-0'>{user?.email}</p>
              </div>
            </div>
            <div><button onClick={logout} type="button" className="btn btn-outline-danger">Logout</button></div>
          </div>

        </div>
      </div>
    </header>
  );
};
