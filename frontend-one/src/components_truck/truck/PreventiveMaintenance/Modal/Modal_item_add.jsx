import { useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import { apiUrl } from "../../../../config/apiConfig";

const Modal_item_add = ({ isOpen, onClose, onItemAdded }) => {
  const [itemName, setItemName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemName.trim()) return alert("กรุณากรอกชื่อรายการซ่อม");

    try {
      setLoading(true);
      await axios.post(`${apiUrl}/api/setting_mainternance_item_add`, {
        item_name: itemName
      }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

      setItemName("");
      onItemAdded?.(); // callback ไป refresh list ด้านนอก
      onClose();
    } catch (err) {
      console.error("เพิ่มข้อมูลล้มเหลว:", err);
      alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="เพิ่มข้อมูลรายการซ่อม"
      style={{
        content: {
          width: "100%",
          maxWidth: "650px",
          height: "auto",
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
      <div className="modal-header bg-light p-3">
        <h5 className="modal-title fw-bold mb-0">เพิ่มข้อมูลรายการซ่อม</h5>
        <button
          onClick={onClose}
          className="btn-close"
          style={{ position: "absolute", right: "1rem", top: "1rem" }}
        />
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-3">
          <label className="form-label">ชื่อรายการซ่อม</label>
          <input
            type="text"
            className="form-control"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="เช่น เปลี่ยนน้ำมันเครื่อง"
            required
          />
        </div>

        <div className="text-end">
          <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
            ยกเลิก
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </form>
    </ReactModal>
  );
};

export default Modal_item_add;
