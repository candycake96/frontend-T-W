import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import { apiUrl } from "../../../../config/apiConfig";



const Modal_repair_change_approval_active = ({ isOpen, onClose, changID }) => {

    // ดึงข้อมูลผู้ใช้จาก localStorage
    const [user, setUser] = useState(null);  //token
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);


    const [formData, setFormData] = useState({
        approver_name: "",
        approver_date: "",
        approver_remark: "",
        approver_status: ""
    });

    const [isDataRequester, setRequester] = useState([]);


    useEffect(() => {
        if (user && !formData.approver_name) {
            setFormData(prev => ({
                ...prev,
                approver_name: `${user.fname} ${user.lname}`,
                approver_date: new Date().toISOString().split("T")[0]
            }));
        }
    }, [user]);

    // ✅ โหลดข้อมูลเมื่อเปิด Modal
    useEffect(() => {
        if (isOpen && changID) {
            fetchChangeRequest();
        }
    }, [isOpen, changID]);

    const [requesterData, setRequesterData] = useState([]);

    const fetchChangeRequest = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.get(`${apiUrl}/api/change_show_id/${changID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.data) {
                setRequesterData([res.data.data]);
                // setFormData(prev => ({
                //     ...prev,
                //     ...res.data.data
                // }));
            }
        } catch (err) {
            console.error("Error fetching change request:", err);
        }
    };


    // ✅ handle change
    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // ✅ handle submit
    const handleSubmit = async () => {

        if (!formData.approver_status || !formData.approver_remark.trim()) {
            alert("กรุณาเลือกสถานะและกรอกหมายเหตุ");
            return;
        }
        try {
            const token = localStorage.getItem("accessToken");
            const payload = {
                approver_name: formData.approver_name,
                approver_date: new Date().toISOString().split("T")[0],
                approver_status: formData.approver_status,
                approver_remark: formData.approver_remark
            };
            console.log('Data From :', payload)
            await axios.put(`${apiUrl}/api/change_approval/${changID}`, payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("อัปเดตสถานะสำเร็จ");
            onClose();
        } catch (error) {
            console.error("Error updating approval:", error);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('th-TH', options);
    };


    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            contentLabel="คำขอแก้ไขใบแจ้งซ่อม"
            style={{
                content: {
                    width: "90%",
                    maxWidth: "700px",
                    margin: "auto",
                    padding: "24px",
                    borderRadius: "12px",
                },
                overlay: {
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 9999,
                },
            }}
        >
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                <h2 className="h5 fw-bold text-primary">
                    🧾 คำขอแก้ไขรายการแจ้งซ่อม (หลังอนุมัติ)
                </h2>
                <button onClick={onClose} className="btn-close"></button>
            </div>

            {requesterData.map((row, ndx) => (
                <div className="card shadow-sm border-0 mb-3" key={ndx}>
                    <div className="card-body">

                        {/* 🔹 ส่วนของผู้ขอ */}
                        <div className="mb-4">
                            <h6 className="border-start border-4 border-primary ps-2 text-primary fw-bold mb-3">
                                ข้อมูลผู้ขออนุมัติ
                            </h6>
                            <div className="row mb-2">
                                <div className="col-lg-8">
                                    <p className="mb-1">
                                        <strong>ผู้ขออนุมัติ:</strong> {row.requester_name}
                                    </p>
                                </div>
                                <div className="col-lg-4">
                                    <p className="mb-1">
                                        <strong>วันที่:</strong> {formatDate(row.requester_date)}
                                    </p>
                                </div>
                                <div className="col-12">
                                    <p className="mb-0 text-muted">
                                        <strong>หมายเหตุ:</strong> {row.requester_remark || "-"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr />

                        {/* 🔹 ส่วนของผู้อนุมัติ */}
                        {row.approver_name ? (
                            <>
                                <h6
                                    className={`border-start border-4 ps-2 fw-bold mb-3 d-flex align-items-center gap-2 ${row.approver_status === 'approved'
                                            ? 'border-success text-success'
                                            : row.approver_status === 'rejected'
                                                ? 'border-danger text-danger'
                                                : 'border-warning text-warning'
                                        }`}
                                >
                                    {row.approver_status === 'approved' ? (
                                        <>
                                            <i className="bi bi-check-circle-fill"></i>
                                            ผลการอนุมัติ ( อนุมัติ )
                                        </>
                                    ) : row.approver_status === 'rejected' ? (
                                        <>
                                            <i className="bi bi-x-circle-fill"></i>
                                            ผลการอนุมัติ ( ไม่อนุมัติ )
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-hourglass-split"></i>
                                            ผลการอนุมัติ ( รออนุมัติ )
                                        </>
                                    )}
                                </h6>

                                <div className="row mb-2">
                                    <div className="col-lg-8">
                                        <p className="mb-1">
                                            <strong>ผู้อนุมัติ:</strong> {row.approver_name}
                                        </p>
                                    </div>
                                    <div className="col-lg-4">
                                        <p className="mb-1">
                                            <strong>วันที่:</strong> {formatDate(row.approver_date)}
                                        </p>
                                    </div>
                                    <div className="col-12">
                                        <p className="mb-0 text-muted">
                                            <strong>หมายเหตุ:</strong> {row.approver_remark || "-"}
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h6 className="border-start border-4 border-primary ps-2 text-primary fw-bold mb-3">
                                    ผู้อนุมัติ
                                </h6>

                                <div className="row mb-3">
                                    <div className="col-lg-8">
                                        <label className="form-label fw-semibold">ผู้อนุมัติ</label>
                                        <input
                                            className="form-control form-control-sm"
                                            value={formData.approver_name || ""}
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <label className="form-label fw-semibold">วันที่</label>
                                        <input
                                            className="form-control form-control-sm"
                                            type="date"
                                            value={new Date().toISOString().split("T")[0]}
                                            disabled
                                        />
                                    </div>
                                </div>

                                {/* 🔘 ปุ่มสถานะ */}
                                <div className="d-flex gap-4 mb-3">
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            id="approve"
                                            name="approver_status"
                                            value="approved"
                                            checked={formData.approver_status === "approved"}
                                            onChange={(e) => handleChange("approver_status", e.target.value)}
                                            className="form-check-input"
                                        />
                                        <label htmlFor="approve" className="form-check-label text-success fw-semibold">
                                            ✅ อนุมัติ
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            id="reject"
                                            name="approver_status"
                                            value="rejected"
                                            checked={formData.approver_status === "rejected"}
                                            onChange={(e) => handleChange("approver_status", e.target.value)}
                                            className="form-check-input"
                                        />
                                        <label htmlFor="reject" className="form-check-label text-danger fw-semibold">
                                            ❌ ไม่อนุมัติ
                                        </label>
                                    </div>
                                </div>

                                {/* หมายเหตุ */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">
                                        หมายเหตุ <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        className="form-control form-control-sm"
                                        rows="3"
                                        placeholder="กรอกหมายเหตุเพิ่มเติม..."
                                        value={formData.approver_remark || ""}
                                        onChange={(e) => handleChange("approver_remark", e.target.value)}
                                    />
                                </div>

                                <div className="text-end">
                                    <button className="btn btn-primary btn-sm rounded-pill px-4" onClick={handleSubmit}>
                                        💾 บันทึกการอนุมัติ
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ))}


        </ReactModal>
    );
};

export default Modal_repair_change_approval_active;
