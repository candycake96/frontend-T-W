import axios from "axios";
import React, { useEffect, useState } from "react";

const CarTaxRenewal_Main = () => {

    const [isDataTaxend, setDataTaxend] = useState([]);

    const fetchTaxend = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3333/api/tax_managment_show`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            // console.log("Fetched positions:", response.data); // Check fetched data
            setDataTaxend(response.data);
        } catch (error) {
            console.error("Error fetching Taxend:", error);
        }
    }

    useEffect(() => {
        fetchTaxend();
    }, []);

    return (
        <>
            <div className="container">
                <div className="p-3">
                    <div className="text-center">
                        <div className="mb-3">
                            <p className="fw-bolder fs-4">ข้อมูลรถต่อทะเบียน</p>
                        </div>
                    </div>

                    <div className="">
                        <div className="mb-3">
                            <p className="fw-bolder">ถึงกำหนดต่อทะเบียน</p>
                        </div>
                        <div className="">
                            <table
                                className="table">
                                <thead>
                                    <tr>
                                        <th>ลำดับ</th>
                                        <th>ทะเบียน</th>
                                        <th>ประเรภทรถ</th>
                                        <th>วันที่หมดอายุ</th>
                                        <th>สถานะ</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isDataTaxend && isDataTaxend.length > 0 ? (
                                        isDataTaxend.map((rowTax, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td> {/* เริ่ม index ที่ 1 แทน 0 */}
                                                <td>{rowTax.reg_number}</td>
                                                <td>{rowTax.car_type_name}</td>
                                                <td>{rowTax.tax_end_date}</td>
                                                <td>
                                                    {rowTax.tax_end_date && new Date(rowTax.tax_end_date) <= new Date() ? (
                                                        <p className="text-danger">ทะเบียนหมดอายุ</p>
                                                    ) : (
                                                        <p className="text-warning">ทะเบียนใกล้หมดอายุ</p>
                                                    )}
                                                </td>

                                                <td><button className="btn btn-primary">H</button></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">ไม่มีข้อมูล</td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarTaxRenewal_Main;
