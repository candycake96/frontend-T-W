import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactModal from "react-modal";

const Modal_edit_vehicle_other = ({ isOpen, onClose, dataVehicle, onSave }) => {
  const [formData, setFormdata] = useState({
    car_type_id: "",
    id_branch: "",
    file_download: null,
  });

  const [isCarType, setCarType] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    if (dataVehicle) {
      setFormdata({
        car_type_id: dataVehicle.car_type_id || "",
        id_branch: dataVehicle.id_branch || "",
        file_download: null,
      });
    }
  }, [dataVehicle]);

  useEffect(() => {
    if (isOpen) {
      fetchCarType();
      fetchBranches();
    }
  }, [isOpen]);

  const fetchCarType = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:3333/api/detailscartype", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCarType(response.data);
    } catch (error) {
      console.error("Error fetching car types:", error);
    }
  };

  const fetchBranches = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:3333/api/getbranches", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const handleFileChange = (e) => {
    setFormdata({ ...formData, file_download: e.target.files[0] });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const formDataObj = new FormData();
      formDataObj.append("car_type_id", formData.car_type_id);
      formDataObj.append("id_branch", formData.id_branch);
      if (formData.file_download) {
        formDataObj.append("file_download", formData.file_download);
      }

      const response = await axios.post(
        `http://localhost:3333/api/update_vehicle`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Response:", response.data);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("❌ Error saving data:", error);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="แก้ไขข้อมูล"
      style={{
        content: {
          width: "100%",
          maxWidth: "950px",
          maxHeight: "50vh",
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
          <p className="fw-bolder">แก้ไขข้อมูล</p>
        </div>

        <div className="row mb-3">
          <div className="col-lg-6">
            <label htmlFor="input_car_type_id" className="form-label fw-medium">
              ประเภทรถ
            </label>
            <select
              className="form-select"
              id="input_car_type_id"
              name="car_type_id"
              value={formData.car_type_id}
              onChange={(e) => setFormdata({ ...formData, car_type_id: e.target.value })}
            >
              <option value="">เลือกประเภทรถ</option>
              {isCarType.length > 0 ? (
                isCarType.map((rowCarType) => (
                  <option key={rowCarType.car_type_id} value={rowCarType.car_type_id}>
                    {rowCarType.car_type_name}
                  </option>
                ))
              ) : (
                <option disabled>กำลังโหลด...</option>
              )}
            </select>
          </div>
          <div className="col-lg-6">
            <label htmlFor="input_id_branch" className="form-label fw-medium">
              สาขา
            </label>
            <select
              className="form-select"
              id="input_id_branch"
              name="id_branch"
              value={formData.id_branch}
              onChange={(e) => setFormdata({ ...formData, id_branch: e.target.value })}
            >
              <option value="">เลือกสาขา</option>
              {branches.length > 0 ? (
                branches.map((rowBranches) => (
                  <option key={rowBranches.id_branch} value={rowBranches.id_branch}>
                    {rowBranches.name_branch}
                  </option>
                ))
              ) : (
                <option disabled>กำลังโหลด...</option>
              )}
            </select>
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="input_file_download" className="form-label fw-medium">
              ไฟล์สแกนเอกสารรถ (ถ้ามี)
            </label>
            <input
              type="file"
              id="input_file_download"
              className="form-control"
              name="file_download"
              onChange={handleFileChange}
            />
          </div>
          <div className="text-center">
            <button className="btn Teal-button" onClick={handleSave}>
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal_edit_vehicle_other;
