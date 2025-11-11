import React, { useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import Table_mainternance_timeline from "./table/Table_mainternance_Timeline";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import Modal_completed from "./Modal/Modal_completed";
import Modal_pending from "./Modal/Moadal_pending";
import axios from "axios";
import { apiUrl } from "../../../../config/apiConfig";

const Mainternance_report = () => {
  const [activeKey, setActiveKey] = useState("summary");

  const [isOpenModalDataCompleted, setOpenModalDataCompleted] = useState(false);
  const [dataOpenModalDataCompleted, setDataOpenModalDataCompleted] = useState(null);
  const handleOpenModalDataCompleted = (data) => {
    setOpenModalDataCompleted(true);
    setDataOpenModalDataCompleted(data);
  };
  const handleCloseModalDataCompleted = () => {
    setOpenModalDataCompleted(false);
    setDataOpenModalDataCompleted(null);
  };

    const [isOpenModalDataPending, setOpenModalDataPending] = useState(false);
  const [dataOpenModalDataPending, setDataOpenModalDataPending] = useState(null);
  const handleOpenModalDataPending = (data) => {
    setOpenModalDataPending(true);
    setDataOpenModalDataPending(data);
  };
  const handleCloseModalDataPending = () => {
    setOpenModalDataPending(false);
    setDataOpenModalDataPending(null);
  };

    const [isDataCompleted, setDataCompleted] = useState([]);
    const [isDataPending, setDataPending] = useState([]);
    // ✅ โหลดข้อมูลจาก API
  const fetchMainternanceCompleted = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/mainternance_completed_show`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setDataCompleted(response.data);
    } catch (error) {
      console.error("Error fetching Analysis data:", error);
    }
  };

  useEffect(() => {
    fetchMainternanceCompleted();
  }, []);

        // ✅ โหลดข้อมูลจาก API
      const fetchMainternancePending = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/mainternance_pending_show`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          setDataPending(response.data);
        } catch (error) {
          console.error("Error fetching Analysis data:", error);
        }
      };
    
      useEffect(() => {
        fetchMainternancePending();
      }, []);

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">📊 รายงานซ่อมบำรุง</h2>
        <p className="text-muted">สรุปการซ่อมบำรุงรถบรรทุกและอุปกรณ์</p>
      </div>

      {/* Date Filter + Export */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>

        </div>
        <div>
          <button className="btn btn-outline-primary me-2">Export PDF</button>
          <button className="btn btn-outline-success">Export Excel</button>
        </div>
      </div>

      {/* Tabs */}
      <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="summary">📌 สรุปทั้งหมด</Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link eventKey="pm">🛡️ Preventive (PM)</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="cm">⚙️ Corrective (CM)</Nav.Link>
          </Nav.Item> */}
        </Nav>

        <Tab.Content>
          {/* Summary */}
          <Tab.Pane eventKey="summary">
            <div className="row g-4 mb-3">
              <div className="col-md">
                <div className="card shadow-lg border-0 h-100"
                onClick={()=>handleOpenModalDataCompleted()}
                 style={{ cursor: "pointer" }}
                >
                  <div className="card-body text-center">
                    <h5 className="card-title text-success fw-bold">🛠️ เสร็จแล้ว</h5>
                    <h2 className="fw-bold text-success">{isDataCompleted.length}</h2>
                    <p className="text-muted">เดือนนี้</p>
                  </div>
                </div>
              </div>
              <div className="col-md">
                <div className="card shadow-lg border-0 h-100"
                onClick={()=>handleOpenModalDataPending()}
                style={{ cursor: "pointer"}}
                >
                  <div className="card-body text-center">
                    <h5 className="card-title text-warning fw-bold">⚡ กำลังทำ</h5>
                    <h2 className="fw-bold text-warning">{isDataPending.length}</h2>
                    <p className="text-muted">กำลังดำเนินการอยู่</p>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-4">
                <div className="card shadow-lg border-0 h-100">
                  <div className="card-body text-center">
                    <h5 className="card-title text-danger fw-bold">❌ ค้างอยู่</h5>
                    <h2 className="fw-bold text-danger">15</h2>
                    <p className="text-muted">ยังไม่ได้เริ่ม</p>
                  </div>
                </div>
              </div> */}
            </div>
           <Table_mainternance_timeline />
          </Tab.Pane>

          {/* PM */}
          <Tab.Pane eventKey="pm">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-info text-white fw-bold">
                🛡️ Preventive Maintenance (PM)
              </div>
              <div className="card-body p-0">
                <table className="table table-hover table-striped mb-0">
                  <thead className="table-info">
                    <tr>
                      <th>ลำดับ</th>
                      <th>ทะเบียนรถ</th>
                      <th>งาน PM</th>
                      <th>สถานะ</th>
                      <th>วันที่</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>88-1234</td>
                      <td>เปลี่ยนน้ำมันเครื่อง</td>
                      <td><span className="badge bg-success">เสร็จแล้ว</span></td>
                      <td>01/09/2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Tab.Pane>

          {/* CM */}
          <Tab.Pane eventKey="cm">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-warning text-dark fw-bold">
                ⚙️ Corrective Maintenance (CM)
              </div>
              <div className="card-body p-0">
                <table className="table table-hover table-striped mb-0">
                  <thead className="table-warning">
                    <tr>
                      <th>ลำดับ</th>
                      <th>ทะเบียนรถ</th>
                      <th>งาน CM</th>
                      <th>สถานะ</th>
                      <th>วันที่</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>77-5678</td>
                      <td>ซ่อมเบรค</td>
                      <td><span className="badge bg-danger">ค้างอยู่</span></td>
                      <td>03/09/2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      <Modal_completed isOpen={isOpenModalDataCompleted} onClose={handleCloseModalDataCompleted} />
      <Modal_pending isOpen={isOpenModalDataPending} onClose={handleCloseModalDataPending} />
    </div>
  );
};

export default Mainternance_report;
