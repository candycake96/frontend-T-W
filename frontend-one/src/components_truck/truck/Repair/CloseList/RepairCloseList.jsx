import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const RepairCloseList = () => {


    return (
        <div className="container mt-4">
            <h3 className="mb-4">รายการรอปิดงานซ่อม</h3>
            <Button className="btn-danger btn-sm em-4">เพิ่ม</Button>
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>เลขที่แจ้งซ่อม</th>
                        <th>ทะเบียนรถ</th>
                        <th>วันที่แจ้ง</th>
                        <th>สถานะ</th>
                        <th>ดำเนินการ</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </Table>
        </div>
    );
};

export default RepairCloseList;
