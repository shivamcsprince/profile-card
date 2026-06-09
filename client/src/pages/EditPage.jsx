import React from "react";
import { useProfile } from "../context/ProfileContext";
import EditForm from "../components/EditForm";

const EditPage = () => {
  const { profile, loading } = useProfile();

  return (
    <div className="edit-wrapper">
      {loading ? (
        <div style={{ color: "var(--text-3)", fontFamily: "var(--font-body)" }}>Loading…</div>
      ) : (
        profile && <EditForm />
      )}
    </div>
  );
};

export default EditPage;
