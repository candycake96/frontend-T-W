import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal_Department_add from "./modal/Modal_Department_Add";
import { apiUrl } from "../../config/apiConfig";

const Department = ({ CompanyID, user }) => {
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isCompany, setCompany] = useState(null);
  const [modalDepartment, setModalDepartment] = useState(null);

  const [modaldOpenDepartmentAdd, estModalOpenDepartment] = useState(false);
  const handleOpenModalDepartmentAdd = () => {
    estModalOpenDepartment(true);
  }
  const handleCloseModalDepartmentAdd = () => {
    estModalOpenDepartment(false);
  }

    useEffect(() => {
      if (user?.company_id) {
        setCompany(user.company_id); // ✅ Ensure company_id is set
      }
    }, [user]);

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/getdepartments/${CompanyID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  
  useEffect(() => {
    fetchDepartment();
  }, []);

  const openModal = (department) => {
    setModalDepartment(department);
    const dialog = document.getElementById("my_modal_4_1");
    if (dialog) dialog.showModal();
  };

  const handleSaveEditDepartment = async () => {
    if (modalDepartment) {
      try {
        const response = await axios.put(
          `${apiUrl}/api/depastment_update_data/${modalDepartment.id_department}`,
          {name_department: modalDepartment.name_department},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setMessage(response.data.message);
        setMessageType("success");
        fetchDepartment(); // Refresh the department list
        setModalDepartment(null);

        // Close the modal
        const dialog = document.getElementById("my_modal_4_1");
        if (dialog) dialog.close(); // Close the modal after saving changes
      } catch (error) {
        console.error("Error updating department:", error);
        setMessage("Failed to update the department.");
        setMessageType("error");
      }
    }
  };

  const token = localStorage.getItem("accessToken");
  if (!token) {
      console.log("Token is missing");
  } else {
      console.log("Token:", token);
  }

  const handleDelete = async (id) => {
    try {
        const response = await axios.put(
            `${apiUrl}/api/depastment_update_status/${id.id_department}`,{isCompany}, // ✅ Fixed typo in endpoint URL
            {
              headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setMessage(response.data.message);
        setMessageType('success');
        fetchDepartment(); // ✅ Refresh the department list

    } catch (error) {
        console.error('Error:', error);
        setMessage(error.response?.data?.message || 'Something went wrong');
    }
};


  return (
    <>
      <div className="card mb-3 rounded-0 shadow-sm">
      <div className="d-flex justify-content-between align-items-center">
                        <p className="fw-bolder mx-auto">แผนก</p>
                        <button className="btn-animated " onClick={handleOpenModalDepartmentAdd} ><i class="bi bi-pencil-fill fs-3"></i></button>
                    </div>
        <div className="p-3">
          {message && (
            <div className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"}`}>
              {message}
            </div>
          )}
          
        </div>
        

        <div className="p-2">
          <div className="">
            <div className="">
              <div className="">
                <table className="table  table-responsive">
                  <tbody>
                    {departments.map((department, index) => (
                      <tr key={department.id_department}>
                        <td className="col-lg-1">{index + 1}</td>
                        <td className="col-lg-9">{department.name_department}</td>
                        <td className="col-1">

                        <button
                           className="p-0 btn-icon-Delete"
                           onClick={() => handleDelete(department)}
                          >
                            <i className="bi bi-trash3-fill"></i> {/* ลบ */}
                            </button>
                          <button
                            className="p-0 me-2 btn-animated"
                            onClick={() => openModal(department)}
                          >
                            <i className="bi bi-pencil-square"></i>  {/* แก้ไข */}
                          </button>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_4_1" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h1 className="font-bold text-lg">แก้ไขข้อมูล</h1>
          {modalDepartment && (
            <>
              <div className="mb-3">
                <label htmlFor="editDepartmentName" className="form-label">
                  ชื่อฝ่ายงาน
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editDepartmentName"
                  value={modalDepartment.name_department}
                  onChange={(e) =>
                    setModalDepartment((prev) => ({
                      ...prev,
                      name_department: e.target.value,
                    }))
                  }
                />
              </div>
            </>
          )}
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleSaveEditDepartment}>
              บันทึก
            </button>
            <button className="btn" onClick={() => document.getElementById("my_modal_4_1").close()}>
              ยกเลิก
            </button>
          </div>
        </div>
      </dialog>

{/*  */}
{modaldOpenDepartmentAdd && (
  <Modal_Department_add isOpen={handleOpenModalDepartmentAdd} onClose={handleCloseModalDepartmentAdd} user={user}/>
)}

    </>
  );
};

export default Department;
