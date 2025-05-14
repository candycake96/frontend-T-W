import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SidebarTruck.css";

const SidebarPage1 = ({ isSidebarOpen, toggleSidebar }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation(); // ดึงค่า URL ปัจจุบัน

  const toggleDropdown = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <div className={`d-flex flex-column p-3 position-fixed ${isSidebarOpen ? "w-64" : "w-0"}`}
      style={{ height: "100%", zIndex: 1050, transition: "width 0.3s", overflowY: "auto" }}>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/truck" className="navbar-brand text-decoration-none fw-bolder" style={{ color: "#083b72" }}>NCL Thailand (TMS)</Link>
        <i
          onClick={toggleSidebar}
          className={`bi bi-chevron-double-left sidebar-toggle-icon ${isSidebarOpen ? "" : "collapsed"}`}
        ></i>

      </div>

      <ul className="nav flex-column mb-auto sidebar-nav">
        {/* 📌 เมนูพนักงาน */}
        <li className="nav-item">
          <Link to="/truck"
            className={`nav-link ${location.pathname === "/truck" ? "active" : ""}`}>
            <i class="bi bi-robot"></i> หน้าแรก
          </Link>
        </li>
        <li className="nav-item">
          <button onClick={() => toggleDropdown("employee")} className="nav-link">
            <i class="bi bi-person-fill-gear"></i> จัดการข้อมูลพนักงาน
          </button>
          {activeDropdown === "employee" && (
            <ul className="list-unstyled ps-4">
              <li>
                <Link to="/truck/employeesadddata"
                  className={`nav-link ${location.pathname === "/truck/employeesadddata" ? "active" : ""}`}>
                  เพิ่มข้อมูลพนักงาน
                </Link>
              </li>
              <li>
                <Link to="/truck/employeesshowtable"
                  className={`nav-link ${location.pathname === "/truck/employeesshowtable" ? "active" : ""}`}>
                  ข้อมูลพนักงาน (แก้ไข)
                </Link>
              </li>
              <li>
                <Link to="/truck/employeesresing"
                  className={`nav-link ${location.pathname === "/truck/employeesresing" ? "active" : ""}`}>
                  ข้อมูลพนักงานลาออก
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* 📌 เมนูผังองค์กร */}
        <li className="nav-item">
          <button onClick={() => toggleDropdown("organization")} className="nav-link">
            <i class="bi bi-building-fill-gear"></i> จัดการข้อมูลผังองค์กร
          </button>
          {activeDropdown === "organization" && (
            <ul className="list-unstyled ps-4">
              <li>
                <Link to="/truck/organizationmanagment"
                  className={`nav-link ${location.pathname === "/truck/organizationmanagment" ? "active" : ""}`}>
                  องค์กร / สาขา / แผนก
                </Link>
              </li>
              <li>
                <Link to="/truck/companymanagement"
                  className={`nav-link ${location.pathname === "/truck/companymanagement" ? "active" : ""}`}>
                  เพิ่มข้อมูลจัดการองค์กร
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* 📌 เมนูข้อมูลรถ */}
        <li className="nav-item">
          <button onClick={() => toggleDropdown("truck")} className="nav-link">
            <i class="bi bi-car-front-fill"></i>  ระบบจัดการข้อมูลรถ
          </button>
          {activeDropdown === "truck" && (
            <ul className="list-unstyled ps-4">
              <li>
                <Link to="/truck/vehiclemanagement"
                  className={`nav-link ${["/truck/vehiclemanagement", "/truck/vehicleaddform"].includes(location.pathname) ? "active" : ""}`}>
                  ข้อมูลรถ
                </Link>
              </li>
              <li>
                <Link to="/truck/CarTaxRenewal_Main"
                  className={`nav-link ${["/truck/CarTaxRenewal_Main"].includes(location.pathname) ? "active" : ""}`}>
                  ข้อมูลรถต่อ ภาษี
                </Link>
              </li>
              <li>
                <Link to="/truck/CarCMI_Main"
                  className={`nav-link ${["/truck/CarCMI_Main"].includes(location.pathname) ? "active" : ""}`}>
                  ข้อมูลรถต่อ พรบ.
                </Link>
              </li>
              <li>
                <Link to="/truck/CarInsurance_Main"
                  className={`nav-link ${["/truck/CarInsurance_Main" , "/truck/Insurance_Details", "/truck/insuranceDataComparison"].includes(location.pathname) ? "active" : ""}`}>
                  ข้อมูลรถต่อ ประกัน
                </Link>
              </li>
              <li>
                <Link
                  to="/truck/CarMileageShow"
                  className={`nav-link ${["/truck/CarMileageShow", "/truck/CarMileageDetails"].includes(location.pathname) ? "active" : ""}`}
                >
                  รายงานเลขไมล์รถ
                </Link>
              </li>
              <li>
                <Link
                  to="/truck/CarStopTaxRemittanc"
                  className={`nav-link ${location.pathname === "/truck/CarStopTaxRemittanc" || location.pathname.startsWith("/truck/Vehicle_status/")
                      ? "active"
                      : ""
                    }`}
                >
                  รายงานรถ ม.79/ม.89
                </Link>
              </li>
            </ul>
          )}
        </li>

                {/* 📌 เมนูข้อมูลรถ */}
                <li className="nav-item">
          <button onClick={() => toggleDropdown("vender")} className="nav-link">
          <i class="bi bi-handbag-fill"></i> ผู้จำหน่ายสินค้า/อู่ซ่อม
          </button>
          {activeDropdown === "vender" && (
            <ul className="list-unstyled ps-4">
              <li>
                <Link to="/truck/Vendor"
                  className={`nav-link ${["/truck/Vendor", "/truck/VendorInfo", "/truck/Vendor_add"].includes(location.pathname) ? "active" : ""}`}>
                  ผู้จำหน่ายสินค้า/อู่ซ่อม
                </Link>
              </li>
              <li>
                <Link to="/truck/Vehicle_parts_details"
                  className={`nav-link ${["/truck/Vehicle_parts_details", "/truck/2"].includes(location.pathname) ? "active" : ""}`}>
                  ราคากลางอะไหล่รถ
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* 📌 เมนูข้อมูลรถ */}
        <li className="nav-item">
          <button onClick={() => toggleDropdown("CaeRepai")} className="nav-link">
            <i class="bi bi-tools"></i>  ระบบแจ้งซ่อมรถ
          </button>
          {activeDropdown === "CaeRepai" && (
            <ul className="list-unstyled ps-4">
              <li>
                <Link to="/truck/MainternanceRequest"
                  className={`nav-link ${["/truck/MainternanceRequest", "/truck/RepairRequestForm", "/truck/2"].includes(location.pathname) ? "active" : ""}`}>
                  แจ้งซ่อม / งานซ่อม
                </Link>
              </li>
              <li>
                <Link to="/truck/CarMainRepair"
                  className={`nav-link ${["/truck/1"].includes(location.pathname) ? "active" : ""}`}>
                  ตรวจสอบความพร้อม
                </Link>
              </li>
              <li>
                <Link to="/truck/CarMainRepair"
                  className={`nav-link ${["/truck/2"].includes(location.pathname) ? "active" : ""}`}>
                  วิเคราะห์แผนซ่อมบำรุง
                </Link>
              </li>
              <li>
                <Link to="/truck/CarMainRepair"
                  className={`nav-link ${["/truck/3"].includes(location.pathname) ? "active" : ""}`}>
                  ตรวจสอบแผนซ่อมบำรุง
                </Link>
              </li>
              <li>
                <Link to="/truck/CarMainRepair"
                  className={`nav-link ${["/truck/3"].includes(location.pathname) ? "active" : ""}`}>
                  อนุมัติงานซ่อมบำรุง
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* 📌 เมนูข้อมูลคนขับ */}
        <li className="nav-item">
          <button onClick={() => toggleDropdown("driver")} className="nav-link">
            <i class="bi bi-person-vcard-fill"></i> ระบบจัดการข้อมูลคนขับ
          </button>
          {activeDropdown === "driver" && (
            <ul className="list-unstyled ps-4">
              <li>
                <Link to="/truck/driverๅ"
                  className={`nav-link ${location.pathname === "/truck/driver" ? "active" : ""}`}>
                  ข้อมูลคนขับ
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SidebarPage1;
