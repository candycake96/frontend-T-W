import axios from "axios";
import React, { useEffect, useState } from "react";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [modalDepartment, setModalDepartment] = useState(null);

  const fetchDepartment = async () => {
    try {
      const response = await axios.get("http://localhost:7071/api/selectdepartment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleDepartmentInsert = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    if (!departmentName) {
      setMessage("Department name is required.");
      setMessageType("error");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:7071/api/insertdepartment",
        { department_name: departmentName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setMessage(response.data.message);
      setMessageType("success");
      setDepartmentName("");
      fetchDepartment();
    } catch (error) {
      console.error("Error inserting department:", error);
      setMessage("Failed to add department.");
      setMessageType("error");
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
          `http://localhost:7071/api/updatedepartment/${modalDepartment.department_id}`,
          modalDepartment,
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


  const handleDelete = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:7071/api/deletedepartment/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
            }
        )
        setMessage(response.data.message);
        setMessageType('success');
        fetchDepartment(); // Refresh the branch list

    } catch (error) {
        console.error('Error:', error);
        setMessage(error.response.data.message || 'Something went wrong');
    }
}
  return (
    <>
      <div className="">
        <div className="text-center">
          <p className="fs-3 fw-bolder">ฝ่ายงาน</p>
        </div>
        <div className="p-3">
          {message && (
            <div className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"}`}>
              {message}
            </div>
          )}
          <div className="">
            <form onSubmit={handleDepartmentInsert}>
              <div className="mb-3">
                <label htmlFor="departmentName" className="form-label">
                  ชื่อฝ่ายงาน
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="departmentName"
                  placeholder="ฝ่ายงาน"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-success">
                  เพิ่มข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
        <hr />

        <div className="p-3">
          <div className="card">
            <div className="card-body">
              <div className="overflow-x-auto">
                <table className="table table-striped table-responsive">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ชื่อฝ่ายงาน</th>
                      <th>#</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((department, index) => (
                      <tr key={department.department_id}>
                        <td>{index + 1}</td>
                        <td>{department.department_name}</td>
                        <td className="col-2">
                          <button
                            className="btn btn-warning col-12"
                            onClick={() => openModal(department)}
                          >
                            แก้ไข
                          </button>
                        </td>
                        <td className="col-2">
                          <button
                           className="btn btn-error col-12"
                           onClick={() => handleDelete(department.department_id)}
                          >
                            ลบ
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
                  value={modalDepartment.department_name}
                  onChange={(e) =>
                    setModalDepartment((prev) => ({
                      ...prev,
                      department_name: e.target.value,
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
    </>
  );
};

export default Department;
