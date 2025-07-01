import React, { useEffect, useState } from "react";
import AnalysisApprover_table from "./AnalysisApprover_table";
import axios from "axios";
import { apiUrl } from "../../../config/apiConfig";

const MainternanceAnalysisApprover_table_main = () => {
const [analysisData, setAnalysisData] = useState([]);
const [filterType, setFilterType] = useState("pending");
const [loading, setLoading] = useState(false); // ✅ เพิ่มบรรทัดนี้


   const fetchAnalysisTable = async () => {
    let endpoint = "";
    if (filterType === "pending") {
        endpoint = "/api/RepairAnalysisPending";
    } else if (filterType === "approved") {
        endpoint = "/api/RepairAnalysisApproved";
    } else if (filterType === "finished") {
        endpoint = "/api/RepairAnalysisFinished";
    }

    setLoading(true);
    setAnalysisData([]); // ✅ เคลียร์ข้อมูลก่อนโหลดใหม่

    try {
        const response = await axios.get(`${apiUrl}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        setAnalysisData(response.data);
    } catch (error) {
        console.error("Error fetching analysis data:", error);
    } finally {
        setLoading(false);
    }
};


    useEffect(() => {
        fetchAnalysisTable();
    }, [filterType]); // เรียกใหม่เมื่อ filter เปลี่ยน

    return (
        <div className="container py-3">
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div>
                        <h5 className="fw-bold text-primary mb-1">
                            ตรวจสอบแผนกซ่อมบำรุง
                        </h5>
                        <p className="text-muted mb-0">
                            รายงานและผลวิเคราะห์งานซ่อมบำรุงจากการตรวจสอบ
                        </p>
                    </div>

                    <div className="btn-group" role="group">
                        <button
                            className={`btn btn-sm ${filterType === "pending" ? "btn-success" : "btn-outline-success"}`}
                            onClick={() => setFilterType("pending")}
                        >
                            <i className="bi bi-clock me-1"></i> รออนุมัติผลตรวจ
                        </button>
                        <button
                            className={`btn btn-sm ${filterType === "approved" ? "btn-success" : "btn-outline-success"}`}
                            onClick={() => setFilterType("approved")}
                        >
                            <i className="bi bi-check2-circle me-1"></i> อนุมัติแล้ว
                        </button>
                        <button
                            className={`btn btn-sm ${filterType === "finished" ? "btn-success" : "btn-outline-success"}`}
                            onClick={() => setFilterType("finished")}
                        >
                            <i className="bi bi-archive me-1"></i> ประวัติงานที่จบ
                        </button>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <AnalysisApprover_table analysisData={analysisData} loading={loading} />

                </div>
            </div>
        </div>
    );
};

export default MainternanceAnalysisApprover_table_main;
