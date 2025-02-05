import React, { useState, useEffect } from "react";
import axios from "axios"; // ลืม import axios
import Driver_relation_management from "../modal/driver_relation_management";
import EmployeeShowModal from "../../../../componentspage1/EmployeesUser/modal/EmployeeShowModal";



const CardDriverRelation = ({ dataVehicle }) => {
    if (!dataVehicle) return null;

    const [isRelationOpenModal, setRelationOpenModal] = useState(false);
    const [showDrivers, setShowDriver] = useState([]);

    const [reload, setReload] = useState(false);//  โหลดใหม่เมื่อ `reload` เปลี่ยน

    const handleRelationOpenModal = () => {
        if (!isRelationOpenModal) {
            setRelationOpenModal(true);
        }
    };
    
    const handleRelationCloseAllModal = () => {
        setRelationOpenModal(false);
    };
    

    const fetchShowDriver = async () => {
        if (!dataVehicle?.reg_id) return; // ป้องกันข้อผิดพลาด
        try {
            const response = await axios.get(
                `http://localhost:3333/api/shows_driver_relation/${dataVehicle.reg_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            setShowDriver(response.data);
        } catch (error) {
            console.error("Error fetching vehicle data:", error);
        }
    };
    
    useEffect(() => {
        fetchShowDriver();
    }, [dataVehicle?.reg_id, reload]); 
    

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

    const handleDelete = async (driver_assignment_id) => {
        if (!window.confirm("คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?")) return; // 🔴 ยืนยันก่อนลบ
        try {
            await axios.delete(`http://localhost:3333/api/delete_driver_relation/${driver_assignment_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
    
            // ✅ อัปเดตรายการโดยไม่ต้องรีเฟรช
            setReload(prev => !prev)

        } catch (error) {
            console.error("❌ Error deleting driver relation:", error);
        }
    };
    
    const handleCancelDriverRelation = async (driverAssignmentId) => {
        if (!window.confirm("คุณแน่ใจหรือไม่ที่จะยกเลิการใช้งานระหว่างพนักงานกับรถ")) return;
        
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setError("Unauthorized: No token found. Please login again.");
            return;
        }
    
        try {
            const response = await axios.put(
                `http://localhost:3333/api/update_cancel_driver_relation/${driverAssignmentId}`,
                {}, // 👈 ถ้าไม่มีข้อมูลใน body ให้ส่ง {}
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
    
            setReload(prev => !prev);  // Refresh the data
        } catch (err) {
            setError("Error canceling driver relation: " + (err.response?.data?.message || err.message));
        }
    };
    
    return (
        <>
            <div className="card mb-3 flex-grow-1">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <p className="fw-medium">ข้อมูลคนขับ</p>
                    <button className="btn-animated" onClick={handleRelationOpenModal}>
                        <i className="bi bi-pencil-fill"></i>
                    </button>
                </div>
                <div className="card-body">
                    {/* ✅ ใช้ map() ถูกต้อง */}
                    {showDrivers.length === 0 ? (
        <p className="text-muted">❌ ไม่พบข้อมูลคนขับ</p>
    ) : (
        showDrivers.map((rowD, index) => (
                        <div key={index}>
                            <div className="mb-2">
                                <p className=""> 🚛 {rowD.reg_number} </p>
                                <p>👨‍✈️ คนขับ: <button className="" onClick={() => handleOpenModal({ id_emp: rowD.driver_id })} style={{ color: 'Blue', textDecoration: 'underline' }}>{rowD.fname} {rowD.lname}</button></p>
                                <p>📞 เบอร์โทรติดต่อ: {rowD.phone}</p>
                                <p>📅 วันที่มอบหมาย: {rowD.assigned_date} </p>
                                <p>😊 หมายเหตุ: {rowD.notes}</p>
                                <p>
                                    🛠
                                    <button
                                        className="btn btn-sm mx-1 action-btn delete-btn"
                                        onClick={() => handleDelete(rowD.driver_assignment_id)}
                                    >
                                        <i className="bi bi-trash-fill"></i>
                                    </button>

                                    <span>
                                    <button
                                            className="btn btn-sm mx-1 action-btn cancel-btn"
                                            onClick={() => handleCancelDriverRelation(rowD.driver_assignment_id)} 
                                        >
                                            <i class="bi bi-sign-stop-fill"></i> สิ้นสุดการใช้งาน
                                        </button>
                                    </span>
                                </p>


                            </div>

                            <hr />
                        </div>
                            ))
                        )}
                </div>
            </div>

            {isRelationOpenModal && (
    <Driver_relation_management
    key={dataVehicle?.reg_id}  // ✅ ป้องกันการเปิด modal เดิมซ
        isOpen={isRelationOpenModal}
        onClose={handleRelationCloseAllModal}
        dataVehicle={dataVehicle}
        onSuccess={() => setReload(prev => !prev)}
    />
)}


            {isModalOpen && selectedEmployee && (
                <EmployeeShowModal isOpen={isModalOpen} onClose={handleCloseModal} emp={selectedEmployee} />
            )}

        </>
    );
};

export default CardDriverRelation;
