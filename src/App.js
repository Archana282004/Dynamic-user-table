import React, { useState, useEffect } from "react";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import "./App.css";
import axios from "axios";
import Header from "./components/header";

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (newUser) => {
    const isDuplicate = users.some((user) => user.email === newUser.email);

    if (isDuplicate) {
      alert("⚠ A user with this email already exists!");
      return;
    }
    axios
      .post("http://localhost:5000/users", newUser)
      .then((response) => {
        setUsers([...users, response.data]);
      })
      .catch((error) => console.error("Error adding user:", error));
    setShowForm(false);
  };

  const updateUser = (updatedUser) => {
    const isDuplicate = users.some(
      (user) => user.email === updatedUser.email && user.id !== updatedUser.id
    );

    if (isDuplicate) {
      alert("⚠ A user with this email already exists!");
      return;
    }

    axios
      .put(`http://localhost:5000/users/${updatedUser?.id}`, updatedUser)
      .then((response) => {
        const updatedUsers = users.map((user) =>
          user.id === updatedUser?.id ? response.data : user
        );
        setUsers(updatedUsers);
      })
      .catch((error) => console.error("Error updating user:", error));

    setShowForm(false);
  };

  const deleteUser = (id) => {
    console.log("Deleting user with ID:", id);
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        axios
          .get("http://localhost:5000/users")
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users after deletion:", error);
          });
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log("User not found!");
        } else {
          console.error("Error deleting user:", error);
        }
      });
  };

  const editUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.age.toString().includes(searchQuery)
  );

  return (
    <div>
      <Header
        setShowForm={setShowForm}
        setEditingUser={setEditingUser}
        showForm={showForm}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />

      {showForm && (
        <UserForm
        setShowForm={setShowForm}
          addUser={addUser}
          updateUser={updateUser}
          editingUser={editingUser}
        />
      )}

      <UserTable
        users={filteredUsers}
        deleteUser={deleteUser}
        editUser={editUser}
      />
    </div>
  );
};

export default App;
