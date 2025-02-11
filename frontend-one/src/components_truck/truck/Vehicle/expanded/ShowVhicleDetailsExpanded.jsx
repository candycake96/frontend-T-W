import React from "react";
import './ShowVhicleDetailsExpanded.css'
import CardDetailsVehicle from "./CardDetailsVehicle";
import CardDriverRelation from "./CardDriverRelation";
import CardVehiclePairing from "./CardVehiclePairing";
import { Link } from "react-router-dom";

const ShowVhicleDetailsExpanded = ({ dataVehicle }) => {
    if (!dataVehicle) return null;

    return (
        <>
            <div className="p-2">

                <div className="row mb-3">
                    <div className="col-lg-7 d-flex flex-column">
                        <CardDetailsVehicle dataVehicle={dataVehicle} />
                    </div>

                    <div className="col-lg-5 d-flex flex-column">
                        <div className="mb-3">
                            <div className="">
                                <Link to="/truck/RepairRequestForm" className="btn " style={{ background: "Teal", color: '#ffffff' }}><i class="bi bi-tools"></i> แจ้งซ่อม</Link>
                            </div>
                        </div>

                        {(dataVehicle.car_type_id === 1 || dataVehicle.car_type_id === 2) && (
                            <CardVehiclePairing dataVehicle={dataVehicle} />
                        )}

                        <CardDriverRelation dataVehicle={dataVehicle} />
                    </div>
                </div>



            </div>

        </>
    )
}

export default ShowVhicleDetailsExpanded;