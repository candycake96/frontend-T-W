import React from "react";
import VehicleTable from "./VehicleTable";
import { Link } from "react-router-dom";

const VehicleManagement = () => {
    return (
        <div className="container">
            <div className="p-3">
                <div className="text-center">
                    <p className="fs-3">ระบบจัดการข้อมูลรถ</p>
                </div>
                <hr />
            </div>

            <div className="p-3">
                <div className="row d-flex align-items-center gap-2">
                    <div className="col-lg-4">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ค้นหา"
                                aria-label="ค้นหา"
                                aria-describedby="button-addon1"
                            />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon1">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <select className="form-select">
                            <option selected>เลือกหมวดหมู่</option>
                            <option value="1">รถบรรทุก</option>
                            <option value="2">รถยนต์</option>
                            <option value="3">จักรยานยนต์</option>
                        </select>
                    </div>

                    <div className="col-lg-3">
                        <Link to="/truck/vehiclefrom" className="btn btn-primary w-100"><i class="bi bi-truck-front-fill"></i> เพิ่มข้อมูลรถ</Link>
                    </div>
                </div>
            </div>

            <div className="">
                <VehicleTable/>
            </div>
        </div>
    );
};

export default VehicleManagement;
