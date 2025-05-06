import React, { useState } from "react";
import ReactModal from "react-modal";
import Modal_vehicle_parts_add from "./Modal_vehicle_parts_add";

const Modal_vehicle_parts_details = ({ isOpen, onClose }) => {

    const [isOpenModalVehiclePartsAdd, setOpenModalVehiclePartsAdd] = useState(false);
   const handleOpenModalVehiclePartsAdd = () => {
    setOpenModalVehiclePartsAdd(true);
   };
   const handleClossModalVehiclePartsAdd = () => {
    setOpenModalVehiclePartsAdd(false);
   }

    
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose} // ป้องกันปิด Modal ขณะกำลังบันทึก
            ariaHideApp={false}
            contentLabel="Manage Vehicle Status"
            style={{
                content: {
                    width: "100%",
                    maxWidth: "1100px",
                    maxHeight: "100%",
                    height: "auto",
                    margin: "auto",
                    padding: "0",
                    border: "none",
                    borderRadius: "0.5rem",
                    overflowY: "auto",
                },
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            }}
        >
            <div className="p-3">
                <div className="text-center mb-3">
                    <p className="fw-bolder">
                        ค้นหาข้อมูลราคากลางอะไหล่
                    </p>
                </div>
                <div className="mb-3 col-12">
    <div className="d-flex flex-nowrap align-items-center gap-2">
        <select
            className="form-select form-select-sm"
            aria-label="Small select example"
            style={{ width: "200px" }}
        >
            <option selected>เลือกหมวดหมู่ระบบ</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>

        <div className="input-group input-group-sm" style={{ flex: 1 }}>
            <input
                type="text"
                className="form-control"
                placeholder="ค้นหาอะไหล่..."
            />
            <button className="btn btn-outline-secondary" type="button">
                <i className="bi bi-search"></i>
            </button>
        </div>

        <button className="btn btn-primary btn-sm" onClick={()=>handleOpenModalVehiclePartsAdd()}>
            <i className="bi bi-plus me-1"></i> เพิ่มข้อมูล
        </button>
    </div>
</div>


                <div className="">
                </div>
                <div className="mb-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ระบบ</th>
                                <th>อะไหล่</th>
                                <th>ยี่ห้อ</th>
                                <th>รุ่น</th>
                                <th>หน่วย</th>
                                <th>ราคา</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>ระบบเครื่องยนต์</td>
                                <td>หัวเทียน</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>0000.00</td>
                                <td>
                                    <button className="btn btn-primary btn-sm px-2 py-1">ใช้</button>
                                </td>
                            </tr>
                            <tr>
                                <td>ระบบเครื่องยนต์</td>
                                <td>หัวเทียน</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>0000.00</td>
                                <td>
                                    <button className="btn btn-primary btn-sm px-2 py-1">ใช้</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div
                    className="position-absolute"
                    style={{
                        bottom: "10px",
                        right: "20px",
                        fontSize: "0.875rem",
                        color: "#666"
                    }}
                >
                    จำนวนทั้งหมด xxxx
                </div>
            </div>

            {isOpenModalVehiclePartsAdd && (
                <Modal_vehicle_parts_add isOpen={isOpenModalVehiclePartsAdd} onClose={handleClossModalVehiclePartsAdd} />
            )}
            

        </ReactModal>
    )
}


export default Modal_vehicle_parts_details;