import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // ใช้ดึงข้อมูลที่ถูกส่งมาจากหน้าอื่นผ่าน <Link to="..." state={...} />

const MaintenanceJob = () => {

    const [formData, setFormData] = useState({
        request_id: "",
        request_informer_emp_id: "",
        request_no: "",
        request_date: "",
        status: "",
        reg_id: "",
        car_mileage: "",
        fname: "",
        lname: "",
        reg_number: "",
    })

    const location = useLocation();
    const [dataRepairID] = useState(location.state || {}); // รับค่าจาก state ที่ส่งมาผ่าน Link
    console.log(dataRepairID); // ✅ ตรวจสอบข้อมูลที่ถูกส่งมา
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "numeric", day: "numeric", calendar: "gregory" };
        return date.toLocaleDateString("th-TH-u-ca-gregory", options);
    };

    useEffect(() => {
        setFormData({
            request_id: dataRepairID.request_id,
            request_informer_emp_id: dataRepairID.request_informer_emp_id,
            request_no: dataRepairID.request_no,
            request_date: dataRepairID.request_date,
            status: dataRepairID.status,
            reg_id: dataRepairID.reg_id,
            car_mileage: dataRepairID.car_mileage,
            fname: dataRepairID.fname,
            lname: dataRepairID.lname,
            reg_number: dataRepairID.reg_number,
        })
    }, [dataRepairID]);

     const [summary, setSummary] = useState({
            total: 0,
            vat: 0,
            grandTotal: 0,
        });
    

    const [parts, setParts] = useState([
            { part_id: "", system: "", part_name: "", price: "", unit: "", maintenance_type: "", qty: "", discount: "", vat: "", total: "" },
        ]);
    
        const handleAddPart = () => {
            setParts([...parts, { part_id: "", system: "", part_name: "", price: "", unit: "", maintenance_type: "",  qty: "", discount: "", vat: "", total: "" }]);
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
            const discount = parseFloat(updatedParts[index].discount) || 0;
    
            const subtotal = price * qty;
            const total = subtotal + (subtotal * vat / 100); // รวม VAT
            // const grandTotal = total - discount; 
            updatedParts[index].total = total.toFixed(2); // เก็บทศนิยม 2 ตำแหน่ง
    
            setParts(updatedParts);
    
        };
    

    useEffect(() => {
        let total = 0;
        let vatAmount = 0;

        parts.forEach((part) => {
            const price = parseFloat(part.price) || 0;
            const qty = parseFloat(part.qty) || 0;
            const vat = parseFloat(part.vat) || 0;

            const subtotal = price * qty;
            const vatVal = subtotal * vat / 100;

            total += subtotal;
            vatAmount += vatVal;
        });

        setSummary({
            total: total.toFixed(2),
            vat: vatAmount.toFixed(2),
            grandTotal: (total + vatAmount).toFixed(2),
        });

    }, [parts]);


    return (
        <div className="p-1">
            <div className="container">
                <div className="mb-1">
                    <p className="fw-bolder fs-4">
                        Repair Details
                    </p>
                </div>
                <hr className="mb-3" />
                <div className="card">
                    <div className="card-body">

                        <form action="">
                            <div className="row">
                                <div className="col-lg-3 mb-3">
                                    <label className="form-label">เลขที่ใบแจ้งซ่อม</label>
                                    <input type="text" className="form-control" value={(formData?.request_no || "")} disabled />
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label className="form-label">วันที่แจ้ง</label>
                                    <input type="date" className="form-control" value={formatDate(formData?.request_date || "")} disabled />
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label className="form-label">ผู้แจ้ง</label>
                                    <input type="text" className="form-control" value={(formData?.fname || "") + " " + (formData?.lname || "")} disabled
                                    />
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label className="form-label">ตำแหน่ง</label>
                                    <input type="text" className="form-control"  disabled />
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label className="form-label">ทะเบียนรถ <span className="" style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="reg_number"
                                        value={formData?.reg_number}
                                    // onChange={handleChangeRequestjob}
                                    disabled
                                    />
                                </div>
                                <div className="col-lg-3">
                                    <label className="form-label">เลขไมล์ปัจจุบัน <span className="" style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="odometer"
                                        value={formData?.car_mileage}
                                    // onChange={handleChangeRequestjob}
                                    disabled
                                    />
                                </div>
                            </div>

                            <hr />
                            {/* <p className="">รายการอะไหล่</p> */}
                            <div className=""
                                style={{ overflowX: "auto" }}
                            >


{parts.map((part, index) => (
            
            <div className="row  mb-3" key={index}>
                <input type="hidden" value={part.part_id} onChange={(e) => handleChange(index, "part_id", e.target.value)} /> {/* part_id */}
                <div className="col-lg-2">
                    <label className="form-label text-sm">ระบบ</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        value={part.system_name}
                        onChange={(e) => handleChange(index, "system", e.target.value)} disabled
                    />
                </div>
                <div className="col-lg-2">
                    <label htmlFor={`partSearch-${index}`} className="form-label text-sm">อะไหล่ <span className="" style={{ color: "red" }}>*</span></label>
                    <div className="input-group input-group-sm">
                        <input
                            type="text"
                            className="form-control"
                            id={`partSearch-${index}`}
                            value={part.part_name}
                            onChange={(e) => handleChange(index, "part_name", e.target.value)}
                            placeholder="ค้นหาอะไหล่..."
                            disabled
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
                    <label className="form-label text-sm">ประเภท <span className="" style={{ color: "red" }}>*</span></label>
                    <select 
                    className="form-select  mb-3  form-select-sm" 
                    aria-label="Large select example"
                    value={part.maintenance_type}
                    onChange={(e) => handleChange(index, "maintenance_type", e.target.value)}
                    >
                        <option value=""></option>
                        <option value="CM">CM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>

                <div className="col-lg-1">
                    <label className="form-label text-sm">ราคา <span className="" style={{ color: "red" }}>*</span></label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        value={part.price}
                        onChange={(e) => handleChange(index, "price", e.target.value)}
                        disabled
                    />
                </div>
                <div className="col-lg-1">
                    <label className="form-label text-sm">หน่วย <span className="" style={{ color: "red" }}>*</span></label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        value={part.unit}
                        onChange={(e) => handleChange(index, "unit", e.target.value)}
                        disabled
                    />
                </div>
                <div className="col-lg-1">
                    <label className="form-label text-sm">จำนวน <span className="" style={{ color: "red" }}>*</span></label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        value={part.qty}
                        onChange={(e) => handleChange(index, "qty", e.target.value)}
                        disabled
                    />
                </div>
                <div className="col-lg-1">
                    <label className="form-label text-sm" >VAT <span className="" style={{ color: "red" }}>*</span></label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        value={part.vat}
                        onChange={(e) => handleChange(index, "vat", e.target.value)}
                        disabled
                    />
                </div>
                <div className="col-lg-2">
                    <label className="form-label text-sm">ราคารวม</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        value={part.total}
                        onChange={(e) => handleChange(index, "total", e.target.value)} // REMOVE THIS
                        disabled
                    />

                </div>
                {/* <div className="col-lg-1 d-flex justify-content-center align-items-center mt-3">
                    <button
                        className="btn btn-sm btn-danger"
                        type="button"
                        onClick={() => handleRemovePart(index)}
                    >
                        <i className="bi bi-trash3-fill"></i>
                    </button>
                </div> */}

            </div>
      
    ))}





                            </div>

                            <div className="d-flex justify-content-end mb-3">
                                <button className="btn btn-outline-primary" type="button" onClick={handleAddPart}>
                                    เพิ่มรายการอะไหล่
                                </button>
                            </div>

                            <hr className="mb-3" />

                            <div className="bg-white rounded-lg p-3 w-full max-w-xs ml-auto">
                                <div className="space-y-1 text-right">
                                    <p className="text-gray-700 text-sm">
                                        ราคารวม <span className="font-medium text-black">{summary.total}</span> บาท
                                    </p>
                                    <p className="text-gray-700 text-sm">
                                        ภาษีมูลค่าเพิ่ม <span className="font-medium text-black">{summary.vat}</span> บาท
                                    </p>
                                    <p className="text-gray-900 text-sm font-semibold border-t pt-1">
                                        ราคารวมสุทธิ <span className="text-green-600">{summary.grandTotal}</span> บาท (รวมภาษีแล้ว)
                                    </p>
                                </div>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">บันทึก</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaintenanceJob;
