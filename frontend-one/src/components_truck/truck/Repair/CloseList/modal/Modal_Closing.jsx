import React, { useState } from "react";
import ReactModal from "react-modal";

const Modal_Closing = ({isOpen, onClose, dataClosing}) => {
    const [formData, setFormData] = useState({
    close_date: "",
    close_remark: "",
    status_after_close: ""
});

const handleSubmitClose = () => {
    // ตัวอย่างส่งข้อมูล
    console.log("กำลังส่งข้อมูล:", formData);
};

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    return (
      <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            contentLabel="ปิดงานซ่อม"
            style={{
                content: {
                    width: "100%",
                    maxWidth: "700px",
                    maxHeight: "600px",
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
            {/* Header */}
            <div
                className="modal-header"
                style={{
                    padding: "1rem",
                    backgroundColor: "#f8f9fa",
                    borderTopLeftRadius: "0.5rem",
                    borderTopRightRadius: "0.5rem",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                }}
            >
                <h5 className="modal-title fw-bold">ปิดงานซ่อม</h5>
                <button
                    onClick={onClose}
                    style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        cursor: "pointer",
                    }}
                >
                    ×
                </button>
            </div>

            {/* Body */}
            <div className="p-4">
                <div className="mb-3">
                    <label className="form-label fw-semibold">วันที่ปิดงาน</label>
                    <input
                        type="date"
                        className="form-control"
                        name="close_date"
                        value={formData.close_date}
                        onChange={handleChange}
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label fw-semibold">สถานะหลังปิดงาน</label>
                    <select
                        className="form-select"
                        name="status_after_close"
                        value={formData.status_after_close}
                        onChange={handleChange}
                    >
                        <option value="">-- เลือกสถานะ --</option>
                        <option value="ซ่อมสำเร็จ">ซ่อมสำเร็จ</option>
                        <option value="ยกเลิกงาน">ยกเลิกงาน</option>
                        <option value="ซ่อมชั่วคราว">ซ่อมชั่วคราว</option>
                        <option value="ส่งซ่อมภายนอก">ส่งซ่อมภายนอก</option>
                    </select>
                </div>


                  <div className="mb-3">
                    <label className="form-label fw-semibold">เอกสารกาารปิดงานซ่อม</label>
                    <input
                        type="file"
                        className="form-control"
                        name="close_file"
                        value={formData.close_file}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">หมายเหตุ</label>
                    <textarea
                        className="form-control"
                        name="close_remark"
                        rows="3"
                        placeholder="รายละเอียดหรืออุปกรณ์ที่เปลี่ยน"
                        value={formData.close_remark}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="modal-footer p-3 border-top d-flex justify-content-end gap-2">
                <button className="btn btn-secondary" onClick={onClose}>
                    ยกเลิก
                </button>
                <button className="btn btn-success" onClick={handleSubmitClose}>
                    <i className="bi bi-check-circle me-1"></i> ยืนยันปิดงาน
                </button>
            </div>
        </ReactModal>
    )
}

export default Modal_Closing;