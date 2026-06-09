import React from "react";

const ProfileSkeleton = () => (
  <div className="card">
    <div className="card-banner">
      <div className="card-banner-pattern" />
      <div className="avatar-wrap">
        <div className="skeleton" style={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid #111118" }} />
      </div>
    </div>
    <div className="card-body">
      <div className="skeleton" style={{ height: 24, width: "55%", marginBottom: 8 }} />
      <div className="skeleton" style={{ height: 14, width: "35%", marginBottom: 14 }} />
      <div className="skeleton" style={{ height: 14, width: "100%", marginBottom: 6 }} />
      <div className="skeleton" style={{ height: 14, width: "80%" }} />
      <div className="divider" />
      {[1, 2, 3].map(i => (
        <div key={i} className="info-item" style={{ marginBottom: 12 }}>
          <div className="skeleton" style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0 }} />
          <div className="skeleton" style={{ height: 14, flex: 1 }} />
        </div>
      ))}
      <div className="divider" />
      <div style={{ display: "flex", gap: 10 }}>
        {[1, 2, 3].map(i => (
          <div key={i} className="skeleton" style={{ flex: 1, height: 36, borderRadius: 50 }} />
        ))}
      </div>
      <div className="action-row" style={{ marginTop: 20 }}>
        <div className="skeleton" style={{ height: 44, borderRadius: 14 }} />
        <div className="skeleton" style={{ height: 44, borderRadius: 14 }} />
      </div>
    </div>
  </div>
);

export default ProfileSkeleton;
