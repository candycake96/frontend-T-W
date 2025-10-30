import React from "react";
import ReactModal from "react-modal";

const Modal_repair_change_approval = ({ isOpen, onClose }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            contentLabel="ตั้งค่าเลขเอกสาร"
            style={{ content: { width: "90%", maxWidth: "700px", margin: "auto", padding: "24px", borderRadius: "12px" }, overlay: { backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 } }}
        >

            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className="text-xl font-bold">คำขอแก้ไขรายการแจ้งซ่อม (หลังอนุมัติ)</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>
            </div>

            <div className="">
                <div className="row">
                    <div className="col-lg-8 mb-3">
                        <label className="form-label">ผู้ส่งคำขอ </label>
                        <input
                            className="form-control"
                            type="input"
                            // rows={3}
                            // value={dataApproval.remark}
                            // onChange={(e) => handleChange("remark", e.target.value)}
                            disabled
                        />
                    </div>
                    <div className="col-lg-4 mb-3">
                        <label className="form-label">วันที่ </label>
                        <input
                            className="form-control"
                            type="date"
                            // rows={3}
                            // value={dataApproval.remark}
                            // onChange={(e) => handleChange("remark", e.target.value)}
                            disabled
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">หมายเหตุ <span className="text-danger">*</span></label>
                    <textarea
                        className="form-control"
                    // rows={3}
                    // value={dataApproval.remark}
                    // onChange={(e) => handleChange("remark", e.target.value)}
                    />
                </div>

                <hr className="mb-3" />

  <div className="row">
                    <div className="col-lg-8 mb-3">
                        <label className="form-label">ผู้อนุมัติ </label>
                        <input
                            className="form-control"
                            type="input"
                            // rows={3}
                            // value={dataApproval.remark}
                            // onChange={(e) => handleChange("remark", e.target.value)}
                            disabled
                        />
                    </div>
                    <div className="col-lg-4 mb-3">
                        <label className="form-label">วันที่ </label>
                        <input
                            className="form-control"
                            type="date"
                            // rows={3}
                            // value={dataApproval.remark}
                            // onChange={(e) => handleChange("remark", e.target.value)}
                            disabled
                        />
                    </div>
                </div>
<div className="d-flex gap-4 mb-2">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        id="approve"
                                        name="invoice_approver_status"
                                        value="approved"
                                        // checked={isApproval.invoice_approver_status === "approved"}
                                        // onChange={handleChange}
                                        className="form-check-input"
                                        // disabled={!isEditing}
                                    />
                                    <label htmlFor="approve" className="form-check-label">
                                        อนุมัติ
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        id="reject"
                                        name="invoice_approver_status"
                                        value="rejected"
                                        // checked={isApproval.invoice_approver_status === "rejected"}
                                        // onChange={handleChange}
                                        className="form-check-input"
                                        // disabled={!isEditing}
                                    />
                                    <label htmlFor="reject" className="form-check-label">
                                        ไม่อนุมัติ
                                    </label>
                                </div>
                            </div>
                <div className="mb-3">
                    <label className="form-label">หมายเหตุ <span className="text-danger">*</span></label>
                    <textarea
                        className="form-control"
                    // rows={3}
                    // value={dataApproval.remark}
                    // onChange={(e) => handleChange("remark", e.target.value)}
                    />
                </div>

                <div className="">
                    <button className="btn btn-primary btn-sm">ส่งข้อมูล</button>
                </div>

            </div>


        </ReactModal>
    )
};
export default Modal_repair_change_approval;