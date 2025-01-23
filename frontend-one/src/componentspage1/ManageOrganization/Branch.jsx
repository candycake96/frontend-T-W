import axios from "axios";
import React, { useState, useEffect } from "react";

const Branch = () => {
  const [branches, setBranches] = useState([]);
  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(null); // For editing

  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7071/api/selectbranch",
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

  const branchInsert = async (e) => {
    e.preventDefault();

    if (!branchName || !branchAddress) {
      setMessage("Branch name and address are required.");
      setMessageType("error");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:7071/api/insertbranch",
        {
          branch_name: branchName,
          branch_address: branchAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setMessage(response.data.message);
      setMessageType("success");
      setBranchAddress("");
      setBranchName("");
      fetchBranches(); // Refresh the branch list
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response.data.message || "Something went wrong");
      setMessageType("error");
    }
  };

  const handleEditClick = (branch) => {
    setSelectedBranch(branch);
    const dialog = document.getElementById("my_modal_4");
    if (dialog) dialog.showModal();
  };

  const handleSaveChanges = async () => {
    if (selectedBranch) {
      try {
        const response = await axios.put(
          `http://localhost:7071/api/updatebranch/${selectedBranch.branch_id}`,
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
    try {
        const response = await axios.delete(`http://localhost:7071/api/deletebranch/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
            }
        )
        setMessage(response.data.message);
        setMessageType('success');
        fetchBranches(); // Refresh the branch list

    } catch (error) {
        console.error('Error:', error);
        setMessage(error.response.data.message || 'Something went wrong');
    }
}


  return (
    <>
      <div>
        <div className="text-center">
          <p className="fs-3 fw-bolder">สาขา</p>
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
          <form onSubmit={branchInsert}>
            <div className="mb-3">
              <label htmlFor="branchName" className="form-label">
                ชื่อสาขา
              </label>
              <input
                type="text"
                className="form-control"
                id="branchName"
                placeholder="ตัวอย่าง สำนักงานใหญ่ กทม."
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="branchAddress" className="form-label">
                ที่อยู่
              </label>
              <input
                type="text"
                className="form-control"
                id="branchAddress"
                placeholder="ถนน เขต จังหวัด.."
                value={branchAddress}
                onChange={(e) => setBranchAddress(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success">
                เพิ่มข้อมูล
              </button>
            </div>
          </form>
        </div>
        <hr />
        <div className="p-3">
          <div className="row">
            {branches.map((branch) => (
              <div className="col-12 col-md-4 mb-3" key={branch.branch_id}>
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <p className="card-title">{branch.branch_name}</p>
                    <p className="card-text">{branch.branch_address}</p>
                    <div className="row">
                      <div className="col">
                        <button
                          className="btn btn-warning col-12"
                          onClick={() => handleEditClick(branch)}
                        >
                          แก้ไข
                        </button>
                      </div>
                      <div className="col">
                        <button className="btn btn-error col-12" onClick={() => handleDelete(branch.branch_id)}>ลบ</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_4" className="modal">
        <div className="">
          <h3 className="font-bold text-lg">Edit Branch</h3>
          {selectedBranch && (
            <>
              <div className="mb-3">
                <label htmlFor="editBranchName" className="form-label">
                  ชื่อสาขา
                </label>
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
                <label htmlFor="editBranchAddress" className="form-label">
                  ที่อยู่
                </label>
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
              Save Changes
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_4").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Branch;
