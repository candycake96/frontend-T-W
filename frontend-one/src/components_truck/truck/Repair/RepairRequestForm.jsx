import React, { useEffect, useState } from "react";
import Modal_vehicle_parts_details from "../Parts/Modal/Modal_vehicle_parts_details";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../config/apiConfig";

const RepairRequestForm = () => {

        const [user, setUser] = useState(null);
        const [date, setDate] = useState(() => {
            const today = new Date();
            return today.toISOString().split('T')[0]; // "YYYY-MM-DD"
          });

        useEffect(() => {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        }, []);

    const [isOpenModalVehicleParteDtails, setOpenModalVehicleParteDtails] = useState(false);
    const [parts, setParts] = useState([
        { system: "", part: "", price: "", qty: "", vat: "", total: "" },
    ]);

    const handleAddPart = () => {
        setParts([...parts, { system: "", part: "", price: "", qty: "", vat: "", total: "" }]);
    };

    // ฟังก์ชันรับข้อมูลจาก Modal_vehicle_parts_add
    const handleDataFromAddModal = (data) => {
        console.log("Selected Part:", data);
        setParts([...parts, data]); // เพิ่มข้อมูลอะไหล่ที่ส่งกลับมาจาก Modal
    };

    // ฟังก์ชันลบข้อมูลอะไหล่
    const handleRemovePart = (index) => {
        const updatedParts = [...parts];
        updatedParts.splice(index, 1);
        setParts(updatedParts);
    };

    // ฟังก์ชันการเปลี่ยนแปลงข้อมูลอะไหล่  
    const handleChange = (index, field, value) => {
        const updatedParts = [...parts];
        updatedParts[index][field] = value;
        setParts(updatedParts);
    };
    const handleSubmitPart = (partData) => {
        console.log("Selected Part:", partData);
      };


    // Modal
    const handleOpenModalVehicleParteDtails = () => {
        setOpenModalVehicleParteDtails(true);
    }
    const handleClossModalVehicleParteDtails = () => {
        setOpenModalVehicleParteDtails(false);
    }

    return (
        <div className="container p-3">
            <div className=" mb-3">
                <p className="fw-bolder fs-4">ฟอร์มแจ้งซ่อม</p>
            </div>
            <div className="mb-1">
                <nav aria-label="breadcrumb" style={{ color: '#0000FF' }}>
                    <ol className="breadcrumb">
                        {/* <li className="breadcrumb-item">
                            <Link to="/truck">หน้าแรก</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/truck/Vendor">ผู้จำหน่ายสินค้า อู่ซ่อม (ทั้งหมด)</Link>
                        </li> */}
                        <li className="breadcrumb-item active" aria-current="page">
                        ฟอร์มแจ้งซ่อม
                        </li>
                    </ol>
                </nav>
            </div>
            <hr className="mb-3" />

            <div className="card mb-3">
                <div className="card-body">
                    <form action="">
                    <div className="row">
                        <div className="col-lg-3 mb-3">
                            <label className="form-label">เลขที่ใบแจ้งซ่อม</label>
                            <input type="text" className="form-control" value="xxxxxxxx-x" disabled/>
                        </div>
                        <div className="col-lg-3 mb-3">
                            <label className="form-label">วันที่แจ้ง</label>
                            <input type="date" className="form-control" value={date} disabled/>
                        </div>
                        <div className="col-lg-3 mb-3">
                            <label className="form-label">ผู้แจ้ง</label>
                            <input type="text" className="form-control" value={(user?.fname || "") + " " + (user?.lname || "")} disabled
                            />
                        </div>
                        <div className="col-lg-3 mb-3">
                            <label className="form-label">ตำแหน่ง</label>
                            <input type="text" className="form-control" value={user?.position_name || ""} disabled />
                        </div>
                        <div className="col-lg-3 mb-3">
                            <label className="form-label">ทะเบียนรถ</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-lg-3 mb-3">
                            <label className="form-label">เลขไมล์ปัจจุบัน</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    <hr />
                            {/* <p className="">รายการอะไหล่</p> */}
                    {parts.map((part, index) => (
                        <div className="row mb-3" key={index}>
                            <div className="col-lg-2">
                                <label className="form-label">ระบบ</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={part.system_name}
                                    onChange={(e) => handleChange(index, "system", e.target.value)} disabled
                                />
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor={`partSearch-${index}`} className="form-label">อะไหล่</label>
                                <div className="input-group input-group-sm">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`partSearch-${index}`}
                                        value={part.part_name}
                                        placeholder="ค้นหาอะไหล่..."
                                    />
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        type="button"
                                        onClick={() => handleOpenModalVehicleParteDtails()}
                                    >
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <label className="form-label">ราคาประเมิน</label>
                                <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={part.price}
                                    onChange={(e) => handleChange(index, "price", e.target.value)}
                                />
                            </div>
                            <div className="col-lg-1">
                                <label className="form-label">หน่วยนับ</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={part.unit}
                                    onChange={(e) => handleChange(index, "price", e.target.value)}
                                />
                            </div>
                            <div className="col-lg-1">
                                <label className="form-label">จำนวน</label>
                                <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={part.qty}
                                    onChange={(e) => handleChange(index, "qty", e.target.value)}
                                />
                            </div>
                            <div className="col-lg-1">
                                <label className="form-label">VAT</label>
                                <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={part.vat}
                                    onChange={(e) => handleChange(index, "vat", e.target.value)}
                                />
                            </div>
                            <div className="col-lg-1">
                                <label className="form-label">ราคารวม</label>
                                <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={part.total}
                                    onChange={(e) => handleChange(index, "total", e.target.value)}
                                />
                            </div>
                            <div className="col-lg-1 d-flex align-items-end">
                                <button
                                    className="btn btn-sm btn-danger  me-1"
                                    type="button"
                                    onClick={() => handleRemovePart(index)}
                                >
                                    <i className="bi bi-trash3-fill"></i>   {/* ลบแถว */}
                                </button>
                            </div>
                        </div>

                    ))}

                    <div className="d-flex justify-content-end mb-3">
                        <button className="btn btn-outline-primary" type="button" onClick={handleAddPart}>
                            เพิ่มรายการอะไหล่
                        </button>
                    </div>

                    <hr className="mb-3" />

                    <div className="text-center">
                        <button className="btn btn-primary">บันทึก</button>
                    </div>
                    </form>
                </div>
            </div>
            {isOpenModalVehicleParteDtails && (
                <Modal_vehicle_parts_details 
                isOpen={isOpenModalVehicleParteDtails} onClose={handleClossModalVehicleParteDtails}   onSubmit={handleDataFromAddModal}/>
            )}
        </div>
    );
};

export default RepairRequestForm;
