import axios from "axios";
import React from "react";

const JobpositionDelete = ({ id, onDeleteSuccess }) => {

  const positionDelete = async () => {
    try {
      await axios.put(`http://localhost:3333/api/positions_update_status/${id}`,{}, {
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
      className="p-0 btn-icon-Delete"
      onClick={() => positionDelete(id)}
    >
    <i className="bi bi-trash3-fill"></i> {/* ลบ */}
    </button>
  );
};

export default JobpositionDelete;
