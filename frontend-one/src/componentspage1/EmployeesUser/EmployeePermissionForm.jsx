import axios from "axios";
import React, { useEffect, useState } from "react";

const EmployeePermissionForm = ({ roles, setRoles }) => {
  const [showRoles, setShowRoles] = useState([]);

  // Fetch roles from the API
  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:3333/api/getroles", {
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
        <p>...</p>
      </div>
      <div className="">

      </div>
    </div>
  );
};

export default EmployeePermissionForm;
