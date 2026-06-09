import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

const Icons = {
  edit:      "✎",
  phone:     "📞",
  email:     "✉",
  location:  "📍",
  linkedin:  "in",
  instagram: "◎",
  github:    "⌥",
  call:      "↗",
  mail:      "→",
};

const ProfileCard = ({ profile }) => {
  const navigate = useNavigate();

  const { name, title, description, phone, email, location, photo, social } = profile;

  const handleCall = () => {
    if (phone) window.location.href = `tel:${phone.replace(/\s/g, "")}`;
  };

  const handleEmail = () => {
    if (email) window.location.href = `mailto:${email}`;
  };

  const openSocial = () => {
    const url = social?.linkedin || social?.github || social?.instagram;
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="card">
      {/* Banner */}
      <div className="card-banner">
        <div className="card-banner-pattern" />
        <button className="edit-btn" onClick={() => navigate("/edit")}>
          <span>{Icons.edit}</span> Edit Profile
        </button>
        <div className="avatar-wrap">
          <Avatar src={photo} name={name} />
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        <div className="profile-name">{name}</div>
        {title && <div className="profile-title">{title}</div>}
        {description && <p className="profile-bio">{description}</p>}

        <div className="divider" />

        {/* Contact Info */}
        <div className="info-list">
          {phone && (
            <div className="info-item">
              <div className="info-icon">{Icons.phone}</div>
              <div className="info-text">
                <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
              </div>
            </div>
          )}
          {email && (
            <div className="info-item">
              <div className="info-icon">{Icons.email}</div>
              <div className="info-text">
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>
          )}
          {location && (
            <div className="info-item">
              <div className="info-icon">{Icons.location}</div>
              <div className="info-text">{location}</div>
            </div>
          )}
        </div>

        <div className="divider" />

        {/* Social Pills */}
        <div className="social-row">
          {social?.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
            >
              <span style={{ fontFamily: "serif", fontWeight: 700 }}>in</span>
              LinkedIn
            </a>
          )}
          {social?.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
            >
              <span>◎</span> Instagram
            </a>
          )}
          {social?.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
            >
              <span style={{ fontSize: 16 }}>⌥</span> GitHub
            </a>
          )}
        </div>

        {/* Action Buttons */}
        <div className="action-row">
          <button className="btn btn-primary" onClick={handleCall}>
            <span>{Icons.call}</span> Call
          </button>
          <button className="btn btn-secondary" onClick={handleEmail}>
            <span>{Icons.mail}</span> Email
          </button>
        </div>

        {(social?.linkedin || social?.github || social?.instagram) && (
          <button
            className="btn btn-secondary"
            onClick={openSocial}
            style={{ width: "100%", marginTop: 10 }}
          >
            Open Social Profile ↗
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
