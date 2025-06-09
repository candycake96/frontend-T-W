import React from "react";

const MainternanceAnanlysis_Add = ({maintenanceJob}) => {

    const [analysisData, setAnalysisData] = React.useState({
        reporter: "",
        planning_vehicle_availability: "",
        urgentRepair: false,
        inhouseRepair: false,
        sendToGarage: false,
        planDate: "",
        remark: ""
    });

    const handleChangeAnalysis = (e) => {
        const { name, value, type, checked } = e.target;
        setAnalysisData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };
    


    return (
        <div className="card mb-4 shadow-sm border-0">
            <div className="card-header   fw-bold fs-5">
                ความเห็นของแผนกซ่อมบำรุง {maintenanceJob ? maintenanceJob.job_number : "ไม่ระบุ"}
            </div>
            <div className="card-body">
                <div className="row mb-3" >
                    <div className="col-lg-4 mb-3">
                        <label htmlFor="reporter" className="form-label">
                            ผู้ตรวจเช็ครถ <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            name="reporter"
                            id="reporter"
                            className="form-control"
                            readOnly
                            disabled
                            value=""
                        />
                    </div>
                    <div className="col-lg-8 mb-3">
                        <label className="form-label mb-2">ประเภทการซ่อม</label>
                        <div className="d-flex gap-4">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="availableNow"
                                    name="planning_vehicle_availability"
                                    value="available"
                                />
                                <label className="form-check-label" htmlFor="availableNow">
                                    PM (ซ่อมก่อนเสีย)
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="notAvailable"
                                    name="planning_vehicle_availability"
                                    value="not_available"
                                />
                                <label className="form-check-label" htmlFor="notAvailable">
                                    CM (เสียก่อนซ่อม)
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <label className="form-label mb-2">แนวทางการดำเนินงาน</label>
                    <div className="col-lg-3 mb-2">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="urgentRepair"
                                name="urgentRepair"
                            />
                            <label className="form-check-label ms-2" htmlFor="urgentRepair">
                                จำเป็นต้องซ่อมด่วนทันที
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-3 mb-2">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="inhouseRepair"
                                name="inhouseRepair"
                            />
                            <label className="form-check-label ms-2" htmlFor="inhouseRepair">
                                แผนกช่างซ่อมเองได้
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-3 mb-2">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="sendToGarage"
                                name="sendToGarage"
                            />
                            <label className="form-check-label ms-2" htmlFor="sendToGarage">
                                ต้องส่งอู่
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-lg-3 mb-3">
                        <label htmlFor="planDate" className="form-label">
                            ตั้งแต่วันที่
                        </label>
                        <input
                            type="date"
                            name="planDate"
                            id="planDate"
                            className="form-control"
                        />
                         <div className="col-lg mb-2">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="is_quotation_required "
                                name="is_quotation_required "
                            />
                            <label className="form-check-label ms-2" htmlFor="is_quotation_required ">
                                ใบเสนอราคา
                            </label>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-9 mb-3">
                        <label htmlFor="remark" className="form-label">
                            หมายเหตุ
                        </label>
                        <textarea
                            name="remark"
                            id="remark"
                            className="form-control"
                            rows={2}
                            placeholder="ระบุหมายเหตุเพิ่มเติม (ถ้ามี)"
                        ></textarea>
                    </div>
                </div>
                <div className="">
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default MainternanceAnanlysis_Add;