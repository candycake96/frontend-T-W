import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal_Branch_Add from "./modal/Modal_Brcnch_Add";
import { apiUrl } from "../../config/apiConfig";

const Branch = ({CompanyID, user}) => {
  const [branches, setBranches] = useState([]);
  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(null); // For editing
    const [isCompany, setCompany] = useState(null);

   const [modalOpenBranchAdd, setModalOpenBranchAdd] = useState(false);
   const handleOpenModalBanchAdd = () => {
    setModalOpenBranchAdd(true);
}

const handleCloseModalBanchAdd = () => {
    setModalOpenBranchAdd(false);
}

  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/getbranches/${CompanyID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches: ", error);
    }
  };

  useEffect(() => {
    fetchBranches(); // Fetch branches on component mount
  }, []);



  const handleEditClick = (branch) => {
    setSelectedBranch(branch);
    const dialog = document.getElementById("my_modal_4");
    if (dialog) dialog.showModal();
  };


  const handleSaveChanges = async () => {
    if (selectedBranch) {
      try {
        const response = await axios.put(
          `${apiUrl}/api/branches_update_data/${selectedBranch.id_branch}`,
          selectedBranch,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        setMessage(response.data.message);
        setMessageType("success");
        fetchBranches(); // Refresh the branch list
        setSelectedBranch(null);

            // Close the modal
      const dialog = document.getElementById("my_modal_4");
      if (dialog) dialog.close();  // Close the modal after saving changes

      } catch (error) {
        console.error("Error updating branch:", error);
        setMessage("Failed to update the branch.");
        setMessageType("error");
      } 
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this branch?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.put(
        `${apiUrl}/api/branches_update_status/${id}`,
        isCompany,// No request body needed
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
  
      setMessage(response.data.message);
      setMessageType("success");
      fetchBranches(); // Refresh the branch list
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response?.data?.message || "Something went wrong");
      setMessageType("error");
    }
  };
  
  useEffect(() => {
    if (user) {
      setCompany(user.company_id); // ✅ แก้ไขการอัปเดตค่าให้ถูกต้อง
    }
  }, [user]);

  return (
    <>
      <div className="card mb-3 rounded-0 shadow-sm">
      <div className="d-flex justify-content-between align-items-center">
                        <p className="fw-bolder mx-auto">สาขา</p>
                        <button className="btn-animated " onClick={handleOpenModalBanchAdd}><i class="bi bi-pencil-fill fs-3"></i></button>
                    </div>
        <div className="p-3">
          {message && (
            <div
              className={`alert ${
                messageType === "success" ? "alert-success" : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}

        </div>
        
        <div className="p-3">
          <div className="row">
          <div className="container">
  <div className="row">
    {branches && (
      <div className="container">
      <div className="row">
        {branches.map((branch) => (
          <div className="col-12 mb-3" key={branch.id_branch} style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <div>
              <p className="d-flex justify-content-between align-items-center mb-1">
                <span><strong>ชื่อสาขา:</strong> {branch.branch_name}</span>
                <span>
                <button
                    className=" p-0 btn-icon-Delete"
                    onClick={() => handleDelete(branch.id_branch)}
                  >
                    <i className="bi bi-trash3-fill"></i> {/* ลบ */}
                  </button>
                  <button
                    className=" p-0 me-2 btn-animated"
                    onClick={() => handleEditClick(branch)}
                  >
                    <i className="bi bi-pencil-square"></i> {/* แก้ไข */}
                  </button>

                </span>
              </p>
              <p className="mb-1"><strong>ที่อยู่:</strong> {branch.branch_address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    )}
  </div>
</div>

          </div>
        </div>
      </div>

      {modalOpenBranchAdd && (
            <Modal_Branch_Add 
            isOpen = {modalOpenBranchAdd}
            onClose = {handleCloseModalBanchAdd}
            user={user}
            />
        )}

      {/* Modal */}
      <dialog id="my_modal_4" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-center">แก้ไขข้อมูลสาขา</h3>

    {selectedBranch && (
      <>
        <div className="mb-3">
          <label htmlFor="editBranchName" className="form-label">ชื่อสาขา</label>
          <input
            type="text"
            className="form-control"
            id="editBranchName"
            value={selectedBranch.branch_name}
            onChange={(e) =>
              setSelectedBranch((prev) => ({
                ...prev,
                branch_name: e.target.value,
              }))
            }
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="editBranchAddress" className="form-label">ที่อยู่</label>
          <input
            type="text"
            className="form-control"
            id="editBranchAddress"
            value={selectedBranch.branch_address}
            onChange={(e) =>
              setSelectedBranch((prev) => ({
                ...prev,
                branch_address: e.target.value,
              }))
            }
          />
        </div>
      </>
    )}

    <div className="modal-action">
      <button className="btn btn-primary" onClick={handleSaveChanges}>
        บันทึก
      </button>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_4").close()}
      >
        ยกเลิก
      </button>
    </div>
  </div>
</dialog>

    </>
  );
};

export default Branch;
