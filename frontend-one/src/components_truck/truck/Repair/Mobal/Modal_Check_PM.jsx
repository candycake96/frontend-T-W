import React from "react";
import ReactModal from "react-modal";

const Modal_Check_PM = ({isOpen, onClose}) => {
    return (
        <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose} // ป้องกันปิด Modal ขณะกำลังบันทึก
        ariaHideApp={false}
        contentLabel="Manage Vehicle Status"
        style={{
            content: {
                width: "100%",
                maxWidth: "1100px",
                maxHeight: "100%",
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

             {/* Header: ค้างด้านบน */}
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
                <h5 className="modal-title text-center fw-bolder">
                ตรวจสอบ PM
                </h5>
            </div>
{/* body */}
            <div className="p-3">
              
            </div>
        </ReactModal>
    )
}


export default Modal_Check_PM;