import React from "react";
import { Link } from "react-router-dom";

const MainternanceRequest = () => {

    return (
        <>
        <div className="container">
            <div className="p-3">
                <div className="mb-3">
                    <p className="fw-bolder fs-5">รายการแจ้งซ่อมเกี่ยวกับบำรุงรักษา</p>
                    <Link to="/truck/RepairRequestForm" className="btn btn-primary">แจ้งซ่อม</Link>
                </div>
                <hr />
            </div>
            <div className="mb-3 row">
  <div className="col-auto">
    <input type="date" name="date_start" className="form-control" />
  </div>
  <div className="col-auto">
    <input type="date" name="date_end" className="form-control" />
  </div>
  <div className="col-auto">
    <input type="text" name="job_number" className="form-control" placeholder="เลขที่งาน" />
  </div>
</div>


            <div className="card">
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Job Number</th>
                                <th>Car registration</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Button</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0000000</td>
                                <td>xxxxxxx</td>
                                <td>xxxxxxx</td>
                                <td><p style={{color: "red"}}><i class="bi bi-check-circle-fill"></i> แจ้งซ่อม</p></td>
                                <td><button className="btn btn-sm btn-outline-primary rounded-circle me-1"><i class="bi bi-grip-vertical"></i></button></td>
                            </tr>
                            <tr>
                                <td>0000000</td>
                                <td>xxxxxxx</td>
                                <td>xxxxxxx</td>
                                <td><p style={{color: "green"}}><i class="bi bi-check-circle-fill"></i> วางแผนงาน</p></td>
                                <td><button className="btn btn-sm btn-outline-primary rounded-circle me-1"><i class="bi bi-grip-vertical"></i></button></td>
                            </tr>
                            <tr>
                                <td>0000000</td>
                                <td>xxxxxxx</td>
                                <td>xxxxxxx</td>
                                <td><p style={{color: "green"}}><i class="bi bi-check-circle-fill"></i> แผนกชั่งตรวจสอบ</p></td>
                                <td><button className="btn btn-sm btn-outline-primary rounded-circle me-1"><i class="bi bi-grip-vertical"></i></button></td>
                            </tr>
                            <tr>
                                <td>0000000</td>
                                <td>xxxxxxx</td>
                                <td>xxxxxxx</td>
                                <td><p style={{color: "green"}}><i class="bi bi-check-circle-fill"></i> อนุมัติหัวหน้าแผนกชั่ง </p></td>
                                <td><button className="btn btn-sm btn-outline-primary rounded-circle me-1"><i class="bi bi-grip-vertical"></i></button></td>
                            </tr>
                            <tr>
                                <td>0000000</td>
                                <td>xxxxxxx</td>
                                <td>xxxxxxx</td>
                                <td><p style={{color: "green"}}><i class="bi bi-check-circle-fill"></i> อนุมัติงานซ่อมบำรุง </p></td>
                                <td><button className="btn btn-sm btn-outline-primary rounded-circle me-1"><i class="bi bi-grip-vertical"></i></button></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
        
        </>
    )
}

export default MainternanceRequest;
