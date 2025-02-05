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
          <p className="fw-medium">ข้อมูลการจับคู่รถหัวลากและรถหางลาก</p>
          <button className="btn-animated" onClick={handlePairingOpenModal}>
            <i className="bi bi-pencil-fill"></i>
          </button>
        </div>
        <div className="card-body">
          {/* เนื้อหาภายใน */}

          {/* สามารถแสดงข้อมูลจาก dataVehicle ได้ */}
          <div className="card">
            <div className="card-body">
              <div className="row">

                {/* จัด icon ให้อยู่กลาง col */}
                <div className="col-lg-2 d-flex align-items-center justify-content-center">
                  <p><i className="bi bi-car-front-fill fs-3"></i></p>
                </div>

                {/* ข้อมูลทะเบียนรถ */}
                <div className="col-lg-7">
                  <p>ทะเบียนรถหัวลาก: <strong>xxxxx</strong> </p>
                  <p>ทะเบียนรถหางลาก: <strong>xxxxx</strong> </p>
                </div>

                {/* ปุ่มลบ */}
                <div className="col-lg-3 text-end">
                  <button
                    className="btn btn-sm mx-1 action-btn delete-btn"
                    onClick={() => handleDelete(rowD.driver_assignment_id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>

              </div>
            </div>
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
