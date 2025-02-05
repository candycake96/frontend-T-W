import React from "react";
import Modal from "react-modal";

Modal.setAppElement('#root'); 

const Vehicle_pairing = ({ isOpen, onClose, dataVehicle }) => {
  if (!dataVehicle) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Vehicle Pairing Modal"
      ariaHideApp={false}
      style={{
        content: {
          width: "90vw", // ใช้เปอร์เซ็นต์ของ viewport width เพื่อความยืดหยุ่น
          maxWidth: "600px", // จำกัดขนาดสูงสุด
          height: "auto", // ใช้ auto เพื่อให้สูงตามเนื้อหา
          maxHeight: "60vh", // จำกัดความสูงไม่ให้เกิน 60% ของหน้าจอ
          margin: "auto",
          padding: "20px",
          border: "none",
          borderRadius: "0.5rem",
          overflow: "auto", // ใช้ auto เพื่อให้ scroll เมื่อเนื้อหาเยอะ
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
      <div>
        <div className="text-center mb-4">
          <p className="fw-bolder">การจับคู่ระหว่างรถหัวลากและรถหางลากในระบบขนส่ง</p>
        </div>
        <div>
          <div className="mb-3">
            <label htmlFor="input_reg_number" className="form-label fw-medium">
              หัวลากทะเบียนรถ
            </label>
            <input
              type="text"
              name="reg_number"
              id="input_reg_number"
              className="form-control"
              value={dataVehicle.reg_number}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label htmlFor="input_code" className="form-label fw-medium">
              หางลากทะเบียนรถ
            </label>
            <div className="input-group">
              <input
                type="text"
                name="code"
                id="input_code"
                className="form-control"
                placeholder="กรอกรหัสพนักงาน"
              />
              <button className="btn btn-gray" type="button">
                ตรวจสอบ
              </button>
            </div>
          </div>

          <div className="text-center">
            <button className="btn save-btn">บันทึก</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Vehicle_pairing;
