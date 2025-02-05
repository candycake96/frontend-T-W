import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowVhicleDetailsExpanded from "./expanded/ShowVhicleDetailsExpanded";

const VehicleTable = () => {
    const [isVehicleDetails, setVehicleDetails] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null); // เก็บ ID ของแถวที่เปิดอยู่

    const fetchVehicleTable = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3333/api/vehicleget`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            setVehicleDetails(response.data);
        } catch (error) {
            console.error("Error fetching vehicle data:", error);
        }
    };

    useEffect(() => {
        fetchVehicleTable();
    }, []);

    const toggleRow = (id) => {
        setExpandedRow(expandedRow === id ? null : id); // 🔹 สลับเปิด-ปิดแถว
    };

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ทะเบียนรถ</th>
                        <th>ยี่ห้อรถ</th>
                        <th>รุ่นรถ</th>
                        <th>ประเภทรถ</th>
                        <th>สถานะ</th>
                        <th>สาขา</th>
                        <th>พขร.ขับล่าสุด</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {isVehicleDetails.map((rowVD, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td className="col-1">{rowVD.reg_number}</td>
                                <td>{rowVD.car_brand}</td>
                                <td>{rowVD.model_no}</td>
                                <td>{rowVD.car_type_name}</td>
                                <td className="col-1">{rowVD.status}</td>
                                <td>{rowVD.name_branch}</td>
                                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
    <span style={{ color: "Green", fontSize: "2rem", marginRight: "8px" }}>•</span> 
    xxxxx
</td>

                                <td className="col-lg-1">
                                    {/* <button className="btn col-lg-6" style={{ color: '#f4d03f' }}>
                                        <i className="bi bi-pencil-fill"></i>
                                    </button> */} 
                                    <button
                                        className="btn col-lg-6"
                                        style={{ color: '#2980b9' }}
                                        onClick={() => toggleRow(rowVD.reg_id)} // 🔹 Toggle แถว
                                    >
                                        {expandedRow === rowVD.reg_id ? (
                                            <i className="bi bi-chevron-up"></i>
                                        ) : (
                                            <i className="bi bi-chevron-down"></i>
                                        )}
                                    </button>
                                </td>
                            </tr>

                            {/* ✅ แถวแสดงข้อมูลเพิ่มเติม */}
                            {expandedRow === rowVD.reg_id && (
                                <tr>
                                    <td colSpan="12">
                                        <ShowVhicleDetailsExpanded dataVehicle={rowVD} />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default VehicleTable;
