import React from "react";
import ReactModal from "react-modal";

const Modal_vehicle_madels_edit = ({ isOpen, onClose }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            contentLabel="เพิ่มยี่ห้อรุ่นรถ"
            style={{
                content: {
                    width: "100%",
                    maxWidth: "500px",
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
            <div className="modal-header bg-light border-bottom">
                <h5 className="modal-title fw-bold m-0">เพิ่มยี่ห้อ / รุ่นรถ</h5>
                <button onClick={onClose} className="btn-close"></button>
            </div>

        </ReactModal>
    );
}

export default Modal_vehicle_madels_edit;