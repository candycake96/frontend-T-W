import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { Button, Form } from "react-bootstrap";

const Modal_vehicle_madels_edit = ({ isOpen, onClose, dataModels, onSave }) => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");

    useEffect(() => {
        if (dataModels) {
            setBrand(dataModels.brand || "");
            setModel(dataModels.model || "");
        }
    }, [dataModels]);

    const handleSave = () => {
        const updatedData = {
            ...dataModels,
            brand: brand.trim(),
            model: model.trim(),
        };
        onSave(updatedData);
        onClose();
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            contentLabel="แก้ไขยี่ห้อรุ่นรถ"
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
            <div className="modal-header bg-primary text-white">
                <h5 className="modal-title m-0">🛠️ แก้ไขยี่ห้อ / รุ่นรถ</h5>
                <button onClick={onClose} className="btn-close btn-close-white"></button>
            </div>

            {/* Body */}
            <div className="modal-body p-4">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>ยี่ห้อ</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="กรอกยี่ห้อรถ"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>รุ่น</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="กรอกรุ่นรถ"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </div>

            {/* Footer */}
            <div className="modal-footer border-top p-3 d-flex justify-content-end">
                <Button variant="secondary" onClick={onClose} className="me-2">
                    ยกเลิก
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    บันทึก
                </Button>
            </div>
        </ReactModal>
    );
};

export default Modal_vehicle_madels_edit;
