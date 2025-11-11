import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Table_mainternance_timeline = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 20;

    function formatDateThai(dateStr) {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.toLocaleString("th-TH", { month: "short" });
        const year = date.getFullYear() ;
        return `${day} ${month} ${year}`;
    }

    useEffect(() => {
        axios
            .get("http://localhost:3333/api/mainternance_report_details_all", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, []);

    // ฟังก์ชันช่วยแสดงประเภทซ่อม
    const renderRepairType = (item) => {
        const types = [];
        if (item.is_pm) types.push("PM");
        if (item.is_cm) types.push("CM");
        return types.length > 0 ? types.join(", ") : "-";
    };

    // แบ่งข้อมูลตามหน้า
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    return (
        <>

            <div className="mb-3">
                <div className="card shadow-sm border-0 rounded-3">
                    <div className="card-header bg-light fw-bold">
                        🔎 ค้นหา / กรองข้อมูล
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-lg-3">
                                <label htmlFor="startDate" className="form-label">
                                    วันเริ่มต้น
                                </label>
                                <input type="date" id="startDate" className="form-control" />
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="endDate" className="form-label">
                                    วันสิ้นสุด
                                </label>
                                <input type="date" id="endDate" className="form-control" />
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="regNumber" className="form-label">
                                    เลขป้ายทะเบียน
                                </label>
                                <input type="text" id="regNumber" className="form-control" placeholder="เช่น 1กก1234" />
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="system" className="form-label">
                                    ระบบ
                                </label>
                                <select id="system" className="form-select">
                                    <option value="">-- เลือก --</option>
                                    <option value="engine">เครื่องยนต์</option>
                                    <option value="suspension">ช่วงล่าง</option>
                                    <option value="electrical">ระบบไฟฟ้า</option>
                                </select>
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="garage" className="form-label">
                                    อู่ซ่อม/ร้าน
                                </label>
                                <input type="text" id="garage" className="form-control" placeholder="ค้นหาชื่ออู่" />
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="system" className="form-label">
                                    เคดิต/เงินสด
                                </label>
                                <select id="system" className="form-select">
                                    <option value="">-- เลือก --</option>
                                    <option value="engine">เคดิต</option>
                                    <option value="suspension">เงินสด</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-3 d-flex justify-content-end gap-2">
                            <button className="btn btn-outline-secondary">
                                <i className="bi bi-x-circle"></i> ล้างค่า
                            </button>
                            <button className="btn btn-primary">
                                <i className="bi bi-search"></i> ค้นหา
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <table className="table table-hover table-striped mb-0">
                <thead className="table-info">
                    <tr>
                        <th>ลำดับ</th>
                        <th>เลขเอกสาร</th>
                        <th>ประเภทซ่อม</th>
                        <th>วันที่แจ้งซ่อม</th>
                        <th>ทะเบียนรถ</th>
                        <th>ประเภทรถ</th>
                        <th>ผู้แจ้ง</th>
                        <th>ยอดรวม</th>
                        <th>สถานะ</th>
                        <th><i className="bi bi-body-text"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((item, index) => (
                        <tr key={item.request_id}>
                            <td>{indexOfFirstRow + index + 1}</td>
                            <td>{item.request_no}</td>
                            <td>{renderRepairType(item)}</td>
                            <td>
                                {item.request_date
                                    ? formatDateThai(item.request_date)
                                    : "-"}
                            </td>
                            <td>{item.reg_number}</td>
                            <td>{item.car_type_name}</td>
                            <td>{item.request_emp_name}</td>
                            <td>{item.total_with_vat?.toLocaleString() ?? 0}</td>
                            <td>{item.status}</td>
                            <td>
                                <Link
                                    to="/truck/MaintenanceJob"
                                    state={{ ...item, fromPage: 'SupervisorApprove' }}
                                    className="btn btn-sm btn-primary"
                                >
                                    <i class="bi bi-three-dots-vertical"></i>
                                    {/* ตรวจสอบ */}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ปุ่ม pagination */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                    <nav>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                >
                                    ก่อนหน้า
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, i) => (
                                <li
                                    key={i}
                                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                            <li
                                className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                >
                                    ถัดไป
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
};

export default Table_mainternance_timeline;
