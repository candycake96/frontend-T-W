import React from "react";

const MainternanceAnalysisRequestJob = () => {
    return (
        <div className="container py-5" style={{ maxWidth: 700 }}>
            <div className="mb-4 text-center">
                <h2 className="fw-bold text-primary mb-2">
                    วิเคราะห์แผนกซ่อมบำรุง
                </h2>
                <p className="text-muted">
                    รายงานและวิเคราะห์งานซ่อมบำรุงที่ร้องขอในระบบ
                </p>
            </div>
            <div className="card shadow border-0">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                เลือกช่วงวันที่
                            </label>
                            <div className="d-flex gap-2">
                                <input type="date" className="form-control" />
                                <span className="align-self-center">ถึง</span>
                                <input type="date" className="form-control" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                ประเภทงานซ่อม
                            </label>
                            <select className="form-select">
                                <option>ทั้งหมด</option>
                                <option>ซ่อมด่วน</option>
                                <option>ซ่อมตามแผน</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                สถานะงาน
                            </label>
                            <select className="form-select">
                                <option>ทั้งหมด</option>
                                <option>รอดำเนินการ</option>
                                <option>กำลังดำเนินการ</option>
                                <option>เสร็จสิ้น</option>
                            </select>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary fw-bold">
                                วิเคราะห์ข้อมูล
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="mt-5">
                <div className="text-center text-secondary">
                    {/* สามารถแสดงกราฟหรือสรุปผลวิเคราะห์ที่นี่ */}
                    <i className="bi bi-bar-chart fs-1"></i>
                    <p className="mt-2">ผลการวิเคราะห์จะแสดงที่นี่</p>
                </div>
            </div>
        </div>
    );
};

export default MainternanceAnalysisRequestJob;