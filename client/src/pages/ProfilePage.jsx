import React from "react";
import { useProfile } from "../context/ProfileContext";
import ProfileCard from "../components/ProfileCard";
import ProfileSkeleton from "../components/ProfileSkeleton";

const ProfilePage = () => {
  const { profile, loading, error, fetchProfile } = useProfile();

  return (
    <div className="page-wrapper">
      {loading && <ProfileSkeleton />}
      {!loading && error && (
        <div className="card">
          <div className="error-state">
            <h3>Connection Error</h3>
            <p style={{ marginBottom: 16 }}>Could not load profile. Is the server running?</p>
            <button className="btn btn-primary" onClick={fetchProfile}>
              Retry
            </button>
          </div>
        </div>
      )}
      {!loading && !error && profile && <ProfileCard profile={profile} />}
    </div>
  );
};

export default ProfilePage;
