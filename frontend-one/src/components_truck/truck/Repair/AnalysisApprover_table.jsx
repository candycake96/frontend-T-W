import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./pagination.css"; // คุณสามารถสร้างไฟล์นี้เพื่อปรับขนาดปุ่มให้เล็กลง

const itemsPerPage = 20;

const AnalysisApprover_table = ({ analysisData = [] }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('th-TH', options);
    };

    const pageCount = Math.ceil(analysisData.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentItems = analysisData.slice(offset, offset + itemsPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <>
            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>เลขเอกสาร</th>
                            <th>วันที่แจ้ง</th>
                            <th>ประเภทงาน</th>
                            <th>สถานะ</th>
                            <th>ทะเบียนรถ</th>
                            <th className="text-center">การดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.request_no}</td>
                                    <td>{formatDate(data.request_date)}</td>
                                    <td>{data.job_type || '-'}</td>
                                    <td>
                                        <span className="badge bg-warning text-dark">
                                            {data.status}
                                        </span>
                                    </td>
                                    <td>{data.reg_number}</td>
                                    <td className="text-center">
                                        <Link
                                            to="/truck/MaintenanceJob"
                                            state={{ ...data, fromPage: 'SupervisorApprove' }}
                                            className="btn btn-sm btn-primary"
                                        >
                                            <i className="bi bi-eye me-1"></i> ตรวจสอบ
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-muted">
                                    ไม่มีข้อมูลรอการตรวจสอบ
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {pageCount > 1 && (
                <div className="d-flex justify-content-center mt-3">
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination pagination-sm"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        nextClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextLinkClassName={"page-link"}
                        activeClassName={"active"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                    />
                </div>
            )}
        </>
    );
};

export default AnalysisApprover_table;
