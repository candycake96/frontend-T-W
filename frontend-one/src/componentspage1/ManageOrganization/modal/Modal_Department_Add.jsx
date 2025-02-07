import axios from "axios";
import React, {useState, useEffect} from "react";
import ReactModal from "react-modal";

const Modal_Department_add = ({isOpen, onClose}) => {
      const [departmentName, setDepartmentName] = useState("");
        const [message, setMessage] = useState("");
        const [messageType, setMessageType] = useState("");

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

        } catch (error) {
          console.error("Error inserting department:", error);
          setMessage("Failed to add department.");
          setMessageType("error");
        }
      };
    
    return (
        <>
        <ReactModal
        
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        contentLabel="เพิ่มสาขาใหม่"
        style={{
          content: {
            width: "90%",
            maxWidth: "600px",
            maxHeight: "30vh",
            margin: "auto",
            padding: "20px",
            border: "none",
            borderRadius: "0.5rem",
            overflowY: "auto",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}>
<div className="">
    
</div>

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
        </ReactModal>
        </>
    )
}

export default Modal_Department_add;