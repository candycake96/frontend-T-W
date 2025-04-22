import React, { useState } from "react";
import Modal_vandor_details from "./modal/Modal_vandor_details";

const Vendor_table_details = () => {
    const [isOpenModalVendorDetails, setOpenModalVendorDetails] = useState(false);

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
                        <tr>
                            <td>2</td>
                            <td>B</td>
                            <td>xx-xxxx</td>
                            <td>debit</td>
                            <td>อู่ซ่อม</td>
                            <td>
                                <button className="btn btn-sm btn-outline-primary rounded-circle" onClick={handleOpenModalVandorDetails}>
                                    <i className="bi bi-file-text-fill"></i>
                                </button>
                            </td>
                        </tr>
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
