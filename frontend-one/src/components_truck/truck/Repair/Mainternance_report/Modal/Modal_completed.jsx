import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { apiUrl } from "../../../../../config/apiConfig";

const Modal_completed = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDataCompleted, setDataCompleted] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // ✅ โหลดข้อมูลจาก API
  const fetchMainternanceCompleted = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/mainternance_completed_show`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setDataCompleted(response.data);
    } catch (error) {
      console.error("Error fetching Analysis data:", error);
    }
  };

  useEffect(() => {
    fetchMainternanceCompleted();
  }, []);

  // ✅ ฟังก์ชันกรองข้อมูล
  const filteredTasks = isDataCompleted.filter((task) => {
    const search = searchTerm.toLowerCase();
    const matchSearch =
      task.reg_number?.toLowerCase().includes(search) ||
      task.request_no?.toLowerCase().includes(search) ||
      task.close_remark?.toLowerCase().includes(search);

    const matchStart = startDate ? task.close_date >= startDate : true;
    const matchEnd = endDate ? task.close_date <= endDate : true;

    return matchSearch && matchStart && matchEnd;
  });

  // ✅ คำนวณแบ่งหน้า
  const totalPages = Math.ceil(filteredTasks.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredTasks.slice(indexOfFirst, indexOfLast);

  const handleSearch = () => {
    setCurrentPage(1); // รีเซ็ตกลับหน้าแรกเมื่อค้นหา
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="ตรวจสอบ PM"
      style={{
        content: {
          width: "100%",
          maxWidth: "1100px",
          maxHeight: "90vh",
          margin: "auto",
          padding: "0",
          border: "none",
          borderRadius: "0.75rem",
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "0 0 25px rgba(0,0,0,0.2)",
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
      <div
        className="modal-header bg-success bg-opacity-10 border-bottom"
        style={{
          padding: "1rem 1.5rem",
          position: "sticky",
          top: 0,
          zIndex: 2,
        }}
      >
        <h5 className="modal-title fw-bold text-success m-0">🛠️ ซ่อมเสร็จแล้ว</h5>
        <button onClick={onClose} className="btn-close" style={{ marginLeft: "auto" }}></button>
      </div>

      {/* Body */}
      <div className="modal-body p-4" style={{ overflowY: "auto", maxHeight: "70vh" }}>
        {/* 🔍 ส่วนค้นหา */}
        <div className="d-flex flex-wrap align-items-end gap-3 mb-4">
          <div>
            <label className="form-label fw-bold mb-1">ค้นหา</label>
            <input
              type="text"
              className="form-control"
              placeholder="ทะเบียนรถ / เลขที่แจ้งซ่อม..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ minWidth: "250px" }}
            />
          </div>
          <div>
            <label className="form-label fw-bold mb-1">ตั้งแต่วันที่</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label fw-bold mb-1">ถึงวันที่</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button className="btn btn-success fw-bold" onClick={handleSearch}>
            🔍 ค้นหา
          </button>
        </div>

        {/* ตาราง */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>ทะเบียนรถ</th>
                <th>เลขที่แจ้งซ่อม</th>
                <th>วันที่ปิดงาน</th>
                <th>หมายเหตุ</th>
                <th className="text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((task, index) => (
                  <tr key={index}>
                    <td>{indexOfFirst + index + 1}</td>
                    <td>{task.reg_number}</td>
                    <td>{task.request_no}</td>
                    <td>{task.close_date?.split("T")[0]}</td>
                    <td>{task.close_remark || "-"}</td>
                    <td className="text-center">
                      <span className="badge bg-success">เสร็จแล้ว</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-3">
                    ไม่พบข้อมูล
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ แบ่งหน้า */}
        {totalPages > 1 && (
          <nav className="d-flex justify-content-center mt-3">
            <ul className="pagination mb-0">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </ReactModal>
  );
};

export default Modal_completed;
