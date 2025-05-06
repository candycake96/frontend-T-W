import React from "react";
import ReactModal from "react-modal";

const Modal_vehicle_parts_add = ({ isOpen, onClose }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose} // ป้องกันปิด Modal ขณะกำลังบันทึก
            ariaHideApp={false}
            contentLabel="Manage Vehicle Status"
            style={{
                content: {
                    width: "100%",
                    maxWidth: "950px",
                    maxHeight: "60vh",
                    height: "auto",
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

            <div className="p-3">
                <div className="text-center">
                    <div className="fw-bolder mb-3">
                        <p>เพิ่มอะไหล่ในระบบเครื่องยนต์</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4 mb-3">
                        <label htmlFor="system" className="form-label">รหัสสินค้า (Code) </label>
                        <input type="text" name="" id="system" className="form-control" />
                    </div>
                    <div className="col-lg-4 mb-3">
                        <label htmlFor="system" className="form-label">ชื่ออะไหล่</label>
                        <input type="text" name="" id="system" className="form-control" />
                    </div>
                    <div className="col-lg-4 mb-3">
                        <label htmlFor="brand" className="form-label">ยี่ห้อ</label>
                        <input type="text" id="brand" className="form-control" />
                    </div>

                    <div className="col-lg-4 mb-3">
                        <label htmlFor="model" className="form-label">รุ่น</label>
                        <input type="text" id="model" className="form-control" />
                    </div>

                    <div className="col-lg-4 mb-3">
                        <label htmlFor="price" className="form-label">ราคา</label>
                        <input type="number" id="price" className="form-control" />
                    </div>

                    <div className="col-lg-4 mb-3">
                        <label htmlFor="unit" className="form-label">หน่วย</label>
                        <input type="text" id="unit" className="form-control" />
                    </div>

                </div>
                <div className="text-center border-top pt-3 px-3">
                    <button className="btn btn-secondary me-2" onClick={onClose}>ยกเลิก</button>
                    <button className="btn btn-primary">บันทึก</button>
                </div>

            </div>

        </ReactModal>
    )
}

export default Modal_vehicle_parts_add;