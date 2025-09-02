import React, { useEffect, useState } from "react";
import Status_Mainternance from "./Status_Mainternance/Status_Mainternance";
import MainternanceApprover_mgr_add from "./MainternanceApprover_mgr_add";

const MainternanceApprover_mgr_main = ({ maintenanceJob }) => {
  const [hasAnalysis, setHasAnalysis] = useState(false);
  const [dataAnanlysis, setDataAnanlysis] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  // ตรวจ permission
  const hasPermission = (code) => {
    return Array.isArray(user?.permission_codes) && user.permission_codes.includes(code);
  };

  // -------- Logic การแสดงผล --------
   // ✅ สถานะ "อนุมัติตรวจเช็ครถ"
if (maintenanceJob?.status === "อนุมัติตรวจเช็ครถ") {
  if (hasPermission("MANAGER_APPROVE_REPAIR")) {
    // ผู้มีสิทธิ์ → เห็น Add เสมอ (ถ้ามีข้อมูลแล้วก็ส่ง data, ถ้าไม่มีส่ง null)
    return (
      <MainternanceApprover_mgr_add
        maintenanceJob={maintenanceJob}
        data={dataAnanlysis}
        hasPermission={hasPermission}
        onSaved={(newData) => {
          setDataAnanlysis(newData);
          setHasAnalysis(true);
        }}
      />
    );
  } else {
    // คนอื่นที่ไม่มีสิทธิ์ → ยังเห็น Status อย่างเดียว
    return <Status_Mainternance requestID={maintenanceJob} />;
  }
}

  if (
    maintenanceJob?.status === "แจ้งซ่อม" ||
    maintenanceJob?.status === "จัดรถ" ||
    maintenanceJob?.status === "ตรวจเช็ครถ"
  ) {
    // สถานะกลุ่มแรก → แสดง Status อย่างเดียว
    return <Status_Mainternance requestID={maintenanceJob} />;
  }

};

export default MainternanceApprover_mgr_main;
