import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement('#root'); // หรือใช้ ID ของ element หลักของแอป

const Driver_relation_management = ({ isOpen, onClose, dataVehicle, onSuccess }) => {
  const [user, setUser] = useState(null);
  const [empCode, setEmpCode] = useState([]);
  const [isFetched, setIsFetched] = useState(false); // เช็คว่ากดปุ่มตรวจสอบหรือยัง
  const [dataRelation, setDataRelation] = useState({
    reg_id: "",
    emp_code: "",
    assigned_date: "",
    notes: "",
    assigned_by: "" // กำหนดค่าเริ่มต้นเป็นค่าว่าง
  });

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้จาก localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // อัปเดตค่า assigned_by เมื่อ user ถูกโหลด
      setDataRelation(prevState => ({
        ...prevState,
        assigned_by: `${parsedUser.fname} ${parsedUser.lname}`
      }));
    }
  }, []);

  useEffect(() => {
    if (dataVehicle?.reg_id) {
      setDataRelation(prevState => ({
        ...prevState,
        reg_id: dataVehicle.reg_id
      }));
    }
  }, [dataVehicle]);

  useEffect(() => {
    setDataRelation(prevState => ({
      ...prevState,
      assigned_date: new Date().toISOString().split("T")[0]
    }));
  }, []);


  const fetchEmpCod = async () => {
    const isCodeID = dataRelation.emp_code;
    if (!isCodeID) return; // ถ้าไม่มีรหัสพนักงาน ไม่ต้องทำงาน

    try {
      const response = await axios.get(
        `http://localhost:3333/api/getemployeeshowcode/${isCodeID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setEmpCode(response.data);
      setIsFetched(true); // ตั้งค่าให้รู้ว่ามีการกดปุ่มแล้ว
    } catch (error) {
      console.error("Error fetching employee details:", error);
      setEmpCode([]); // กรณีเกิด error ให้เป็น array ว่าง
      setIsFetched(true);
    }
  };

  const handleSubmitAddEmpRelation = async (e) => {
    e.preventDefault();
    console.log("📌 Data before sending:", dataRelation);
  
    if (!dataRelation.emp_code || !dataRelation.reg_id) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:3333/api/add_driver_relation`,
        dataRelation,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
  
      console.log("✅ Response:", response.data);
      alert("บันทึกข้อมูลสำเร็จ!");
  

        onSuccess(); // โหลดข้อมูลใหม่
   
  
      onClose(); // ปิดโมดอล
    } catch (error) {
      console.error("❌ Error saving data:", error);
      console.log("🚨 Server Response:", error.response?.data);
      alert(error.response?.data?.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };
  


  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false} // You can also disable if needed
      contentLabel="Employee Details"
      style={{
        content: {
          width: "90%",
          maxWidth: "600px",
          maxHeight: "80vh",
          margin: "auto",
          padding: "0",
          border: "none",
          borderRadius: "0.5rem",
          overflowY: "auto",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <div className="p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <p className="fw-bolder mx-auto">การจัดการมอบหมายคนขับรถ (พขร.)</p>
          <button onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="col-lg-12 mb-3">
          <label htmlFor="input_reg_number" className="form-label fw-medium">
            ทะเบียนรถ
          </label>
          <input
            type="text"
            name="reg_number"
            id="input_reg_number"
            className="form-control"
            value={dataVehicle.reg_number}
            readOnly
          />
        </div>

        <div className="col-lg-12 mb-3">
          <label htmlFor="input_code" className="form-label fw-medium">
            รหัสพนักงาน<span style={{ color: "red" }}> *</span>
          </label>
          <div className="input-group">
            <input
              type="text"
              name="code"
              id="input_code"
              className="form-control"
              value={dataRelation.emp_code}
              onChange={(e) => setDataRelation({ ...dataRelation, emp_code: e.target.value })}
              placeholder="กรอกรหัสพนักงาน"
            />
            <button className="btn btn-gray" type="button" onClick={fetchEmpCod}>
              ตรวจสอบ
            </button>
          </div>
          {/* แสดงข้อมูลเมื่อกดปุ่มตรวจสอบแล้ว */}
          {isFetched && (
            <div className="mt-2">
              {empCode.length > 0 ? (
                empCode.map((rowEmp) => (
                  <div key={rowEmp.code}>
                    <p>
                      <strong>ชื่อ: </strong> {rowEmp.lname} {rowEmp.fname} <strong style={{ color: "Green" }}>✅ ข้อมูลถูกต้อง</strong>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-danger">⚠️ ไม่พบข้อมูลพนักงาน</p>
              )}
            </div>
          )}
        </div>

        <div className="col-lg-12 mb-3">
          <label htmlFor="input_assigned_datee" className="form-label fw-medium">
            วันที่มอบหมาย
          </label>
          <input
            type="date"
            name="assigned_date"
            id="input_assigned_date"
            className="form-control"
            value={dataRelation.assigned_date}
            onChange={(e) => setDataRelation({ ...dataRelation, assigned_date: e.target.value })}
          />

        </div>

        <div className="col-lg-12 mb-3">
          <label htmlFor="input_note" className="form-label fw-medium">
            หมายเหตุเพิ่มเติม (ถ้ามี)
          </label>
          <textarea
            name="note"
            id="input_note"
            className="form-control"
            placeholder=""
            rows="4" // กำหนดความสูงของกล่อง
            value={dataRelation.notes}
            onChange={(e) => setDataRelation({ ...dataRelation, notes: e.target.value })}
          />

        </div>

        <div className="text-center">
          <button className="btn" style={{ background: "Teal", color: "#ffffff" }} onClick={handleSubmitAddEmpRelation}>
            บันทึก
          </button>

        </div>
      </div>
    </Modal>
  );
};

export default Driver_relation_management;
