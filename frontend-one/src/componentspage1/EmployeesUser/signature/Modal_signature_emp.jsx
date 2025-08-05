import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Button } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import { apiUrl } from "../../../config/apiConfig";

const Modal_signature_emp = ({ isOpen, onClose, onData }) => {
    const [signatureUrl, setSignatureUrl] = useState(null);

    // ฟังก์ชันโหลดลายเซ็นจาก backend
    const fetchSignature = async () => {
        if (!onData?.id_emp) return;
        try {
            const response = await axios.get(`${apiUrl}/signatuer_show/${onData.id_emp}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            if (response.data.signature) {
                setSignatureUrl(response.data.signature); // สมมุติว่า response.data.signature คือชื่อไฟล์
            } else {
                setSignatureUrl(null);
            }
        } catch (error) {
            console.error("Error fetching signature:", error);
        }
    };

    // โหลดลายเซ็นเมื่อเปิด modal หรือเมื่อ onData เปลี่ยน
    useEffect(() => {
        if (onData?.id_emp) {
            fetchSignature();
        }
    }, [onData]);

    // ฟังก์ชันอัปโหลดลายเซ็นใหม่
    const handleUpload = async () => {
        const file = document.querySelector('input[name="signature"]').files[0];
        if (!file || !onData?.id_emp) return;

        const formData = new FormData();
        formData.append("signature", file);

        try {
            await axios.put(`${apiUrl}/api/signatuer_add/${onData?.id_emp}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            alert("อัปโหลดลายเซ็นสำเร็จ");
            fetchSignature();
        } catch (error) {
            console.error("Upload failed:", error);
            alert("อัปโหลดลายเซ็นล้มเหลว");
        }
    };

    // ฟังก์ชันลบลายเซ็น
    const handleDeleteSignature = async () => {
        if (!onData?.id_emp) return;

        try {
            await axios.delete(`${apiUrl}/signature_delete/${onData.id_emp}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            alert("ลบลายเซ็นสำเร็จ");
            setSignatureUrl(null);
        } catch (error) {
            console.error("Delete failed:", error);
            alert("ลบลายเซ็นล้มเหลว");
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            contentLabel="ลายมือชื่อผู้ใช้"
            style={{
                content: {
                    width: "100%",
                    maxWidth: "600px",
                    margin: "auto",
                    padding: "30px",
                    borderRadius: "16px",
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
            <div className="text-center mb-4">
                <h5 className="fw-bold">ลายมือชื่อผู้ใช้งาน {onData?.id_emp}</h5>
                <p className="text-muted">จัดการลายเซ็นของคุณที่นี่ ขนาดไฟล์แนะนำ 1280 x 720</p>
            </div>

            {/* แสดงลายเซ็นถ้ามี */}
            {signatureUrl ? (
                <div className="text-center mb-3">
                    <img
                        src={`${apiUrl}/uploads/emp_signature/${signatureUrl}`}
                        alt="Signature"
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                        }}
                    />
                    <div className="mt-2">
                        <Button variant="danger" size="sm" onClick={handleDeleteSignature}>
                            <FaTrash /> ลบลายเซ็น
                        </Button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-muted">ยังไม่มีลายเซ็น</p>
            )}

            {/* เลือกไฟล์ */}
            <div className="mb-3">
                <input
                    type="file"
                    name="signature"
                    accept="image/*"
                    className="form-control"
                />
            </div>

            {/* ปุ่มอัปโหลด */}
            <div className="d-flex justify-content-center gap-3">
                <Button variant="success" onClick={handleUpload}>
                    <FaPlus /> เพิ่ม / อัปโหลด
                </Button>
            </div>

            {/* ปุ่มปิด */}
            <div className="text-end mt-4">
                <Button variant="secondary" onClick={onClose}>
                    ปิด
                </Button>
            </div>
        </ReactModal>
    );
};

export default Modal_signature_emp;
