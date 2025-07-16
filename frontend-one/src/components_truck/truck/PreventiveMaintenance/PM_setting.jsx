import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Modal_item_add from "./Modal/Modal_item_add";
import { apiUrl } from "../../../config/apiConfig";
import axios from "axios";

const PM_setting = () => {
  const location = useLocation();
  const isRowModelsData = location.state || {};

  const [isItemData, setItemData] = useState([]);
  const distances = [1000, 2000, 3000, 4000];

  const [pmMatrix, setPmMatrix] = useState({});

  // ดึงรายการจาก backend
  const fetchItemList = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/setting_mainternance_item_show`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setItemData(response.data);
    } catch (error) {
      console.error("Error fetching Item: ", error);
    }
  };

  useEffect(() => {
    fetchItemList();
  }, []);

  // อัปเดต pmMatrix โดยไม่ลบค่าที่ติ๊กไว้เดิม
  useEffect(() => {
    if (isItemData.length > 0) {
      setPmMatrix((prevMatrix) => {
        const newMatrix = { ...prevMatrix };

        isItemData.forEach((item) => {
          if (!newMatrix[item.item_name]) {
            newMatrix[item.item_name] = {};
            distances.forEach((km) => {
              newMatrix[item.item_name][km] = false;
            });
          }
        });

        return newMatrix;
      });
    }
  }, [isItemData]);

  // toggle checkbox
  const toggleCheckbox = (type, km) => {
    setPmMatrix((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [km]: !prev[type][km],
      },
    }));
  };

  // บันทึก PM Matrix
  const handleSubmit = async () => {
    console.log("PM Matrix Data:", pmMatrix);
    try {
      await axios.post(`${apiUrl}/api/pm_matrix/save`, {
        model_id: isRowModelsData.model_id,
        matrix: pmMatrix,
      });
      alert("บันทึกแผน PM สำเร็จ");
    } catch (err) {
      console.error("Save error:", err);
      alert("เกิดข้อผิดพลาดในการบันทึกแผน PM");
    }
  };

  const [isOpenModalItemAdd, setOpenModalItemAdd] = useState(false);
  const handleOpenModalItemAdd = () => setOpenModalItemAdd(true);
  const handleClosModalItemAdd = () => setOpenModalItemAdd(false);

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <Button className="btn-sm me-1" onClick={handleOpenModalItemAdd}>
          เพิ่มข้อมูลรายการ
        </Button>
        <Button className="btn-sm">เพิ่มข้อมูลระยะทาง</Button>
      </div>

      <div>
        <p><strong>รุ่น : </strong>{isRowModelsData?.model}</p>
        <p><strong>ยี่ห้อ : </strong>{isRowModelsData?.brand}</p>
      </div>

      <h4>ตั้งค่าตาราง PM ตามระยะ</h4>
      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>รายการ</th>
            {distances.map((km) => (
              <th key={km}>{km} กม.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isItemData.map((item) => (
            <tr key={item.item_id}>
              <td className="text-start">{item.item_name}</td>
              {distances.map((km) => (
                <td key={km}>
                  <input
                    type="checkbox"
                    checked={pmMatrix?.[item.item_name]?.[km] || false}
                    onChange={() => toggleCheckbox(item.item_name, km)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        บันทึกแผน PM
      </button>

      {isOpenModalItemAdd && (
        <Modal_item_add
          isOpen={isOpenModalItemAdd}
          onClose={handleClosModalItemAdd}
          onItemAdded={() => {
            fetchItemList(); // ดึงข้อมูลใหม่
          }}
        />
      )}
    </div>
  );
};

export default PM_setting;
