import React, { useState, useEffect } from "react";

const UserForm = ({ addUser, updateUser, editingUser, setShowForm }) => {
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    } else {
      setFormData({ name: "", email: "", age: "" });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.age) {
      alert("⚠ Please fill in all fields!");
      return;
    }

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert("⚠ Please enter a valid email (only lowercase letters allowed)!");
      return;
    }

    if (editingUser) {
      updateUser(formData);
    } else {
      addUser({ ...formData, id: Date.now().toString() });
    }

    setFormData({ name: "", email: "", age: "" });
  };

  const handleCloseModal = () => {
    setShowForm(false);
    setFormData({ name: "", email: "", age: "" });
  }

  return (
    <>
      <div className="modal-overlay" onClick={handleCloseModal}></div>
      <form className="user-form" onSubmit={handleSubmit}>
        <button type="button" className="close-btn" onClick={handleCloseModal}>
          ×
        </button>
        <h3>{editingUser ? "Update User" : "Add New User"}</h3>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          {editingUser ? "Update User" : "Add User"}
        </button>
      </form>
    </>
  );
};

export default UserForm;
