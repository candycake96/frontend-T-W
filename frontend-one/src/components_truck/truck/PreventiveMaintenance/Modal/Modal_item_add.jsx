import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import { apiUrl } from "../../../../config/apiConfig";
import { Button } from "react-bootstrap";

const Modal_item_add = ({ isOpen, onClose, onItemAdded }) => {
  const [itemName, setItemName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isItemData, setItemData] = useState([]);
  const [editId, setEditId] = useState(null); // 🆕 สำหรับตรวจสอบว่าอยู่ในโหมดแก้ไข
    
  const fetchItemList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/setting_mainternance_item_show`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setItemData(response.data);
    } catch (error) {
      console.error("Error fetching Item: ", error);
    }
  };

  useEffect(() => {
    fetchItemList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemName.trim()) return alert("กรุณากรอกชื่อรายการซ่อม");

    try {
      setLoading(true);
      if (editId) {
        // โหมดแก้ไข
        await axios.put(
          `${apiUrl}/api/setting_mainternance_item_update/${editId}`,
          { item_name: itemName },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      } else {
        // โหมดเพิ่ม
        await axios.post(
          `${apiUrl}/api/setting_mainternance_item_add`,
          { item_name: itemName },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      }

      setItemName("");
      setEditId(null);
      onItemAdded?.();
      fetchItemList();
    } catch (err) {
      console.error("เกิดข้อผิดพลาด:", err);
      alert("ไม่สามารถบันทึกข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setItemName(item.item_name);
    setEditId(item.item_id);
  };

  const cancelEdit = () => {
    setItemName("");
    setEditId(null);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        cancelEdit();
        onClose();
      }}
      ariaHideApp={false}
      contentLabel="เพิ่ม/แก้ไขรายการซ่อม"
      style={{
        content: {
          width: "100%",
          maxWidth: "700px",
          margin: "auto",
          borderRadius: "0.75rem",
          padding: "0",
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
      <div className="modal-header bg-primary text-white p-3">
        <h5 className="modal-title fw-bold mb-0">
          <i className="bi bi-tools me-2"></i>
          {editId ? "แก้ไขรายการซ่อม" : "เพิ่มรายการซ่อม"}
        </h5>
        <button onClick={onClose} className="btn-close btn-close-white"></button>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-3">
          <label className="form-label fw-semibold">ชื่อรายการซ่อม</label>
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
          {editId && (
            <button type="button" className="btn btn-outline-secondary me-2" onClick={cancelEdit}>
              ยกเลิกการแก้ไข
            </button>
          )}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "กำลังบันทึก..." : editId ? "อัปเดต" : "บันทึก"}
          </button>
        </div>
      </form>

      <div className="p-4 pt-0">
        <h6 className="fw-bold">รายการซ่อมที่มีอยู่</h6>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ลำดับ</th>
                <th>รายการ</th>
                <th className="text-end">แก้ไข</th>
              </tr>
            </thead>
            <tbody>
              {isItemData.map((data, index) => (
                <tr key={data.item_id}>
                  <td>{index + 1}</td>
                  <td>{data.item_name}</td>
                  <td className="text-end">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEdit(data)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </td>
                </tr>
              ))}
              {isItemData.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    ไม่มีรายการซ่อม
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal_item_add;
