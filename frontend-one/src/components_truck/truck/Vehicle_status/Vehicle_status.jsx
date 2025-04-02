import React from "react";
import { useLocation } from "react-router-dom";
import CardDetailsVehicle from "../Vehicle/expanded/CardDetailsVehicle";
const Vehicle_status = () => {
    const location = useLocation();
    const { data } = location.state || {};
return (
    <>
    <div className="container">
        <div className="text-center fw-bolder fs-5 p-3 mb-3">
            <p>ข้อมูลรถ {data.status}</p>
        </div>
        <div className="card">            
            <div className="card-body">
<CardDetailsVehicle dataVehicle={data}/>

            </div>
        </div>
    </div>
    </>
)
}

export default Vehicle_status;

