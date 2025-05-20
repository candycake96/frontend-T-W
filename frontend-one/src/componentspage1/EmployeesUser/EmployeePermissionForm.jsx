import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../config/apiConfig";

const EmployeePermissionForm = ({ roles, setRoles }) => {
  const [showRoles, setShowRoles] = useState([]);

  // Fetch roles from the API
  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/getroles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setShowRoles(response.data); // Set the fetched roles
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (roleId) => {
    // Check if the role is already selected
    if (roles.includes(roleId)) {
      // If selected, remove it from the array
      setRoles(roles.filter((id) => id !== roleId)); // ลบออกเมื่อ uncheck
    } else {
      // If not selected, add it to the array
      setRoles([...roles, roleId]); // เพิ่มเข้าเมื่อ check
    }
  };

  return (
    <div>
      <div className="mb-3">
        <p>สิทธิ์การใช้งาน</p>
      </div>

      <div className="mb-3">
        {showRoles.map((data) => (
          <div key={data.role_id} className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              value={data.role_id} // Set value as role_id
              onChange={() => handleCheckboxChange(data.role_id)} // Trigger the change handler
              checked={roles.includes(data.role_id)} // Mark checkbox as checked if role_id exists in roles
            />
            <label htmlFor={`checkbox-${data.role_id}`} className="form-check-label">
              {data.role_name}
            </label>
          </div>
        ))}
      </div>

      <hr className="mb-3" />
      <div className="mb-3">
        <p>สิทธิ์การเข้าถึง</p>
      </div>
      <div className="mb-3">
      <div className="row">
            <div className="col-lg-3">
              <p className="">จัดการข้อมูลพนักงาน</p>
              <div className="form-check form-check-inline">
                <input type="checkbox" name="" id="" className="form-check-input" />
                <label htmlFor="checkbox" className="form-check-label">เพิ่มข้อมูลพนักงาน</label>
              </div>
              <div className="form-check form-check-inline">
                <input type="checkbox" name="" id="" className="form-check-input" />
                <label htmlFor="checkbox" className="form-check-label">เพิ่มข้อมูลพนักงาน</label>
              </div>
              <div className="form-check form-check-inline">
                <input type="checkbox" name="" id="" className="form-check-input" />
                <label htmlFor="checkbox" className="form-check-label">เพิ่มข้อมูลพนักงาน</label>
              </div>
            </div>
          </div>
      </div>

      <hr className="mb-3" />
      <div className="">
        <div className="mb-3">
          <p>สิทธิ์ในการอนุมัติ</p>
        </div>
        <div className="mb-3">
        <div className="row">
            <div className="col-lg-3">
              <div className="form-check form-check-inline">
                <input type="checkbox" name="" id="" className="form-check-input" />
                <label htmlFor="checkbox" className="form-check-label">อนุมัติลางาน</label>
              </div>
              <div className="form-check form-check-inline">
                <input type="checkbox" name="" id="" className="form-check-input" />
                <label htmlFor="checkbox" className="form-check-label">อนุมัติซ่อมรถ 1</label>
              </div>
              <div className="form-check form-check-inline">
                <input type="checkbox" name="" id="" className="form-check-input" />
                <label htmlFor="checkbox" className="form-check-label">อนุมัติซ่อมรถ 2 </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePermissionForm;
