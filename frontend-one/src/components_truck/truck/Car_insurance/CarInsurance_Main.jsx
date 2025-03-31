import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../../config/apiConfig";
import Modal_UpdateInsurance from "../Vehicle/expanded/modal/Modal_UpdateInsurance";

const CarInsurance_Main = () => {
    
    const [isDataInsuranceEnd, setDataInsuranceEnd] = useState([]);
    const [searchRegNumber, setSearchRegNumber] = useState(""); // ค่าที่กรอกในช่องค้นหาทะเบียน
    const [searchCarType, setSearchCarType] = useState(""); // ค่าที่กรอกในช่องค้นหาประเภทรถ
    const [showAll, setShowAll] = useState(false); // สถานะแสดงข้อมูลทั้งหมด

    const [isOpenModalEditInsurance, setOpenModalEditInsurance] = useState(false);
    const [dataCMIModal, setDataCMIModal] = useState(null);
    const handleOpenModalEditInsurance = (data) => {
        const { reg_id, insurance_end_date: insurance_end, insurance_start_date: insurance_start } = data;
        setDataCMIModal({ reg_id, insurance_end , insurance_start});
        setOpenModalEditInsurance(true);
    }

    const handleClesModalEditInsurance = () => {
        setOpenModalEditInsurance(false);
    }

    // ฟังก์ชันโหลดข้อมูลที่กำหนด
    const fetchInsuranceEnd = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/api/car_insurance_show`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            setDataInsuranceEnd(response.data);
        } catch (error) {
            console.error("Error fetching InsuranceEnd:", error);
        }
    }

    const fetchInsuranceEndAll = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/api/car_insurance_show_all`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            setDataInsuranceEnd(response.data);
        } catch (error) {
            console.error("Error fetching InsuranceEnd:", error);
        }
    }


    // เมื่อเริ่มต้นโหลดข้อมูล
    useEffect(() => {
        fetchInsuranceEnd();
    }, []);

    // ฟังก์ชันค้นหาข้อมูล
    const filteredData = isDataInsuranceEnd.filter(rowA => {
        return (
            (rowA.reg_number.toLowerCase().includes(searchRegNumber.toLowerCase())) &&
            (rowA.car_type_name.toLowerCase().includes(searchCarType.toLowerCase()))
        );
    });

    // ฟังก์ชันคลิกปุ่ม "all"
    const toggleDataView = () => {
        setShowAll(!showAll); // สลับสถานะ
        if (!showAll) {
            fetchInsuranceEndAll(); // ถ้ากดปุ่ม "all" จะโหลดข้อมูลทั้งหมด
        } else {
            fetchInsuranceEnd(); // ถ้ากดอีกครั้งจะกลับไปแสดงข้อมูลเดิม
        }
    }

    // ฟังก์ชันแปลงวันที่
const formatDate = (dateString) => {
    const date = new Date(dateString); // สร้างอ็อบเจกต์ Date จากวันที่ที่ได้รับ
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('th-TH', options); // แสดงผลในรูปแบบวัน เดือน ปี (ภาษาไทย)
};

    return (
        <>
         <div className="container">
        <div className="p-3">
            <div className="text-center">
                <div className="mb-3">
                    <p className="fw-bolder fs-4">ข้อมูลรถ ประกันภัย</p>
                </div>
            </div>

            <div>
                <div className="mb-3">
                    <div className="row">
                        <p className="fw-bolder">ค้นหาข้อมูล</p>
                        <div className="col-lg-3">

                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="ค้นหาทะเบียน"
                                value={searchRegNumber}
                                onChange={(e) => setSearchRegNumber(e.target.value)}
                            />
                        </div>
                        <div className="col-lg-3">
                            <p></p>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="ค้นหาประเภทรถ"
                                value={searchCarType}
                                onChange={(e) => setSearchCarType(e.target.value)}
                            />
                        </div>
                        <div className="col-lg-3">
                            <div className="mb-3">
                                {/* ปุ่ม "All" เพื่อรีเซ็ตการค้นหา */}
                                <button className="btn btn-primary" onClick={toggleDataView}>
                                    {showAll ? "ย้อนกลับ" : "ค้นหาทั้งหมด"}
                                </button>
                            </div>
                        </div>
                    </div>


                </div>

                <div>
                    <table className="table table-hover table-borderless">
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ทะเบียน</th>
                                <th>ประเภทรถ</th>
                                <th>วันที่เริ่มต้น</th>
                                <th>วันที่หมดอายุ</th>
                                <th>ชื่อบริษัทประกัน</th>
                                <th>สถานะ</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((rowA, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{rowA.reg_number}</td>
                                        <td>{rowA.car_type_name}</td>
                                        <td>{formatDate(rowA.insurance_start_date)}</td>
                                        <td>{formatDate(rowA.insurance_end_date)}</td>
                                        <td>{rowA.insurance_name}</td>
                                        <td>
                                            {rowA.status === "ประกันหมดอายุ" ? (
                                                <p className="text-danger">{rowA.status}</p>
                                            ) : rowA.status === "ประกันใกล้หมดอายุ" ? (
                                                <p className="text-warning">{rowA.status}</p>
                                            ) : (
                                                <p className="text-success">{rowA.status}</p>
                                            )}
                                        </td>
                                        <td><button
                                            className="btn-circle"
                                            onClick={() => handleOpenModalEditInsurance(rowA)}
                                        >
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">ไม่มีข้อมูล</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    {isOpenModalEditInsurance && (
        <Modal_UpdateInsurance isOpen={isOpenModalEditInsurance} onClose={handleClesModalEditInsurance} dataInsurance={dataCMIModal} />
    )}

    </div>
        </>
    )
}

export default CarInsurance_Main;