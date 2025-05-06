import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Modal_vehicle_parts_add from "./Modal/Modal_vehicle_parts_add";
import Modal_vehicle_systems from "./Modal/Modal_vehicle_systems";
import axios from "axios";
import { apiUrl } from "../../../config/apiConfig";

const Vehicle_parts_details = () => {
    const [isDataParts, setDataParts] = useState([]);
    const [isOpenModalParteAdd, setOpenModalPartsAdd] = useState(false);
    const [isOpenModalVehicleSystems, setOpenModalVehicleSystems] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20;

    const handleOpenModalVehicleSystems = () => setOpenModalVehicleSystems(true);
    const handleClossModalVehicleSystems = () => setOpenModalVehicleSystems(false);
    const handleOpenModalPartsAdd = () => setOpenModalPartsAdd(true);
    const handleClossModalpartsAdd = () => setOpenModalPartsAdd(false);

    const fetchPartsShow = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/parts_show_all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            setDataParts(response.data);
        } catch (error) {
            console.error("Error fetching parts:", error);
        }
    };

    useEffect(() => {
        fetchPartsShow();
    }, []);

    // ค้นหาอะไหล่ตามชื่อ
    const filteredData = isDataParts.filter((row) =>
        row.part_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentItems = filteredData.slice(offset, offset + itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0); // รีเซ็ตหน้าเมื่อพิมพ์ค้นหา
    };

    return (
        <>
            <div className="container">
                <div className="p-3">
                    <div className="mb-2 d-flex justify-content-between align-items-center">
                        <p className="fw-bolder fs-5">ข้อมูลราคากลางอะไหล่</p>
                        <button className="btn btn-primary" onClick={handleOpenModalVehicleSystems}>
                            เพิ่มข้อมูลระบบ
                        </button>
                    </div>

                    <hr className="mb-3" />

                    <div className="mb-3 col-12">
                        <div className="d-flex flex-nowrap align-items-center gap-2">
                            <select className="form-select form-select-sm" style={{ width: "200px" }}>
                                <option defaultValue>เลือกหมวดหมู่ระบบ</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>

                            <div className="input-group input-group-sm" style={{ flex: 1 }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ค้นหาอะไหล่..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <button className="btn btn-outline-secondary" type="button">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>

                            <button className="btn btn-primary btn-sm" onClick={handleOpenModalPartsAdd}>
                                <i className="bi bi-plus me-1"></i> เพิ่มข้อมูลอะไหล่
                            </button>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>รหัส</th>
                                            <th>ระบบ</th>
                                            <th>อะไหล่</th>
                                            <th>หน่วย</th>
                                            <th>ยี่ห้อ</th>
                                            <th>รุ่น</th>
                                            <th>ราคา</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.part_code}</td>
                                                <td>{row.system_name}</td>
                                                <td>{row.part_name}</td>
                                                <td>{row.unit}</td>
                                                <td>{row.brand}</td>
                                                <td>{row.model}</td>
                                                <td>{row.price}</td>
                                                <td>#</td>
                                            </tr>
                                        ))}
                                        {currentItems.length === 0 && (
                                            <tr>
                                                <td colSpan="8" className="text-center">
                                                    ไม่พบข้อมูล
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                <ReactPaginate
    previousLabel={"<"}
    nextLabel={">"}
    breakLabel={"..."}
    pageCount={pageCount}
    marginPagesDisplayed={1}
    pageRangeDisplayed={3}
    onPageChange={handlePageClick}
    containerClassName={"pagination pagination-sm justify-content-center"}  // เพิ่ม pagination-sm
    pageClassName={"page-item"}
    pageLinkClassName={"page-link"}
    previousClassName={"page-item"}
    previousLinkClassName={"page-link"}
    nextClassName={"page-item"}
    nextLinkClassName={"page-link"}
    activeClassName={"active"}
/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isOpenModalParteAdd && (
                <Modal_vehicle_parts_add isOpen={isOpenModalParteAdd} onClose={handleClossModalpartsAdd} />
            )}
            {isOpenModalVehicleSystems && (
                <Modal_vehicle_systems isOpen={isOpenModalVehicleSystems} onClose={handleClossModalVehicleSystems} />
            )}
        </>
    );
};

export default Vehicle_parts_details;
