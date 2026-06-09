import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import Toast from "./Toast";

const FormGroup = ({ label, children }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    {children}
  </div>
);

const EditForm = () => {
  const navigate = useNavigate();
  const { profile, saveProfile } = useProfile();

  const [form, setForm] = useState({
    name:        profile?.name || "",
    title:       profile?.title || "",
    description: profile?.description || "",
    phone:       profile?.phone || "",
    email:       profile?.email || "",
    location:    profile?.location || "",
    photo:       profile?.photo || "",
    linkedin:    profile?.social?.linkedin || "",
    instagram:   profile?.social?.instagram || "",
    github:      profile?.social?.github || "",
  });

  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveProfile({
        name:        form.name,
        title:       form.title,
        description: form.description,
        phone:       form.phone,
        email:       form.email,
        location:    form.location,
        photo:       form.photo,
        social: {
          linkedin:  form.linkedin,
          instagram: form.instagram,
          github:    form.github,
        },
      });
      setToast({ message: "Profile saved successfully!", type: "success" });
      setTimeout(() => navigate("/"), 1400);
    } catch {
      setToast({ message: "Failed to save. Try again.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="edit-card">
        {/* Header */}
        <div className="edit-header">
          <div className="edit-header-left">
            <button className="back-btn" onClick={() => navigate("/")} aria-label="Back">
              ←
            </button>
            <div>
              <div className="edit-title">Edit Profile</div>
              <div className="edit-subtitle">Changes apply immediately on save</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="edit-form" onSubmit={handleSubmit}>

          {/* Basic Info */}
          <div className="form-section-label">Basic Info</div>

          <div className="form-row">
            <FormGroup label="Full Name">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Your full name"
                required
              />
            </FormGroup>
            <FormGroup label="Job Title">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g. Full Stack Developer"
              />
            </FormGroup>
          </div>

          <FormGroup label="About / Bio">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Write a short bio..."
            />
          </FormGroup>

          <FormGroup label="Profile Photo URL">
            <input
              name="photo"
              value={form.photo}
              onChange={handleChange}
              className="form-input"
              placeholder="https://..."
              type="url"
            />
          </FormGroup>

          {/* Contact */}
          <div className="form-section-label">Contact</div>

          <div className="form-row">
            <FormGroup label="Phone">
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+91 98765 43210"
                type="tel"
              />
            </FormGroup>
            <FormGroup label="Email">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-input"
                placeholder="you@example.com"
                type="email"
              />
            </FormGroup>
          </div>

          <FormGroup label="Location">
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="form-input"
              placeholder="City, Country"
            />
          </FormGroup>

          {/* Social */}
          <div className="form-section-label">Social Links</div>

          <FormGroup label="LinkedIn URL">
            <input
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              className="form-input"
              placeholder="https://linkedin.com/in/username"
              type="url"
            />
          </FormGroup>

          <FormGroup label="Instagram URL">
            <input
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
              className="form-input"
              placeholder="https://instagram.com/username"
              type="url"
            />
          </FormGroup>

          <FormGroup label="GitHub URL">
            <input
              name="github"
              value={form.github}
              onChange={handleChange}
              className="form-input"
              placeholder="https://github.com/username"
              type="url"
            />
          </FormGroup>

          {/* Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success"
              disabled={saving}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default EditForm;
