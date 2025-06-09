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
                        <div className="flex-grow-1 me-3" style={{ minWidth: '200px' }}>
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
                    </div>
                </div>
            </div>
        </>
    );
}
export default MainternanceAnanlysis_ShowDetails;