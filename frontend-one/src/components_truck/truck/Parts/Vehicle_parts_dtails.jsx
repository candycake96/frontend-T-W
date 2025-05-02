import React, { useState } from "react";
import Modal_vehicle_parts_add from "./Modal/Modal_vehicle_parts_add";

const Vehicle_parts_details = () => {

    // const [isCardPartsAdd, setCardPartsAdd] = useState(false);   
    // const handleOpenCardPartsAdd = () => {
    //     setCardPartsAdd(true);
    // }

        const [isOpenModalParteAdd, setOpenModalPartsAdd] = useState(false);
        const handleOpenModalPartsAdd = () => {
            setOpenModalPartsAdd(true);
        }
        const handleClossModalpartsAdd = () => {
            setOpenModalPartsAdd(false);
        }

    return(
        <>
        <div className="container">
            <div className="p-3">
                <div className="mb-3">
                    <div className="">
                        <p className="fw-bolder fs-5">
                            ข้อมูลราคากลางอะไหล่
                        </p>
                    </div>
                </div>

                <hr className="mb-3" />

            <div className="mb-3">
                <div className="">
                    <div className="">
                        {/* <button className="btn btn-primary">เพิ่มระบบรถ</button> */}
                        <button className="btn btn-primary" onClick={()=>handleOpenModalPartsAdd()} >เพิ่มข้อมูลอะไหล่</button>
                    </div>
                </div>
            </div>    

            <div className="mb-3">
                <div className="card">
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>ระบบ</th>
                                    <th>อะไหล่</th>
                                    <th>ราคา</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                </div>        
            </div>
        </div>
        {isOpenModalParteAdd && (
            <Modal_vehicle_parts_add isOpen={isOpenModalParteAdd} onClose={handleClossModalpartsAdd} />
        )}
        </>
    )
}


export default Vehicle_parts_details;