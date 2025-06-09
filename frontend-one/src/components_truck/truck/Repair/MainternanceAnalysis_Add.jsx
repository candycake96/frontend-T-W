import React, { useEffect, useState } from "react";

const MainternanceAnanlysis_Add = ({ maintenanceJob }) => {

    const [analysisData, setAnalysisData] = React.useState({
        reporter: "",
        request_id: "",
        planning_vehicle_availability: "",
        urgentRepair: false,
        inhouseRepair: false,
        sendToGarage: false,
        planDate: "",
        remark: ""
    });

    const [quotationRequired, setQuotationRequired] = useState({
        garage_id: "",
        quotation_date: "",
        quotation_file: null,
        note: "",
        is_selected: ""
    });

    useEffect(() => {
        if (maintenanceJob) {
            setAnalysisData((prevData) => ({
                ...prevData,
                request_id: maintenanceJob.request_id || "",
            }));
        }
    }, [maintenanceJob]);

    const [summary, setSummary] = useState({
        total: 0,
        vat: 0,
        grandTotal: 0,
    });

    const [parts, setParts] = useState([
        { request_id: "", parts_used_id: "", part_id: "", system_name: "", part_name: "", price: "", unit: "", maintenance_type: "", qty: "", discount: "", vat: "", total: "" },
    ]);

    const handleAddPart = () => {
        setParts([...parts, { request_id: "", parts_used_id: "", part_id: "", system_name: "", part_name: "", price: "", unit: "", maintenance_type: "", qty: "", discount: "", vat: "", total: "" }]);
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



    const handleChangeRequestjob = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };





    return (
        <div className="card mb-4 shadow-sm border-0">
            <form action="">
                <div className="card-header   fw-bold fs-5">
                    ความเห็นของแผนกซ่อมบำรุง {maintenanceJob ? maintenanceJob.request_no : "ไม่ระบุ"}
                </div>
                <div className="card-body">
                    <div className="row mb-3" >
                        <div className="col-lg-4 mb-3">
                            <label htmlFor="reporter" className="form-label">
                                ผู้ตรวจเช็ครถ <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="reporter"
                                id="reporter"
                                className="form-control"
                                readOnly
                                disabled
                                value=""
                            />
                        </div>
                        <div className="col-lg-8 mb-3">
                            <label className="form-label mb-2">ประเภทการซ่อม</label>
                            <div className="d-flex gap-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="availableNow"
                                        name="planning_vehicle_availability"
                                        value="available"
                                    />
                                    <label className="form-check-label" htmlFor="availableNow">
                                        PM (ซ่อมก่อนเสีย)
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="notAvailable"
                                        name="planning_vehicle_availability"
                                        value="not_available"
                                    />
                                    <label className="form-check-label" htmlFor="notAvailable">
                                        CM (เสียก่อนซ่อม)
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <label className="form-label mb-2">แนวทางการดำเนินงาน</label>
                        <div className="col-lg-3 mb-2">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="urgentRepair"
                                    name="urgentRepair"
                                />
                                <label className="form-check-label ms-2" htmlFor="urgentRepair">
                                    จำเป็นต้องซ่อมด่วนทันที
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-2">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="inhouseRepair"
                                    name="inhouseRepair"
                                />
                                <label className="form-check-label ms-2" htmlFor="inhouseRepair">
                                    แผนกช่างซ่อมเองได้
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-2">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="sendToGarage"
                                    name="sendToGarage"
                                />
                                <label className="form-check-label ms-2" htmlFor="sendToGarage">
                                    ต้องส่งอู่
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-lg-3 mb-3">
                            <label htmlFor="planDate" className="form-label">
                                ตั้งแต่วันที่
                            </label>
                            <input
                                type="date"
                                name="planDate"
                                id="planDate"
                                className="form-control"
                            />
                            <div className="col-lg mb-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="is_quotation_required "
                                        name="is_quotation_required "
                                    />
                                    <label className="form-check-label ms-2" htmlFor="is_quotation_required ">
                                        ใบเสนอราคา
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 mb-3">
                            <label htmlFor="remark" className="form-label">
                                หมายเหตุ
                            </label>
                            <textarea
                                name="remark"
                                id="remark"
                                className="form-control"
                                rows={2}
                                placeholder="ระบุหมายเหตุเพิ่มเติม (ถ้ามี)"
                            ></textarea>
                        </div>
                    </div>

                    <div className="mb-3">
                        <hr className="mb-3" />

                        <div className="">
                            <div className="row">
                                <div className="col-lg-2">
                                    <p className="fw-bolder">ใบเสนอราคาที่ 1</p>
                                </div>
                                <div className="col-lg-2">
                                     <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="is_selected"
                                    name="is_selected"
                                    value="is_selected"
                                   
                                />
                                <label className="form-check-label" htmlFor="is_selected">
                                    เลือกใช้งาน
                                </label>
                            </div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-lg-3 mb-3">
                                <label htmlFor="planDate" className="form-label">
                                    ชื่ออู่/ร้านค้า
                                </label>
                                <input
                                    type="text"
                                    name="planDate"
                                    id="planDate"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-lg-3 mb-3">
                                <label htmlFor="planDate" className="form-label">
                                    วันที่สร้างใบเสนอราคา
                                </label>
                                <input
                                    type="date"
                                    name="planDate"
                                    id="planDate"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="planDate" className="form-label">
                                    เอกสารแนบ
                                </label>
                                <input
                                    type="file"
                                    name="planDate"
                                    id="planDate"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-lg mb-3">
                            <label htmlFor="note" className="form-label">
                                หมายเหตุ
                            </label>
                            <textarea
                                name="note"
                                id="note"
                                className="form-control"
                                rows={2}
                                placeholder="ระบุหมายเหตุเพิ่มเติม (ถ้ามี)"
                            ></textarea>
                        </div>
                    </div>



                    {/* <hr className="mb-3" /> */}


                    <div className="mb-3"
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
                                        onChange={(e) => handleChange(index, "system_name", e.target.value)} disabled
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

                                        />
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            type="button"
                                        // onClick={() => handleOpenModalVehicleParteDtails(index)}
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
                                    />
                                </div>
                                <div className="col-lg-1">
                                    <label className="form-label text-sm">หน่วย <span className="" style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={part.unit}
                                        onChange={(e) => handleChange(index, "unit", e.target.value)}
                                    />
                                </div>
                                <div className="col-lg-1">
                                    <label className="form-label text-sm">จำนวน <span className="" style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        value={part.qty}
                                        onChange={(e) => handleChange(index, "qty", e.target.value)}
                                    />
                                </div>
                                <div className="col-lg-1">
                                    <label className="form-label text-sm" >VAT <span className="" style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        value={part.vat}
                                        onChange={(e) => handleChange(index, "vat", e.target.value)}
                                    />
                                </div>
                                <div className="col-lg-2">
                                    <label className="form-label text-sm">ราคารวม</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        value={part.total || ""}
                                        onChange={(e) => handleChange(index, "total", e.target.value)} // REMOVE THIS
                                        disabled
                                    />

                                </div>
                                <div className="col-lg-1 d-flex justify-content-center align-items-center mt-3">
                                    <button
                                        className="btn btn-sm btn-danger"
                                        type="button"
                                        onClick={() => handleRemovePart(index)}
                                    >
                                        <i className="bi bi-trash3-fill"></i>
                                    </button>
                                </div>

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
                        <button type="submit" className="btn btn-primary me-2">
                            บันทึก
                        </button>
                        <button type="reset" className="btn btn-secondary">
                            ยกเลิก
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MainternanceAnanlysis_Add;