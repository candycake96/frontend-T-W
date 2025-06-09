import React from "react";

const MainternanceAnanlysis_ShowDetails = () => {
    return (
        <>
            <div className="card mb-3">
                <div className="card-body">
                    <div className="fw-bolder mb-3">
                        <p>ความเห็นของแผนกซ่อมบำรุง</p>
                    </div>

                    <div className="">
                        <div className="flex-grow-1 me-3 mb-3" style={{ minWidth: '200px' }}>
                            <div className="col-lg-3">
                                <label htmlFor="reporter" className="form-label mb-1">
                                    ผู้ตรวจเช็ครถ <strong style={{ color: 'red' }}>*</strong>
                                </label>
                                <input
                                    type="text"
                                    name="reporter"
                                    id="reporter"
                                    // value={`${detailPlanning[0]?.fname ?? ''} ${detailPlanning[0]?.lname ?? ''}`}
                                    className="form-control"
                                    readOnly
                                    disabled
                                />
                            </div>
                        </div>
                          <div className="row mb-3">
                                            <div className="col-lg-3 form-check">
                                                <input
                                                    className="form-check-input no-disable-style"
                                                    type="radio"
                                                    id="availableNow"
                                                    name="planning_vehicle_availability"
                                                    value="available"
                                                    // checked={planning.planning_vehicle_availability === "available"}
                                                    // onChange={isEditing ? handlePlanningInput : () => { }}
                                                />
                                                <label className="form-check-label" htmlFor="availableNow">
                                                    PM (ซ่อมก่อนเสีย)
                                                </label>
                                            </div>

                                            <div className="col-lg-3 form-check">
                                                <input
                                                    className="form-check-input no-disable-style"
                                                    type="radio"
                                                    id="notAvailable"
                                                    name="planning_vehicle_availability"
                                                    value="not_available"
                                                    // checked={planning.planning_vehicle_availability === "not_available"}
                                                    // onChange={isEditing ? handlePlanningInput : () => { }}
                                                />
                                                <label className="form-check-label" htmlFor="notAvailable">
                                                    CM (เสียก่อนซ่อม)
                                                </label>
                                            </div>

                                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MainternanceAnanlysis_ShowDetails;