import React from "react";
import { Link } from "react-router-dom";

const RepairCloseListTable = ({ data, loading }) => {
    if (loading) return null;

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
                <thead className="table-light">
                    <tr>
                        <th>เลขที่ใบแจ้ง</th>
                        <th>ทะเบียนรถ</th>
                        <th>วันที่แจ้ง</th>
                        <th>สถานะ</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.request_id}>
                                <td>{item.request_no}</td>
                                <td>{item.reg_number}</td>
                                <td>{item.request_date}</td>
                                <td>{item.status}</td>
                                <td>
                                    <Link to={`/repair-close/${item.request_id}`}>
                                        <button className="btn btn-sm btn-success">
                                            <i className="bi bi-check-circle me-1"></i> ปิดงาน
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center text-muted">
                                ไม่มีรายการที่รอปิดงาน
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RepairCloseListTable;
