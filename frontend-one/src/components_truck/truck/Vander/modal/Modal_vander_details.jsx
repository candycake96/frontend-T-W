import React from "react";
import ReactModal from "react-modal";

const Modal_vander_details = ({isOpen, onClose}) => {
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
        <div className="text-center">
            <p className="fw-bolder">ข้อมูลผู้จำหน่าย (อู่ซ่อม) </p>
        </div>
        </ReactModal>
    )
}

export default Modal_vander_details;
