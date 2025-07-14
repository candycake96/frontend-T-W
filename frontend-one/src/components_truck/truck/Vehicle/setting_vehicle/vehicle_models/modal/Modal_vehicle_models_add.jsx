import React from "react";
import ReactModal from "react-modal";

const Modal_vehicle_madels_add = ({isOpen, onClose}) => {
    return (
        <ReactModal
         isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="ตรวจสอบ PM"
      style={{
        content: {
          width: "100%",
          maxWidth: "1100px",
          maxHeight: "90vh",
          margin: "auto",
          padding: "0",
          border: "none",
          borderRadius: "0.5rem",
          overflow: "hidden",
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
        className="modal-header bg-light border-bottom"
        style={{
          padding: "1rem",
          position: "sticky",
          top: 0,
          zIndex: 2,
        }}
      >
        <h5 className="modal-title fw-bold m-0">เพิ่มข้อมูล</h5>
        <button
          onClick={onClose}
          className="btn-close"
          style={{ marginLeft: "auto" }}
        ></button>
      </div>
        
        </ReactModal>
    )
}

export default Modal_vehicle_madels_add;