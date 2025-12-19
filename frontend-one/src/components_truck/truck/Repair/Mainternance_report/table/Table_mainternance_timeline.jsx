import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiUrl } from "../../../../../config/apiConfig";

const Table_mainternance_timeline = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 20;

    // ✅ state สำหรับกรองข้อมูล
    const [dataSearch, setDataSearch] = useState({
        startDate: "",
        endDate: "",
        regNumber: "",
        system: "",
        garage: "",
        paymentType: "",
    });

    // ✅ โหลดระบบรถ
    const [isDataVehicleSystem, setDataVehicleSystem] = useState([]);

    const fetchMainternanceVehicleSystem = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/systems_show_all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            setDataVehicleSystem(response.data);
        } catch (error) {
            console.error("Error fetching system data:", error);
        }
    };

    // ✅ โหลดข้อมูลทั้งหมดเริ่มต้น
    const fetchAllData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/mainternance_report_details_all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            setData(res.data);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    useEffect(() => {
        fetchAllData();
        fetchMainternanceVehicleSystem();
    }, []);

    // ✅ ฟังก์ชันแปลงวันที่แบบไทย
    function formatDateThai(dateStr) {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.toLocaleString("th-TH", { month: "short" });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    // ✅ ฟังก์ชันเปลี่ยนค่า input
    const handleChange = (e) => {
        setDataSearch({ ...dataSearch, [e.target.id]: e.target.value });
    };

    // ✅ ฟังก์ชันค้นหา
    const handleSearch = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/mainternance_repair_search`, dataSearch, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            setData(response.data);
            setCurrentPage(1);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // ✅ ฟังก์ชันล้างค่า
    const handleClear = () => {
        setDataSearch({
            startDate: "",
            endDate: "",
            regNumber: "",
            system: "",
            garage: "",
            paymentType: "",
        });
        fetchAllData();
    };

    // ✅ ประเภทซ่อม
    const renderRepairType = (item) => {
        const types = [];
        if (item.is_pm) types.push("PM");
        if (item.is_cm) types.push("CM");
        return types.length > 0 ? types.join(", ") : "-";
    };

    // ✅ Pagination
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
                                <input
                                    type="date"
                                    id="startDate"
                                    className="form-control"
                                    value={dataSearch.startDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="endDate" className="form-label">
                                    วันสิ้นสุด
                                </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    className="form-control"
                                    value={dataSearch.endDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="regNumber" className="form-label">
                                    เลขป้ายทะเบียน
                                </label>
                                <input
                                    type="text"
                                    id="regNumber"
                                    className="form-control"
                                    placeholder="เช่น 1กก1234"
                                    value={dataSearch.regNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* <div className="col-lg-3">
                                <label htmlFor="system" className="form-label">
                                    ระบบ
                                </label>
                                <select
                                    id="system"
                                    className="form-select"
                                    value={dataSearch.system}
                                    onChange={handleChange}
                                >
                                    <option value="">-- เลือก --</option>
                                    {isDataVehicleSystem.map((row, ndx) => (
                                        <option key={ndx} value={row.system_id}>
                                            {row.system_name}
                                        </option>
                                    ))}
                                </select>
                            </div> */}
                            {/* <div className="col-lg-3">
                                <label htmlFor="garage" className="form-label">
                                    อู่ซ่อม/ร้าน
                                </label>
                                <input
                                    type="text"
                                    id="garage"
                                    className="form-control"
                                    placeholder="ค้นหาชื่ออู่"
                                    value={dataSearch.garage}
                                    onChange={handleChange}
                                />
                            </div> */}
                            {/* <div className="col-lg-3">
                                <label htmlFor="paymentType" className="form-label">
                                    เคดิต/เงินสด
                                </label>
                                <select
                                    id="paymentType"
                                    className="form-select"
                                    value={dataSearch.paymentType}
                                    onChange={handleChange}
                                >
                                    <option value="">-- เลือก --</option>
                                    <option value="credit">เคดิต</option>
                                    <option value="cash">เงินสด</option>
                                </select>
                            </div> */}
                        </div>

                        <div className="mt-3 d-flex justify-content-end gap-2">

                            <button className="btn btn-outline-primary me-2">Export PDF</button>
                            <button className="btn btn-outline-success">Export Excel</button>

                            <button className="btn btn-outline-secondary" onClick={handleClear}>
                                <i className="bi bi-x-circle"></i> ล้างค่า
                            </button>
                            <button className="btn btn-primary" onClick={handleSearch}>
                                <i className="bi bi-search"></i> ค้นหา
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ ตารางข้อมูล */}
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
                    {currentRows.length > 0 ? (
                        currentRows.map((item, index) => (
                            <tr key={item.request_id}>
                                <td>{indexOfFirstRow + index + 1}</td>
                                <td>{item.request_no}</td>
                                <td>{renderRepairType(item)}</td>
                                <td>{item.request_date ? formatDateThai(item.request_date) : "-"}</td>
                                <td>{item.reg_number}</td>
                                <td>{item.car_type_name}</td>
                                <td>{item.request_emp_name}</td>
                                <td>{item.total_with_vat?.toLocaleString() ?? 0}</td>
                                <td>{item.status}</td>
                                <td>
                                    <Link
                                        to="/truck/MaintenanceJob"
                                        state={{ ...item, fromPage: "SupervisorApprove" }}
                                        className="btn btn-sm btn-primary"
                                    >
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="text-center">
                                ไม่พบข้อมูล
                            </td>
                        </tr>
                    )}
                </tbody>



            </table>

            {/* ✅ Pagination */}
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
                                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
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
