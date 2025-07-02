import React, { useState } from "react";

const PM_setting = () => {
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [pmList, setPmList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        task_name: "",
        interval_type: "mileage",
        interval_value: "",
        last_mileage: "",
        last_date: "",
    });

    const vehicleOptions = [
        { id: 1, name: "รถตู้ ทะเบียน กข-1234" },
        { id: 2, name: "รถบรรทุก ทะเบียน ขข-5678" },
        // ดึงจากฐานข้อมูลจริงในระบบจริง
    ];

    const handleAddPM = () => {
        setPmList([...pmList, formData]);
        setShowForm(false);
        setFormData({
            task_name: "",
            interval_type: "mileage",
            interval_value: "",
            last_mileage: "",
            last_date: "",
        });
    };

    return (
        <div className="container mt-4">
            <h4 className="fw-bold text-primary mb-3">
                ตั้งค่าการแจ้งเตือน PM รถแต่ละคัน
            </h4>

            {/* เลือกรถ */}
            <div className="mb-3">
                <label className="form-label">เลือกรถ:</label>
                <select
                    className="form-select"
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                >
                    <option value="">-- เลือกรถ --</option>
                    {vehicleOptions.map((v) => (
                        <option key={v.id} value={v.id}>
                            {v.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* ปุ่มเพิ่มรายการ */}
            {selectedVehicle && (
                <div className="mb-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">รายการ PM ของรถ</h5>
                    <button className="btn btn-sm btn-primary" onClick={() => setShowForm(true)}>
                        <i className="bi bi-plus-circle me-1"></i> เพิ่มรายการ PM
                    </button>
                </div>
            )}

            {/* ตารางรายการ PM */}
            {pmList.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>งาน</th>
                                <th>รอบ (กม./วัน)</th>
                                <th>ค่ารอบ</th>
                                <th>ไมล์ล่าสุด</th>
                                <th>วันที่ล่าสุด</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pmList.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.task_name}</td>
                                    <td>{item.interval_type === "mileage" ? "ไมล์" : "วัน"}</td>
                                    <td>{item.interval_value}</td>
                                    <td>{item.last_mileage}</td>
                                    <td>{item.last_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : selectedVehicle && (
                <p className="text-muted">ยังไม่มีรายการ PM สำหรับรถคันนี้</p>
            )}

            {/* ฟอร์มเพิ่มรายการ PM */}
            {showForm && (
                <div className="card p-3 mt-4 shadow-sm border rounded-3">
                    <h5 className="mb-3">เพิ่มรายการ PM</h5>
                    <div className="row g-2">
                        <div className="col-md-6">
                            <label className="form-label">ชื่อรายการ PM</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.task_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, task_name: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">ประเภทรอบ</label>
                            <select
                                className="form-select"
                                value={formData.interval_type}
                                onChange={(e) =>
                                    setFormData({ ...formData, interval_type: e.target.value })
                                }
                            >
                                <option value="mileage">ไมล์ (กม.)</option>
                                <option value="time">ระยะเวลา (วัน)</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">ค่ารอบ</label>
                            <input
                                type="number"
                                className="form-control"
                                value={formData.interval_value}
                                onChange={(e) =>
                                    setFormData({ ...formData, interval_value: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">ไมล์ล่าสุด</label>
                            <input
                                type="number"
                                className="form-control"
                                value={formData.last_mileage}
                                onChange={(e) =>
                                    setFormData({ ...formData, last_mileage: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">วันที่ล่าสุด</label>
                            <input
                                type="date"
                                className="form-control"
                                value={formData.last_date}
                                onChange={(e) =>
                                    setFormData({ ...formData, last_date: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div className="mt-3 d-flex justify-content-end gap-2">
                        <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
                            ยกเลิก
                        </button>
                        <button className="btn btn-success" onClick={handleAddPM}>
                            บันทึก
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PM_setting;
