import React from "react";
import ReactModal from "react-modal";

const Modal_Insurance_Edit = ({isOpen, onClose, onData}) => {
    if(!onData) return null;

// ฟังก์ชันแปลงวันที่
const formatDate = (dateString) => {
    const date = new Date(dateString); // สร้างอ็อบเจกต์ Date จากวันที่ที่ได้รับ
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('th-TH', options); // แสดงผลในรูปแบบวัน เดือน ปี (ภาษาไทย)
};

    return (
        <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        // contentLabel="แก้ไขข้อมูล"
        style={{
            content: {
                width: "100%",
                maxWidth: "950px",
                maxHeight: "65vh",
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
                <div className="text-center mb-3">
                    <p className="fw-bolder">test modal Edit</p>
                </div>
                <div className="">
                    <form action="">

                    </form>
                </div>
            </div>

        {formatDate(onData.insurance_start_date)}

        </ReactModal>
    )
}


export default Modal_Insurance_Edit;


