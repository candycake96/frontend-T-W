import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiUrl } from "../../../../config/apiConfig";
import Modal_vandor_details from "./Modal_vandor_details";

const Modal_vandor_show_search = ({ isOpen, onClose }) => {


    const [isShowDataVendor, setShowDataVender] = useState([]);
    // API URL
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
    };

    useEffect(() => {
        fetchVendorShowData();
    }, []);
    
    // ข้อมูล
    const [isOpenModalVendorDetails, setOpenModalVendorDetails] = useState(false);
    const [isVendorID, setVendorID] = useState(null);

    // ข้อมูล 
    const handleOpenModalVandorDetails = (data) => {
        setVendorID(data);        
        setOpenModalVendorDetails(true);
    };
    const handleCloseModalVandorDetails = () => {
        setOpenModalVendorDetails(false);
    };

  return (
    <ReactModal
     isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            contentLabel="Vendor Details"
            style={{
                content: {
                    width: "90%",
                    maxWidth: "950px",
                    maxHeight: "80vh",
                    height: "auto",
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
            <div
                className="modal-header"
                style={{
                    padding: "1rem",
                    backgroundColor: "#f8f9fa",
                    borderTopLeftRadius: "0.5rem",
                    borderTopRightRadius: "0.5rem",
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        cursor: "pointer",
                    }}
                >
                    ×
                </button>
                <h5 className="modal-title text-center fw-bolder">
                    ข้อมูลผู้จำหน่าย (อู่ซ่อม) 
                </h5>
            </div>
        
            <div className="modal-body" style={{ padding: "1rem" }}>
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
                                    <button className="btn btn-sm btn-outline-primary rounded-circle me-1" onClick={()=>handleOpenModalVandorDetails(row)}>
                                        <i className="bi bi-file-text-fill"></i>
                                    </button>
                                    <Link to='/truck/VendorInfo' className="btn btn-sm btn-outline-primary rounded-circle me-1" >
                                    <i class="bi bi-arrow-down"></i>
                                    </Link>

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
                    vendorID={isVendorID}
                />
            )}

    </ReactModal>
  );
}

export default Modal_vandor_show_search;