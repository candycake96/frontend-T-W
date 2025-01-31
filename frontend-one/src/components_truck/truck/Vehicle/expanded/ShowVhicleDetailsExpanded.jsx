import React from "react";
import './ShowVhicleDetailsExpanded.css'
import CardDetailsVehicle from "./CardDetailsVehicle";

const ShowVhicleDetailsExpanded = ({ dataVehicle }) => {
    if (!dataVehicle) return null;
    
    return (
        <>
            <div className="p-2">

                <div className="row mb-3">
                    <div className="col-lg-7 d-flex flex-column">
                                <CardDetailsVehicle dataVehicle={dataVehicle}/>                        
                    </div>

                    <div className="col-lg-5 d-flex flex-column">
                        <div className="card mb-3 flex-grow-1">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <p className="fw-medium">หัว + หาง</p>
                                <button className="btn-animated">
                                    <i className="bi bi-pencil-fill"></i>
                                </button>
                            </div>
                            <div className="card-body">
                                {/* เนื้อหาภายใน */}
                            </div>
                        </div>
                        <div className="card mb-3 flex-grow-1">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <p className="fw-medium">ข้อมูลคนขับ</p>
                                <button className="btn-animated">
                                    <i className="bi bi-pencil-fill"></i>
                                </button>
                            </div>
                            <div className="card-body">
                                {/* เนื้อหาภายใน */}
                            </div>
                        </div>
                    </div>
                </div>


               
            </div>

        </>
    )
}

export default ShowVhicleDetailsExpanded;