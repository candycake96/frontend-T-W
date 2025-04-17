import React from "react";
import ComTop5Car from "./card_data_analysis/com_top5_car"; // ✅ เปลี่ยนชื่อ

const InsuranceDataComparison = () => {
    return (
        <div className="container">
            <div className="p-3">
                <div className="fs-4 fw-bolder">
                    <p>ตรวจสอบมูลค่าประกัน</p>
                </div>
                <hr />
            </div>

            <div className="row">
                <div className="col-lg-6">
            <ComTop5Car /> {/* ✅ ใช้ชื่อที่ขึ้นต้นด้วยตัวใหญ่ */}                    
                </div>
            </div>

        </div>
    );
};

export default InsuranceDataComparison;
