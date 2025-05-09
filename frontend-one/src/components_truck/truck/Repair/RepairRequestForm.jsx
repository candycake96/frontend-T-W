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
    const [selectedPartIndex, setSelectedPartIndex] = useState(null);

    const [parts, setParts] = useState([
        { part_id: "", system: "", part: "", price: "", qty: "", vat: "", total: "" },
    ]);

    const handleAddPart = () => {
        setParts([...parts, { part_id: "", system: "", part: "", price: "", qty: "", vat: "", total: "" }]);
    };

    // ฟังก์ชันรับข้อมูลจาก Modal_vehicle_parts_add
    const handleDataFromAddModal = (data) => {
        if (selectedPartIndex !== null) {
            const updatedParts = [...parts];
            updatedParts[selectedPartIndex] = {
                ...updatedParts[selectedPartIndex],
                ...data
            };
            setParts(updatedParts);
            setSelectedPartIndex(null); // reset after update
        } else {
            setParts([...parts, data]); // fallback: add new
        }
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

        // แปลงเป็นตัวเลขเพื่อคำนวณ
        const price = parseFloat(updatedParts[index].price) || 0;
        const qty = parseFloat(updatedParts[index].qty) || 0;
        const vat = parseFloat(updatedParts[index].vat) || 0;

        const subtotal = price * qty;
        const total = subtotal + (subtotal * vat / 100); // รวม VAT

        updatedParts[index].total = total.toFixed(2); // เก็บทศนิยม 2 ตำแหน่ง

        setParts(updatedParts);

    };


    // Modal
    const handleOpenModalVehicleParteDtails = (index) => {
        setSelectedPartIndex(index);
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
                                <input type="text" className="form-control" value="xxxxxxxx-x" disabled />
                            </div>
                            <div className="col-lg-3 mb-3">
                                <label className="form-label">วันที่แจ้ง</label>
                                <input type="date" className="form-control" value={date} disabled />
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
                                <input type="hidden" value={part.part_id} onChange={(e) => handleChange(index, "part_id", e.target.value)} /> {/* part_id */}
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
                                            onChange={(e) => handleChange(index, "part_name", e.target.value)}
                                            placeholder="ค้นหาอะไหล่..."
                                        />
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            type="button"
                                            onClick={() => handleOpenModalVehicleParteDtails(index)}
                                        >
                                            <i className="bi bi-search"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-1">
                                    <label className="form-label">ราคา</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        value={part.price}
                                        onChange={(e) => handleChange(index, "price", e.target.value)}
                                    />
                                </div>
                                <div className="col-lg-1">
                                    <label className="form-label">หน่วย</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={part.unit}
                                        onChange={(e) => handleChange(index, "unit", e.target.value)}
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
                                <div className="col-lg-2">
                                    <label className="form-label">ราคารวม</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        value={part.total}
                                        onChange={(e) => handleChange(index, "total", e.target.value)} // REMOVE THIS
                                        disabled
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
                    isOpen={isOpenModalVehicleParteDtails} onClose={handleClossModalVehicleParteDtails} onSubmit={handleDataFromAddModal} />
            )}
        </div>
    );
};

export default RepairRequestForm;
