import React, { useState } from "react";

const PM_setting = () => {

const distances = [1000, 2000, 3000, 4000];
  const maintenanceTypes = ["ถ่ายน้ำมันเครื่อง", "เปลี่ยนยาง", "อัดจาราบี"];

  // initialData[maintenanceType][distance] = true/false
  const [pmMatrix, setPmMatrix] = useState({
    "ถ่ายน้ำมันเครื่อง": { 1000: true, 2000: false, 3000: true, 4000: false },
    "เปลี่ยนยาง": { 1000: false, 2000: true, 3000: false, 4000: false },
    "อัดจาราบี": { 1000: true, 2000: true, 3000: false, 4000: true },
  });

  const toggleCheckbox = (type, km) => {
    setPmMatrix((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [km]: !prev[type][km],
      },
    }));
  };

  const handleSubmit = () => {
    console.log("PM Matrix Data:", pmMatrix);
    // 🔁 ส่งไป API หรือบันทึกลงฐานข้อมูล
  };

    return (
          <div className="container mt-4">
      <h4>ตั้งค่าตาราง PM ตามระยะ</h4>
      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>รายการ</th>
            {distances.map((km) => (
              <th key={km}>{km} กม.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {maintenanceTypes.map((type) => (
            <tr key={type}>
              <td className="text-start">{type}</td>
              {distances.map((km) => (
                <td key={km}>
                  <input
                    type="checkbox"
                    checked={pmMatrix[type][km]}
                    onChange={() => toggleCheckbox(type, km)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        บันทึกแผน PM
      </button>
    </div>
    );
};

export default PM_setting;
