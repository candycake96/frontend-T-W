import axios from "axios";
import React from "react";

const JobpositionDelete = ({ id, onDeleteSuccess }) => {

  const positionDelete = async () => {
    try {
      await axios.delete(`http://localhost:7071/api/jobposition_delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      // Trigger refresh of job positions list
      onDeleteSuccess(id);

    } catch (error) {
      console.error("Error deleting job position:", error);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => positionDelete(id)}
    >
      ลบข้อมูล
    </button>
  );
};

export default JobpositionDelete;
