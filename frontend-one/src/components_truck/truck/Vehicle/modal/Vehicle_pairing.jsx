import React from "react";
import Modal from "react-modal";

const Vehicle_pairing = ({ isOpen, onClose, dataVehicle }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose} // ให้ Modal ปิดได้เมื่อคลิกข้างนอก
            contentLabel="Vehicle Pairing Modal"
            shouldCloseOnOverlayClick={true} // ปิด Modal ได้เมื่อกดนอกกรอบ
            ariaHideApp={false} // ถ้า error อยู่ที่ aria
        >
            <h2>จับคู่รถ</h2>
            <button onClick={onClose}>ปิด</button>
        </Modal>
    );
};

export default Vehicle_pairing;
