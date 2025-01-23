import React from "react";

const VehicleTable = () => {
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ทะเบียนรถ</th>
                        <th>รุ่นรถ</th>
                        <th>ประเภทรถ</th>
                        <th>สถานะ</th>
                        <th>พขร.ขับล่าสุด</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td className="col-lg-1">
                            <button className="btn col-lg-6" style={{color: '#f4d03f'}}><i class="bi bi-pencil-fill"></i></button>
                            <button className="btn col-lg-6" style={{color: '#cb4335'}}><i class="bi bi-trash-fill"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default VehicleTable;