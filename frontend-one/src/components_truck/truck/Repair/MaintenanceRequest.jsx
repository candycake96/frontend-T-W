import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { apiUrl } from "../../../config/apiConfig";
import Modal_setting_doc_repair from "./Mobal/Modal_setting_doc_Repair";

const MaintenanceRequest = () => {




    const [request, setRequest] = useState([]);
    const fetchRequst = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/repair_requests_detail`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            setRequest(response.data);
        } catch (error) {
            console.error("Error fetching request:", error);
        }
    };

    useEffect(() => {
        fetchRequst();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "numeric", day: "numeric", calendar: "gregory" };
        return date.toLocaleDateString("th-TH-u-ca-gregory", options);
    };

    // เก็บหมายเลขหน้าปัจจุบัน (เริ่มต้นที่หน้า 0)
    const [currentPage, setCurrentPage] = useState(0);

    // จำนวนรายการที่จะแสดงต่อหน้า
    const itemsPerPage = 10;

    // คำนวณตำแหน่งเริ่มต้นของข้อมูลในแต่ละหน้า
    // เช่น หน้า 0: offset = 0, หน้า 1: offset = 10, หน้า 2: offset = 20
    const offset = currentPage * itemsPerPage;

    // ดึงข้อมูลของหน้าปัจจุบันมาแสดง (slice จะตัด array ตาม offset และจำนวน items)
    const currentItems = request.slice(offset, offset + itemsPerPage);

    // คำนวณจำนวนหน้าทั้งหมด โดยหารจำนวนข้อมูลทั้งหมดด้วยจำนวนข้อมูลต่อหน้า
    const pageCount = Math.ceil(request.length / itemsPerPage);

    // ฟังก์ชันที่จะเรียกเมื่อผู้ใช้คลิกเปลี่ยนหน้าใน pagination
    // selected คือ index ของหน้าที่เลือก (เช่น หน้าแรกคือ 0)
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected); // อัปเดตหน้าปัจจุบัน
    };


    const [isOpenModalSetting, setOpenModalSetting] = useState(false);
    const handleOpenModalSetting = () => setOpenModalSetting(true);
    const handleClossModalSetting = () => setOpenModalSetting(false);

    return (
        <>
            <div className="container">
                <div className="p-3">
                    <div className="mb-3">
                        <p className="fw-bolder fs-5">รายการแจ้งซ่อมเกี่ยวกับบำรุงรักษา</p>
                        <Link to="/truck/RepairRequestForm" className="btn btn-primary me-1">แจ้งซ่อม</Link>
                        <Link to="/truck/RepairRequestForm" className="btn btn-primary me-1">ประวัติแจ้งซ่อม</Link>
                        <button   className="btn btn-primary" onClick={handleOpenModalSetting}>Setting</button> {/* Repair Request Setting */}
                    </div>
                    <hr />
                </div>
                <div className="mb-3 row">
                    <div className="col-auto">
                        <input type="date" name="date_start" className="form-control" />
                    </div>
                    <div className="col-auto">
                        <input type="date" name="date_end" className="form-control" />
                    </div>
                    <div className="col-auto">
                        <input type="text" name="job_number" className="form-control" placeholder="เลขที่งาน" />
                    </div>
                </div>


                <div className="card">
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Job Number</th>
                                    <th>Car registration</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Reported By</th>
                                    <th>Button</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.request_no}</td>
                                        <td>{row.reg_number}</td>
                                        <td>{formatDate(row.request_date)}</td>
                                        <td><p style={{ color: "green" }}><i class="bi bi-check-circle-fill"></i> {row.status} </p></td>
                                        <td className="">
                                            {/* Tooltip with Bootstrap icon */}
                                            <button
                                                type="button"
                                                className="btn"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="left"
                                                title={`${row.fname} ${row.lname}`}
                                            >
                                                <i className="bi bi-person-fill"></i>
                                            </button>
                                            {`${row.fname} ${row.lname}`}
                                        </td>
                                        <td><Link to="/truck/MaintenanceJob" state={row} className="btn btn-sm btn-outline-primary rounded-circle me-1"><i class="bi bi-grip-vertical"></i></Link></td>
                                    </tr> 
                                ))}

                            </tbody>
                        </table>

                        <ReactPaginate
    // ปุ่มก่อนหน้า แสดงเป็นเครื่องหมาย "<"
    previousLabel={"<"}

    // ปุ่มถัดไป แสดงเป็นเครื่องหมาย ">"
    nextLabel={">"}

    // ปุ่ม "..." สำหรับแสดงจุดคั่นระหว่างหน้าที่ไม่ได้แสดง เช่น 1 ... 4 5 6 ... 10
    breakLabel={"..."}

    // จำนวนหน้าทั้งหมดที่คำนวณไว้ (จาก Math.ceil(request.length / itemsPerPage))
    pageCount={pageCount}

    // จำนวนหน้าที่จะแสดงข้างๆ ปุ่มก่อนหน้า / ถัดไป (เช่น ถ้าใส่ 1 จะได้: < 1 ... 4 5 6 ... 10 >)
    marginPagesDisplayed={1}

    // จำนวนหน้าที่แสดงในช่วงตรงกลางของ pagination (ไม่รวม margin)
    // เช่น ใส่ 3 แล้วอยู่หน้าที่ 5 อาจได้: < 1 ... 4 5 6 ... 10 >
    pageRangeDisplayed={3}

    // เมื่อคลิกเปลี่ยนหน้า จะเรียกฟังก์ชันนี้ และส่งค่าหน้าใหม่เข้าไป
    onPageChange={handlePageClick}

    // คลาสของคอนเทนเนอร์ของ pagination ทั้งชุด (ใช้ Bootstrap เพื่อจัดตำแหน่งให้อยู่ตรงกลาง)
    containerClassName={"pagination justify-content-center"}

    // คลาสของแต่ละปุ่มหน้า (Bootstrap ใช้ "page-item")
    pageClassName={"page-item"}

    // คลาสของลิงก์ภายในปุ่มหน้า (Bootstrap ใช้ "page-link")
    pageLinkClassName={"page-link"}

    // คลาสของปุ่ม "ก่อนหน้า" (ใช้ร่วมกับ Bootstrap)
    previousClassName={"page-item"}

    // คลาสของลิงก์ "ก่อนหน้า" (ใช้ร่วมกับ Bootstrap)
    previousLinkClassName={"page-link"}

    // คลาสของปุ่ม "ถัดไป"
    nextClassName={"page-item"}

    // คลาสของลิงก์ "ถัดไป"
    nextLinkClassName={"page-link"}

    // คลาสของหน้าที่กำลังถูกเลือก (จะทำให้มีพื้นหลังตาม Bootstrap)
    activeClassName={"active"}
/>



                    </div>
                </div>
            </div>

{isOpenModalSetting && (
    <Modal_setting_doc_repair isOpen={isOpenModalSetting} onClose={handleClossModalSetting} />
)}
        </>
    )
}

export default MaintenanceRequest;
