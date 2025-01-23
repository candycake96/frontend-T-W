import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeShowModal from '../componentspage1/EmployeesUser/modal/EmployeeShowModal';

const NavbarPage1 = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  useEffect(() => {
    if (!user) {
      navigate('/loginpage');
    }

    // Import Bootstrap if needed
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then(() => {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl));
    });

  }, [navigate, user]);

  const handleLogout = () => {
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
          <Link onClick={() => handleOpenModal(user)} className="navbar-brand" role="button">
            {user.fname} {user.lname} <i className="bi bi-person-fill"></i>
          </Link>
          <button
            type="button"
            className="navbar-brand"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Logout"
            onClick={handleLogout}>
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
