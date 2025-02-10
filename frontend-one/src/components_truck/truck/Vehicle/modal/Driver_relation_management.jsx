import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement('#root'); // หรือใช้ ID ของ element หลักของแอป

const Driver_relation_management = ({ isOpen, onClose, dataVehicle, onSuccess }) => {
  const [user, setUser] = useState(null);
  const [dataRelation, setDataRelation] = useState({
    reg_id: "",
    code: "",
    assigned_date: "",
    notes: "",
    assigned_by: "", // กำหนดค่าเริ่มต้นเป็นค่าว่าง
    id_emp: ""
  });

  const [userDriver, setUserDriver] = useState([]);
  const [filteredUserDriver, setFilteredUserDriver] = useState([]); // สถานะสำหรับเก็บรายชื่อพนักงานที่ถูกกรอง

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

  const fetchUserDriver = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/api/getdriver`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setUserDriver(response.data);
      setFilteredUserDriver(response.data); // กำหนดค่าเริ่มต้นให้ filteredUserDriver
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  }

  useEffect(() => {
    fetchUserDriver();
  }, []);

  const handleSearchInput = (e) => {
    const codeInput = e.target.value;
    setDataRelation({ ...dataRelation, code: codeInput });

    // กรองรายชื่อพนักงานที่มีรหัสพนักงานตรงกับที่พิมพ์
    const filteredUsers = userDriver.filter((user) =>
      user.code.toLowerCase().includes(codeInput.toLowerCase())
    );
    setFilteredUserDriver(filteredUsers);
  }

  const handleSubmitAddEmpRelation = async (e) => {
    e.preventDefault();
    console.log("📌 Data before sending:", dataRelation);

    if (!dataRelation.code || !dataRelation.reg_id) {
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
            {/* Input รหัสพนักงาน */}
            <input
              type="text"
              name="code"
              id="input_code"
              className="form-control text-end"
              value={dataRelation.code || ""}
              onChange={handleSearchInput} // เปลี่ยนการเรียกใช้ฟังก์ชัน handleSearchInput
              placeholder="xxxxx"
            />

            {/* Dropdown รายชื่อพนักงาน */}
            <select
              id="userroleSelect"
              className="form-select"
              value={dataRelation.id_emp || ""}
              onChange={(e) => {
                const selectedIdEmp = Number(e.target.value); // แปลงค่าให้เป็นตัวเลข
                setDataRelation({ ...dataRelation, id_emp: selectedIdEmp });

                // ค้นหา code ที่ตรงกับ id_emp
                const foundUser = userDriver.find((user) => user.id_emp === selectedIdEmp);
                if (foundUser) {
                  setDataRelation(prev => ({ ...prev, code: foundUser.code }));
                }
              }}
            >
              {(dataRelation.code === "" || dataRelation.code === "0") && <option value="">เลือกพนักงาน</option>}
              {filteredUserDriver.map((user) => ( // เปลี่ยนเป็นการใช้ filteredUserDriver
                <option key={user.id_emp} value={user.id_emp}>
                  {user.fname} {user.lname}
                </option>
              ))}
            </select>
          </div>
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
