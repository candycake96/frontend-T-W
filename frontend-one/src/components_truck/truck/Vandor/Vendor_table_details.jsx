import React, { useEffect, useState } from "react";
import Modal_vandor_details from "./modal/Modal_vandor_details";
import { apiUrl } from "../../../config/apiConfig";

const Vendor_table_details = () => {
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

    useEffect(()=>{
        fetchVendorShowData();
    }, []);

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
                        {isShowDataVendor && (
                        <tr>
                            <td>1</td>
                            <td>A</td>
                            <td>xx-xxxx</td>
                            <td>debit</td>
                            <td>บริษัท</td>
                            <td>
                                <button className="btn btn-sm btn-outline-primary rounded-circle" onClick={handleOpenModalVandorDetails}>
                                    <i className="bi bi-file-text-fill"></i>
                                </button>
                            </td>
                        </tr>
                       )}
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
