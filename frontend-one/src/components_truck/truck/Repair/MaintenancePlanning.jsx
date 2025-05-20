import React from "react";

const MaintenancPlanning = () => {
    return (
        <>
            <div className="container">
                <div className="p-3">
                    <div className="">
                        <p className="fw-bolder fs-4 mb-2">
                            ตรวจสอบความพร้อม
                        </p>
                        <hr className="mb-3" />
                    </div>
                    <div className="">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Job Number</th>
                                    <th>Car registration</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Reported By</th>
                                    <th>Button</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MaintenancPlanning;
