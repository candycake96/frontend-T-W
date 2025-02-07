import React from "react";
import VehicleTable from "./VehicleTable";


const VehicleManagement = () => {
    return (
        <div className="container">
            <div className="p-3">
                <div className="text-center">
                    <p className="fs-3">ระบบจัดการข้อมูลรถ</p>
                </div>
                <hr />
            </div>



            <div className="">
                <VehicleTable/>
            </div>
        </div>
    );
};

export default VehicleManagement;
