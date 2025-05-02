import React from "react";
import ReactModal from "react-modal";

const Modal_vehicle_parts_add = ({isOpen, onClose}) => {
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
                    <div className="fw-bolder">
                        <p>เพิ่มข้อมูลอะไหล่</p>
                    </div>
                </div>
            </div>

        </ReactModal>
    )
}

export default Modal_vehicle_parts_add;