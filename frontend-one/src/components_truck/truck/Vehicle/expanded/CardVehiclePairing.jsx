import React, { useState } from "react";
import Vehicle_pairing from "../modal/Vehicle_pairing";

const CardVehiclePairing = ({ dataVehicle }) => {
  const [isPairingOpenModal, setPairingOpenModal] = useState(false);

  const handlePairingOpenModal = () => {
    if (!isPairingOpenModal) {
      setPairingOpenModal(true);
    }
  };
  
  

  const handlePairingCloseAllModal = () => {
    setPairingOpenModal(false);
  };

  return (
    <>
      <div className="card mb-3 flex-grow-1">
        <div className="card-header d-flex justify-content-between align-items-center">
          <p className="fw-medium">ข้อมูลรถหัวลาก + รถหางลาก</p>
          <button className="btn-animated" onClick={handlePairingOpenModal}>
            <i className="bi bi-pencil-fill"></i>
          </button>
        </div>
        <div className="card-body">
          {/* เนื้อหาภายใน */}
          <div className="">
            {/* สามารถแสดงข้อมูลจาก dataVehicle ได้ */}
          </div>
        </div>
      </div>
      {isPairingOpenModal && (
  <Vehicle_pairing
    isOpen={isPairingOpenModal}
    onClose={handlePairingCloseAllModal}
    dataVehicle={dataVehicle}
  />
)}



    </>
  );
};

export default CardVehiclePairing;
