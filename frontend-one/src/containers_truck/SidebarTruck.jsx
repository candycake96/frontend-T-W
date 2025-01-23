import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SidebarPage1 = ({ isSidebarOpen, toggleSidebar }) => {


  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const [isDropdownOpen2, setDropdownOpen2] = useState(false);
  const toggleDropdown2 = () => setDropdownOpen2(!isDropdownOpen2);

  const [isDropdownOpen3, setDropdownOpen3] = useState(false);
  const truckDropdownOpen = () => setDropdownOpen3(!isDropdownOpen3);

  const [isDropdownOpen4, setDropdownOpen4] = useState(false);
  const driverDropdownOpen = () => setDropdownOpen4(!isDropdownOpen4);

  const [user, setUser] = useState(null);
  useEffect(() => {
    // ดึงข้อมูลผู้ใช้จาก localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData)); // แปลง JSON เป็น Object แล้วเก็บใน state
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className={`d-flex flex-column p-3 position-fixed ${isSidebarOpen ? "w-64" : "w-0"
        }`}
      style={{
        height: "100%",
        zIndex: 1050,
        transition: "width 0.3s",
        overflowY: "auto", // เพิ่มคุณสมบัตินี้เพื่อให้ Sidebar เลื่อนตามเมื่อเนื้อหายาวเกิน
        // backgroundColor: "#343a40", // หรือพื้นหลังสี
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/" className="navbar-brand text-decoration-none">
          NCL Thailand (TMS)
        </Link>
        <button onClick={toggleSidebar} className="btn btn-link">
          {/* <i class="bi bi-x-lg"></i> */}
          <i className="bi bi-chevron-double-left"></i>
        </button>
      </div>
      <ul className="nav flex-column mb-auto">




        {/* IT จัดการข้อมูลทั้งหมด */}
        <>


          <li className="nav-item">
            <a
              onClick={toggleDropdown}
              className="nav-link text-dark hover:text-primary d-flex justify-content-between align-items-center"
              style={{
                cursor: "pointer",
                transition: "background-color 0.3s, color 0.3s",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                textDecoration: "none",

              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f0f0";
                e.currentTarget.style.color = "#007bff"; // Change text color on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#343a40"; // Reset text color
              }}
            >
              จัดการข้อมูลพนักงาน
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`bi ${isDropdownOpen ? "bi-chevron-up" : "bi-chevron-down"
                    }`}
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 10.5a.5.5 0 0 1 .75.5h8a.5.5 0 0 1 .75-.5L8 6.5 3.5 10.5z" />
                </svg>
              </span>
            </a>
            {isDropdownOpen && (
              <ul className="list-unstyled ps-4">
                <li>
                  <Link
                    to="/truck/employeesadddata"
                    className="nav-link text-dark hover:text-primary"
                  >
                    เพิ่มข้อมูลพนักงาน
                  </Link>
                </li>
                <hr />
                <li>
                  <Link
                    to="/truck/employeesshowtable"
                    className="nav-link text-dark hover:text-primary"
                  >
                    ข้อมูลพนักงาน (แก้ไข)
                  </Link>
                </li>
                <li>
                  <Link
                    to="/truck/employeesresing"
                    className="nav-link text-dark hover:text-primary"
                  >
                    ข้อมูลพนักงานลาออก
                  </Link>
                </li>
                {/* <li>
                <Link
                  to="/employee/option4"
                  className="nav-link text-dark hover:text-primary"
                >
                  เก็บชั่วโมงการฝึกอบรม
                </Link>
              </li> */}
              </ul>
            )}
          </li>

          <li className="nav-item">
            <a
              onClick={toggleDropdown2}
              className="nav-link text-dark hover:text-primary d-flex justify-content-between align-items-center"
              style={{
                cursor: "pointer",
                transition: "background-color 0.3s, color 0.3s",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f0f0";
                e.currentTarget.style.color = "#007bff"; // Change text color on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#343a40"; // Reset text color
              }}
            >
              จัดการข้อมูลผังองค์กร
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`bi ${isDropdownOpen2 ? "bi-chevron-up" : "bi-chevron-down"
                    }`}
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 10.5a.5.5 0 0 1 .75.5h8a.5.5 0 0 1 .75-.5L8 6.5 3.5 10.5z" />
                </svg>
              </span>
            </a>
            {isDropdownOpen2 && (
              <ul className="list-unstyled ps-4">
                <li>
                  <Link
                    to="/truck/organizationmanagment"
                    className="nav-link text-dark hover:text-primary"
                  >
                    องค์กร / สาขา / แผนก 
                  </Link>
                </li>
                <li>
                  <Link
                    to="/page1/JobPosition"
                    className="nav-link text-dark hover:text-primary"
                  >
                    เพิ่มข้อมูลจัดการองค์กร
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/page1/JobPosition"
                    className="nav-link text-dark hover:text-primary"
                  >
                    ตำแหน่งพนักงาน
                  </Link>
                </li>
                <li>
                  <Link
                    to="/page1/Department"
                    className="nav-link text-dark hover:text-primary"
                  >
                    ฝ่ายงาน
                  </Link>
                </li>
                <li>
                  <Link
                    to="/page1/jobsection"
                    className="nav-link text-dark hover:text-primary"
                  >
                    แผนก
                  </Link>
                </li>
                <li>
                  <Link
                    to="/page1/branch"
                    className="nav-link text-dark hover:text-primary"
                  >
                    สาขา
                  </Link>
                </li> */}

              </ul>
            )}
          </li>

        </>


        <li className="nav-item">
          <a
            onClick={truckDropdownOpen}
            className="nav-link text-dark hover:text-primary d-flex justify-content-between align-items-center"
            style={{
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0";
              e.currentTarget.style.color = "#007bff"; // Change text color on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#343a40"; // Reset text color
            }}
          >
            ระบบจัดการข้อมูลรถ  
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi ${isDropdownOpen3 ? "bi-chevron-up" : "bi-chevron-down"
                  }`}
                viewBox="0 0 16 16"
              >
                <path d="M3.5 10.5a.5.5 0 0 1 .75.5h8a.5.5 0 0 1 .75-.5L8 6.5 3.5 10.5z" />
              </svg>
            </span>
          </a>
          {isDropdownOpen3 && (
            <ul className="list-unstyled ps-4">
              <li>
                <Link
                  to="/truck/vehiclemanagement"
                  className="nav-link text-dark hover:text-primary"
                >
                  ข้อมูลรถ
                </Link>
              </li>
              <li>
                <Link
                  to="/page1/Department"
                  className="nav-link text-dark hover:text-primary"
                >
                  รถที่ถึงกำหนดต่อทะเบียน
                </Link>
              </li>
            </ul>
          )}
        </li>


        <li className="nav-item">
          <a
            onClick={driverDropdownOpen}
            className="nav-link text-dark hover:text-primary d-flex justify-content-between align-items-center"
            style={{
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0";
              e.currentTarget.style.color = "#007bff"; // Change text color on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#343a40"; // Reset text color
            }}
          >
            เกี่ยวกับพนักงานขับรถ
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi ${isDropdownOpen4 ? "bi-chevron-up" : "bi-chevron-down"
                  }`}
                viewBox="0 0 16 16"
              >
                <path d="M3.5 10.5a.5.5 0 0 1 .75.5h8a.5.5 0 0 1 .75-.5L8 6.5 3.5 10.5z" />
              </svg>
            </span>
          </a>
          {isDropdownOpen4 && (
            <ul className="list-unstyled ps-4">
              <li>
                <Link
                  to="/truck/driver"
                  className="nav-link text-dark hover:text-primary"
                >
                  ประวัติพนักงานขับรถ
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/page1/Department"
                  className="nav-link text-dark hover:text-primary"
                >
                  ข้อมูลใบขับขี่ของพนักงานขับรถ
                </Link>
              </li> */}
            </ul>
          )}
        </li>


        <li className="nav-item">
          <Link
            to="/contacts"
            className="nav-link text-dark hover:text-primary"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              transition: "background-color 0.3s, color 0.3s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0";
              e.currentTarget.style.color = "#007bff"; // Change text color on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#343a40"; // Reset text color
            }}
          >
            <i class="bi bi-wrench-adjustable"></i> แจ้งซ่อมรถ
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarPage1;
