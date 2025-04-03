import React, { useState } from "react";
import ReactModal from "react-modal";

const Modal_Edit_Password = ({ isOpen, onClose, onData }) => {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false); // สถานะการแสดงข้อมูล

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (formData.password !== formData.confirmPassword) {
            alert("รหัสผ่านไม่ตรงกัน!");
            return;
        }
        // ส่งข้อมูลไปยัง API หรือ parent component
        console.log("รหัสผ่านใหม่:", formData.password);
        onClose(); // ปิด Modal
    };

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword); // เปลี่ยนสถานะการแสดงรหัสผ่าน
    };

    

    if (!onData) return null;

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            contentLabel="เปลี่ยนรหัสผ่าน"
            style={{
                content: {
                    width: "100%",
                    maxWidth: "600px",
                    height: "auto",
                    margin: "auto",
                    padding: "20px",
                    border: "none",
                    borderRadius: "10px",
                    overflowY: "auto",
                },
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999,
                },
            }}
        >
            <div className="text-center mb-3">
                <h5 className="fw-bolder">เปลี่ยนรหัสผ่านเข้าใช้งาน</h5>
            </div>
            <div className="row">
                <div className="col-12 mb-3">
                    <label htmlFor="password" className="form-label fw-medium">รหัสผ่าน</label>
                    <input
                        type={showPassword ? "text" : "password"} // ถ้าติ๊กให้แสดงรหัสผ่าน
                        id="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="confirmPassword" className="form-label fw-medium">ยืนยันรหัสผ่าน</label>
                    <input
                        type={showPassword ? "text" : "password"} // ถ้าติ๊กให้แสดงรหัสผ่าน
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-control"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="showPasswordCheckbox"
                    checked={showPassword}
                    onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="showPasswordCheckbox">
                    แสดงรหัสผ่าน
                </label>
            </div>
            <div className="text-center">
                <button className="btn btn-primary w-100" onClick={handleSubmit}>บันทึก</button>
            </div>
        </ReactModal>
    );
};

export default Modal_Edit_Password;
