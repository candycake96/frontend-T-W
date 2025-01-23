import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const EditImageEmployees = ({ isOpen, onClose, emp }) => {
    // ตั้งค่าภาพเริ่มต้นจากข้อมูลพนักงาน
    const [preview, setPreview] = useState(null);

    // อัปเดต preview เมื่อ emp เปลี่ยนค่า
    useEffect(() => {
        if (emp?.image) {
            setPreview(`/uploads/${emp.image}`);
        } else {
            setPreview(null);
        }
    }, [emp]);

    // ฟังก์ชันจัดการอัปโหลดรูป
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Edit Employee"
            style={{
                content: {
                    width: "90%",
                    maxWidth: "500px",
                    height: "500px",
                    margin: "auto",
                    padding: "20px",
                    border: "none",
                    borderRadius: "10px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                },
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
            }}
        >
            <div className="mb-3">
                <p><i className="bi bi-image-fill"></i> กรุณาเลือกรูปภาพ </p>
            </div>
            <div style={{ textAlign: "center" }} className="mb-3">
                <div
                    style={{
                        position: "relative",
                        width: "250px",
                        height: "250px",
                        borderRadius: "50%",
                        border: "3px solid #ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "auto",
                        overflow: "hidden",
                        backgroundColor: "#f8f8f8",
                    }}
                >
                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                position: "absolute",
                            }}
                        />
                    ) : (
                        <span style={{ color: "#aaa", fontSize: "14px" }}>No Image</span>
                    )}

                    {/* ปุ่มอัปโหลดรูป */}
                    <label
                        htmlFor="image-upload"
                        style={{
                            position: "absolute",
                            bottom: "20px",
                            right: "20px",
                            backgroundColor: "#f4d03f",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "60px",
                            height: "60px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                            fontSize: "20px",
                        }}
                    >
                        +
                    </label>

                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                </div>
            </div>

            <div>
                <button className="btn" style={{ background: "#4CAF50" }}>บันทึก</button>
            </div>
        </Modal>
    );
};

export default EditImageEmployees;
