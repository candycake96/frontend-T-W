import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeShowModal from '../componentspage1/EmployeesUser/modal/EmployeeShowModal';
import './NavbarTruck.css';

const NavbarPage1 = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  useEffect(() => {
    if (!user) {
      localStorage.setItem('redirectUrl', window.location.pathname); // Save current path before redirecting
      navigate('/logintruck');
    }
  }, [navigate, user]);

  useEffect(() => {
    // Check if there's a redirectUrl in localStorage when the component mounts
    const redirectUrl = localStorage.getItem('redirectUrl');
    if (redirectUrl) {
      localStorage.removeItem('redirectUrl'); // Clear the stored redirectUrl after use
      navigate(redirectUrl); // Navigate to the stored URL
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.setItem('redirectUrl', window.location.pathname); // Save current URL for redirection after logout
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/logintruck');
  };

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleOpenModal = (modalEmployee) => {
    setIsModalOpen(true);
    setSelectedEmployee(modalEmployee);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const styles = `
    .btn-outline-secondary:active, 
    .btn-outline-secondary:focus, 
    .btn-outline-secondary:hover {
        background-color: #6c757d;
        color: white;
        border-color: #6c757d;
    }

    .navbar-brand:active, 
    .navbar-brand:focus, 
    .navbar-brand:hover {
        color: #007bff !important;
        text-decoration: underline;
    }

    .navbar-brand button:active, 
    .navbar-brand button:focus, 
    .navbar-brand button:hover {
        color: #dc3545 !important;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <nav className="navbar navbar-container navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button onClick={toggleSidebar} className="btn btn-outline-secondary me-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div className="d-flex">
            <Link onClick={() => handleOpenModal(user)} className="navbar-brand custom-navbar-brand fw-bolder" role="button">
              {user.fname} {user.lname} 
              <i className="bi bi-person-fill"></i>
              {/* <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrY2_0UqAYEc1icF1aCTVxsp2o4BYq_1Nitg&s" 
        alt="icon" 
        className="rounded-circle" 
        style={{
          width: "35px",
          height: "35px",
          // borderRadius: "20%",
          objectFit: "cover"
        }}
      /> */}
            </Link>

            <div className="dropdown">
              <button
                className="navbar-brand text-Navy btn-light "
                type="button"
                id="notificationDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-bell-fill"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notificationDropdown">
                <li>
                  <span className="dropdown-header fw-bold text-primary">การแจ้งเตือน</span>
                </li>
                <li>
                  <button className="dropdown-item " onClick={() => alert("ดูแจ้งเตือน 1")}>
                    🔔 แจ้งเตือน 1
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => alert("ดูแจ้งเตือน 2")}>
                    🔔 แจ้งเตือน 2
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item text-primary" onClick={() => alert("ดูแจ้งเตือนทั้งหมด")}>
                    ดูทั้งหมด
                  </button>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="navbar-brand"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Logout"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </div>

        <EmployeeShowModal isOpen={isModalOpen} onClose={handleCloseModal} emp={selectedEmployee} />
      </nav>
    </>
  );
};

export default NavbarPage1;
