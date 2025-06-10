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
        remark: "",
    });

    // เพิ่ม state สำหรับใบเสนอราคาแบบ array
    const [quotations, setQuotations] = useState([
        {
            garage_id: "",
            quotation_date: "",
            quotation_file: null,
            note: "",
            is_selected: false,
            vat_mode: "",
            parts: [
                { request_id: "", parts_used_id: "", part_id: "", system_name: "", part_name: "", price: "", unit: "", maintenance_type: "", qty: "", discount: "", vat: "", total: "" }
            ],
        }
    ]);

    // ฟังก์ชันเพิ่มใบเสนอราคาใหม่
    const handleAddQuotation = () => {
        setQuotations([
            ...quotations,
            {
                garage_id: "",
                quotation_date: "",
                quotation_file: null,
                note: "",
                is_selected: false,
                parts: [
                    { request_id: "", parts_used_id: "", part_id: "", system_name: "", part_name: "", price: "", unit: "", maintenance_type: "", qty: "", discount: "", vat: "", total: "" }
                ]
            }
        ]);
    };

    const handleRemoveQuotation = (quotationIndex) => {
        const updatedQuotations = quotations.filter((_, index) => index !== quotationIndex);
        setQuotations(updatedQuotations);
    };


    // ฟังก์ชันเพิ่มรายการอะไหล่ในใบเสนอราคา
    const handleAddPart = (quotationIndex) => {
        const updatedQuotations = [...quotations];
        updatedQuotations[quotationIndex].parts.push({
            request_id: "", parts_used_id: "", part_id: "", system_name: "", part_name: "", price: "", unit: "", maintenance_type: "", qty: "", discount: "", vat: "", total: ""
        });
        setQuotations(updatedQuotations);
    };


    useEffect(() => {
        if (maintenanceJob) {
            setAnalysisData((prevData) => ({
                ...prevData,
                request_id: maintenanceJob.request_id || "",
            }));
        }
    }, [maintenanceJob]);

    // ฟังก์ชันลบข้อมูลอะไหล่
    const handleRemovePart = (quotationIndex, partIndex) => {
        const updated = [...quotations];
        updated[quotationIndex].parts.splice(partIndex, 1);
        setQuotations(updated);
    };

    // ฟังก์ชันการเปลี่ยนแปลงข้อมูลอะไหล่  
    const handleChange = (quotationIndex, partIndex, field, value) => {
        const updatedQuotations = [...quotations];
        const part = updatedQuotations[quotationIndex].parts[partIndex];

        part[field] = value;

        // คำนวณใหม่ทุกครั้งที่มีการเปลี่ยนแปลง
        const price = parseFloat(part.price) || 0;
        const qty = parseFloat(part.qty) || 0;
        const vat = parseFloat(part.vat) || 0;
        const discount = parseFloat(part.discount) || 0;

        const subtotal = price * qty;
        const vatVal = subtotal * vat / 100;
        const total = subtotal + vatVal - discount;

        part.total = total.toFixed(2);

        setQuotations(updatedQuotations);
    };

    // useEffect(() => {
    //   const updatedQuotations = quotations.map((quotation) => {
    //     let total = 0;
    //     let vatAmount = 0;

    //     quotation.parts.forEach((part) => {
    //       const price = parseFloat(part.price) || 0;
    //       const qty = parseFloat(part.qty) || 0;
    //       const vat = parseFloat(part.vat) || 0;

    //       const subtotal = price * qty;
    //       const vatVal = subtotal * vat / 100;

    //       total += subtotal;
    //       vatAmount += vatVal;
    //     });

    //     return {
    //       ...quotation,
    //       summary: {
    //         total: total.toFixed(2),
    //         vat: vatAmount.toFixed(2),
    //         grandTotal: (total + vatAmount).toFixed(2),
    //       }
    //     };
    //   });

    //   setQuotations(updatedQuotations);
    // }, [quotations]);

    const calculateSummary = (parts) => {
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

        return {
            total: total.toFixed(2),
            vat: vatAmount.toFixed(2),
            grandTotal: (total + vatAmount).toFixed(2),
        };
    };



    // ฟังก์ชันเปลี่ยนแปลงข้อมูลใบเสนอราคา
    const handleQuotationChange = (index, field, value) => {
        const updated = [...quotations];
        updated[index][field] = value;
        setQuotations(updated);
    };

    // ฟังก์ชันเลือกใบเสนอราคาที่ใช้งาน
    const handleToggleQuotation = (index) => {
        const updated = [...quotations];
        updated[index].is_selected = !updated[index].is_selected;
        setQuotations(updated);
    };


    return (
        <div className="card mb-4 shadow-sm border-0">
            <form>
                <div className="card-header fw-bold fs-5">
                    ความเห็นของแผนกซ่อมบำรุง {maintenanceJob ? maintenanceJob.request_no : "ไม่ระบุ"}
                </div>
                <div className="card-body">
                    {/* ...ฟอร์มส่วนบน... */}
                    <div className="mb-3">
                        <div className="">

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


                        </div>
                        <hr className="mb-3" />
                        {/* แสดงใบเสนอราคาทั้งหมด */}
                        {quotations.map((q, idx) => (
                            <div key={idx} className="mb-4 border rounded p-3">
                                <div className="row mb-2">
                                    <div className="col-lg-5">
                                        <p className="fw-bolder">ใบเสนอราคาที่ {idx + 1}
                                            <strong className="ms-2">

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger ms-2"
                                                    onClick={() => handleRemoveQuotation(idx)}
                                                >
                                                    <i className="bi bi-trash3-fill"></i>
                                                    ลบใบเสนอราคาที่ {idx + 1}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-primary ms-2"
                                                    onClick={() => handleRemoveQuotation(idx)}
                                                >
                                                    <i class="bi bi-arrow-down-square-fill"></i>
                                                    ดึงข้อมูลอะไหล่
                                                </button>


                                            </strong>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-2 mb-2">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`is_selected_${idx}`}
                                            name={`is_selected_${idx}`}
                                            checked={q.is_selected}
                                            onChange={() => handleToggleQuotation(idx)}
                                        />
                                        <label className="form-check-label" htmlFor={`is_selected_${idx}`}>
                                            เลือกใช้งาน
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 mb-3">
                                        <label className="form-label">ชื่ออู่/ร้านค้า</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={q.garage_id}
                                            onChange={e => handleQuotationChange(idx, "garage_id", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-lg-3 mb-3">
                                        <label className="form-label">วันที่สร้างใบเสนอราคา</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={q.quotation_date}
                                            onChange={e => handleQuotationChange(idx, "quotation_date", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label className="form-label">เอกสารแนบ</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={e => handleQuotationChange(idx, "quotation_file", e.target.files[0])}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg mb-3">
                                    <label className="form-label">หมายเหตุ</label>
                                    <textarea
                                        className="form-control"
                                        rows={2}
                                        value={q.note}
                                        onChange={e => handleQuotationChange(idx, "note", e.target.value)}
                                        placeholder="ระบุหมายเหตุเพิ่มเติม (ถ้ามี)"
                                    ></textarea>
                                </div>
                                <div className="mb-3" style={{ overflowX: "auto" }}>
                                    {q.parts.map((part, partIdx) => (
                                        <div className="row mb-3" key={partIdx}>
                                            <input type="hidden" value={part.part_id} readOnly />
                                            <div className="col-lg-2">
                                                <label className="form-label text-sm">ระบบ</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={part.system_name}
                                                    onChange={e => handleChange(idx, partIdx, "system_name", e.target.value)}
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-lg-2">
                                                <label className="form-label text-sm">อะไหล่ <span style={{ color: "red" }}>*</span></label>
                                                <div className="input-group input-group-sm">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={part.part_name}
                                                        onChange={e => handleChange(idx, partIdx, "part_name", e.target.value)}
                                                        placeholder="ค้นหาอะไหล่..."
                                                    />
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm"
                                                        type="button"
                                                    >
                                                        <i className="bi bi-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-lg-1">
                                                <label className="form-label text-sm">ประเภท <span style={{ color: "red" }}>*</span></label>
                                                <select
                                                    className="form-select mb-3 form-select-sm"
                                                    value={part.maintenance_type}
                                                    onChange={e => handleChange(idx, partIdx, "maintenance_type", e.target.value)}
                                                >
                                                    <option value=""></option>
                                                    <option value="CM">CM</option>
                                                    <option value="PM">PM</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-1">
                                                <label className="form-label text-sm">ราคา <span style={{ color: "red" }}>*</span></label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    value={part.price}
                                                    onChange={e => handleChange(idx, partIdx, "price", e.target.value)}
                                                />
                                            </div>
                                            <div className="col-lg-1">
                                                <label className="form-label text-sm">หน่วย <span style={{ color: "red" }}>*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={part.unit}
                                                    onChange={e => handleChange(idx, partIdx, "unit", e.target.value)}
                                                />
                                            </div>
                                            <div className="col-lg-1">
                                                <label className="form-label text-sm">จำนวน <span style={{ color: "red" }}>*</span></label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    value={part.qty}
                                                    onChange={e => handleChange(idx, partIdx, "qty", e.target.value)}
                                                />
                                            </div>
                                            <div className="col-lg-1">
                                                <label className="form-label text-sm">VAT %</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    value={part.vat}
                                                    onChange={e => handleChange(idx, partIdx, "vat", e.target.value)}
                                                />
                                            </div>
                                            <div className="col-lg-2">
                                                <label className="form-label text-sm">ราคารวม</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    value={part.total || ""}
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-lg-1 d-flex justify-content-center align-items-center mt-3">
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    type="button"
                                                    onClick={() => handleRemovePart(idx, partIdx)}
                                                >
                                                    <i className="bi bi-trash3-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="d-flex justify-content-end mb-3">
                                        <button
                                            className="btn btn-outline-primary"
                                            type="button"
                                            onClick={() => handleAddPart(idx)}
                                        >
                                            เพิ่มรายการอะไหล่ <i className="bi bi-plus-square-fill"></i>
                                        </button>
                                    </div>
                                </div>


                                <div className="text-end">
                                    {(() => {
                                        const summary = calculateSummary(q.parts);
                                        return (
                                            <div className="bg-white rounded-lg p-3 w-full max-w-xs ml-auto">
                                                <div className="space-y-1 text-right">

                                                  <div className="col-lg d-flex align-items-center">
    <label className="form-label text-sm mb-0 me-2">VAT</label>
    <input
        type="text"
        className="form-control form-control-sm"
        style={{ width: "100px" }}
        value={q.vat_mode || ""}
        onChange={e => handleQuotationChange(idx, "vat_mode", e.target.value)}
    />
</div>
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
                                        );
                                    })()}
                                </div>


                                <hr className="mb-3" />
                            </div>
                        ))}
                    </div>
                    <div className="text-center mb-2">
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={handleAddQuotation}
                        >
                            เพิ่มใบเสนอราคา <i className="bi bi-plus-square-fill"></i>
                        </button>
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