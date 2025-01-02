import React, { useState } from "react";
import { z } from "zod";
import "./App.css";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z
    .number()
    .min(18, "Age must be at least 18")
    .max(100, "Age must be less than 100"),
  qualification: z.string().min(1, "Qualification is required"),
});

export default function Table() {
  const [show, setShow] = useState(null);
  const [arrlist, setArrList] = useState([
    { id: 1, name: "surya", age: 24, qualification: "BE(cse)" },
    { id: 2, name: "sarath", age: 21, qualification: "BE(ece)" },
    { id: 3, name: "ranjith", age: 29, qualification: "BE(ece)" },
    { id: 4, name: "vijay", age: 27, qualification: "BE(cse)" },
    { id: 5, name: "siva", age: 25, qualification: "BE(ece)" },
  ]);
  const [editingItem, setEditingItem] = useState(null);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newQualification, setNewQualification] = useState("");
  const [error, setError] = useState("");

  function handleShow(item) {
    setShow(item);
    setEditingItem(null);
  }

  function handleEdit(item) {
    setEditingItem(item);
    setNewName(item.name);
    setNewAge(item.age);
    setNewQualification(item.qualification);
    setError("");
  }

  function handleUpdate() {
    const validationResult = userSchema.safeParse({
      name: newName,
      age: parseInt(newAge, 10),
      qualification: newQualification,
    });

    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }

    if (editingItem) {
      const updatedArrlist = arrlist.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              name: newName,
              age: parseInt(newAge, 10),
              qualification: newQualification,
            }
          : item
      );
      setArrList(updatedArrlist);
      setShow({
        ...editingItem,
        name: newName,
        age: newAge,
        qualification: newQualification,
      });
      setEditingItem(null);
      setNewName("");
      setNewAge("");
      setNewQualification("");
      setError("");
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>s.no</th>
            <th>name</th>
            <th>age</th>
            <th>qualification</th>
          </tr>
        </thead>
        <tbody>
          {arrlist.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>
                {item.qualification}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <button
                    style={{ border: "1px solid red", borderRadius: "30px" }}
                    onClick={() => handleShow(item)}
                  >
                    Show
                  </button>
                  <button
                    style={{
                      border: "1px solid red",
                      borderRadius: "30px",
                      marginLeft: "6px",
                    }}
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {show && (
          <div
            style={{
              textAlign: "center",
              border: "2px solid gray",
              width: "350px",
              background: "lightgray",
              borderRadius: "100px",
            }}
          >
            <h1 style={{ color: "red" }}>PERSON DATA</h1>
            <h4>Name: {show.name}</h4>
            <p>Age: {show.age}</p>
            <p>Qualification: {show.qualification}</p>
          </div>
        )}
        {editingItem && (
          <div
            style={{
              border: "2px solid gray",
              background: "lightgray",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "350px",
            }}
          >
            <h2>Edit Details</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name"
              style={{
                margin: "10px 0",
                padding: "5px",
                width: "60%",
              }}
            />
            <input
              type="number"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value)}
              placeholder="Age"
              style={{
                margin: "10px 0",
                padding: "5px",
                width: "60%",
              }}
            />
            <input
              type="text"
              value={newQualification}
              onChange={(e) => setNewQualification(e.target.value)}
              placeholder="Qualification"
              style={{
                margin: "10px 0",
                padding: "5px",
                width: "60%",
              }}
            />
            <button
              onClick={handleUpdate}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
