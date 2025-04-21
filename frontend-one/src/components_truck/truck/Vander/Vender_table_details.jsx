import React, { useState } from "react";
import Modal_vander_details from "./modal/Modal_vander_details";

const Vender_table_details = () => {
    const [isOpenModalVenderDetails, setOpenModalVenderDetails] = useState(false);

    const handleOpenModalVanderDetails = () => {
        setOpenModalVenderDetails(true);
    };

    const handleCloseModalVanderDetails = () => {
        setOpenModalVenderDetails(false);
    };

    return (
        <>
            <div>
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
                                <button className="btn btn-sm btn-outline-primary rounded-circle" onClick={handleOpenModalVanderDetails}>
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
                                <button className="btn btn-sm btn-outline-primary rounded-circle" onClick={handleOpenModalVanderDetails}>
                                    <i className="bi bi-file-text-fill"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {isOpenModalVenderDetails && (
                <Modal_vander_details
                    isOpen={isOpenModalVenderDetails}
                    onClose={handleCloseModalVanderDetails}
                />
            )}
        </>
    );
};

export default Vender_table_details;
