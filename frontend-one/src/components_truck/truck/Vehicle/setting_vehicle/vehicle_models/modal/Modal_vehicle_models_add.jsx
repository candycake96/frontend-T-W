import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactModal from "react-modal";
import axios from "axios";

const Modal_vehicle_models_add = ({ isOpen, onClose, onSaved }) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!brand.trim() || !model.trim()) {
      alert("กรุณากรอกยี่ห้อและรุ่นให้ครบถ้วน");
      return;
    }

    try {
      setLoading(true);
      // 👇 เปลี่ยน URL ให้ตรงกับ API ของคุณ
      await axios.post("/api/vehicle-models/add", {
        brand,
        model,
      });

      alert("บันทึกสำเร็จ");
      setBrand("");
      setModel("");
      onSaved && onSaved(); // สำหรับ refresh ข้อมูลใน parent ถ้ามี
      onClose();
    } catch (err) {
      console.error("Save error:", err);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setLoading(false);
    }
  };

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

      {/* Body */}
      <div className="p-3">
        <Form.Group className="mb-3">
          <Form.Label>ยี่ห้อ</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>รุ่น</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </Form.Group>
        <div className="text-center">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={loading}
            variant="primary"
          >
            {loading ? "กำลังบันทึก..." : "บันทึก"}
          </Button>
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal_vehicle_models_add;
