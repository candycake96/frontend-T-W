import React, { useEffect, useState } from "react";
import Modal_vandor_details from "./modal/Modal_vandor_details";
import { apiUrl } from "../../../config/apiConfig";
import axios from "axios";

const Vendor_table_details = ({ refresh }) => {
    const [isOpenModalVendorDetails, setOpenModalVendorDetails] = useState(false);
    const [isShowDataVendor, setShowDataVender] = useState([]);

    const fetchVendorShowData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/vendor_show`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            setShowDataVender(response.data);
        } catch (error) {
            console.error("Error fetching coverage type:", error);
        }
    }

    useEffect(() => {
        fetchVendorShowData();
    }, [refresh]);

    const handleOpenModalVandorDetails = () => {
        setOpenModalVendorDetails(true);
    };

    const handleCloseModalVandorDetails = () => {
        setOpenModalVendorDetails(false);
    };

    return (
        <div className="card">
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>รายชื่ออู่/ร้าน/บริษัท</th>
                            <th>โทร</th>
                            <th>เงื่อนไขเครดิต</th>
                            <th>ลักษณะประกอบการ</th>
                            <th><i className="bi bi-file-text-fill"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isShowDataVendor.map((row, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.vendor_name}</td>
                                <td>{row.phone}</td>
                                <td>{row.credit_terms} วัน</td>
                                <td>{row.organization_type_name}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-primary rounded-circle me-1" onClick={handleOpenModalVandorDetails}>
                                        <i className="bi bi-file-text-fill"></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline-primary rounded-circle" >
                                    <i className="bi bi-box-arrow-up-right"></i>{/* เปลี่ยนไอคอนเพื่อแยกความต่างก็ได้ */}
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isOpenModalVendorDetails && (
                <Modal_vandor_details
                    isOpen={isOpenModalVendorDetails}
                    onClose={handleCloseModalVandorDetails}
                />
            )}
        </div>
    );
};

export default Vendor_table_details;
