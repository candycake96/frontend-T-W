import React from "react";
import AnalysisApprover_table from "./AnalysisApprover_table";

const MainternanceAnalysisApprover_table_main = () => {
    
    return (
        <>
            <div className="container">
                <div className="">
                    <div className="">
                        <div>
                            <h2 className="fw-bold fs-5 mb-0">ตรวจสอบแผนกซ่อมบำรุง</h2>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <p className="text-muted mb-2">
                                    รายงานและผลวิเคราะห์งานซ่อมบำรุงจากการตรวจสอบ
                                </p>
                                <button className="btn btn-primary  btn-sm">
                                    <i className="bi bi-plus-lg me-1"></i> ข้อมูลวิเคราะห์ซ่อมบำรุงต้องการอนุมัติ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <AnalysisApprover_table />
            </div>
        </>
    )
}
export default MainternanceAnalysisApprover_table_main;