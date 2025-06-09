import React, { useEffect, useState } from "react";
import { apiUrl } from "../../../config/apiConfig";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const MaintenancPlanning = () => {

    const [isPlanning, setPlanning] = useState([]);
    const fetchPlanning = async () => {
           try {
            const response = await axios.get(
                `${apiUrl}/api/planning_show`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            setPlanning(response.data);
        } catch (error) {
            console.error("Error fetching branches:", error);
        }
    };

    useEffect(()=>{
        fetchPlanning();
    }, []);


     // เก็บหมายเลขหน้าปัจจุบัน (เริ่มต้นที่หน้า 0)
        const [currentPage, setCurrentPage] = useState(0);
    
        // จำนวนรายการที่จะแสดงต่อหน้า
        const itemsPerPage = 10;
    
        // คำนวณตำแหน่งเริ่มต้นของข้อมูลในแต่ละหน้า
        // เช่น หน้า 0: offset = 0, หน้า 1: offset = 10, หน้า 2: offset = 20
        const offset = currentPage * itemsPerPage;
    
        // ดึงข้อมูลของหน้าปัจจุบันมาแสดง (slice จะตัด array ตาม offset และจำนวน items)
        const currentItems = isPlanning.slice(offset, offset + itemsPerPage);
    
        // คำนวณจำนวนหน้าทั้งหมด โดยหารจำนวนข้อมูลทั้งหมดด้วยจำนวนข้อมูลต่อหน้า
        const pageCount = Math.ceil(isPlanning.length / itemsPerPage);
    
        // ฟังก์ชันที่จะเรียกเมื่อผู้ใช้คลิกเปลี่ยนหน้าใน pagination
        // selected คือ index ของหน้าที่เลือก (เช่น หน้าแรกคือ 0)
        const handlePageClick = ({ selected }) => {
            setCurrentPage(selected); // อัปเดตหน้าปัจจุบัน
        };

    return (
        <>
            <div className="container">
                <div className="p-3">
                    <div className="">
                        <p className="fw-bolder fs-4 mb-2">
                            ตรวจสอบความพร้อม
                        </p>
                        <hr className="mb-3" />
                    </div>
                    <div className="">
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
                                    <td>{row.car_mileage}</td>
                                    <td>{row.request_date}</td>
                                    <td>{row.status}</td>
                                    <td>{`${row.fname} ${row.lname}`}</td>
                                    <td><Link to="/truck/MaintenanceJob" state={{...row, fromPage: "MaintenancPlanning"}} className="btn btn-sm btn-outline-primary rounded-circle me-1"><i class="bi bi-grip-vertical"></i></Link></td>
                                    
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
        </>
    )
}

export default MaintenancPlanning;
