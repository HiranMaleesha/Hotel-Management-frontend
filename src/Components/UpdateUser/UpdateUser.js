import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateUser.css";

function UpdateUser() {
  const [inputs, setInputs] = useState({
    Hall_Name: "",
    Capacity: "",
    Location: "",
    Price: "",
    Photos: "",
    Hall_Type: "",
  });
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${id}`);
        setInputs(response.data.user || {});
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:4000/users/${id}`, {
        Hall_Name: String(inputs.Hall_Name),
        Capacity: String(inputs.Capacity),
        Location: String(inputs.Location),
        Price: String(inputs.Price),
        Photos: String(inputs.Photos),
        Hall_Type: String(inputs.Hall_Type) 
      });
    } catch (error) {
      console.error("Error updating hall data:", error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    window.alert("Hall details updated successfully");
    history("/userdetails");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h1>Add Hall</h1>

        <form onSubmit={handleSubmit} className="form">
          <label>Hall Name:</label>
          <input type="text" name="Hall_Name" onChange={handleChange} value={inputs.Hall_Name} required />

          <label>Capacity:</label>
          <input type="text" name="Capacity" onChange={handleChange} value={inputs.Capacity} required />

          <label>Location:</label>
          <input type="text" name="Location" onChange={handleChange} value={inputs.Location} required />

          <label>Price:</label>
          <input type="text" name="Price" onChange={handleChange} value={inputs.Price} required />

          <label>Photos:</label>
          <input type="text" name="Photos" onChange={handleChange} value={inputs.Photos} required />

          <label>Hall Type:</label>
          <select name="Hall_Type" onChange={handleChange} value={inputs.Hall_Type} required>
            <option value="" disabled>Select the hall type</option>
            <option value="Banquet">Banquet</option>
            <option value="Conference">Conference</option>
            <option value="Meeting Room">Meeting Room</option>
            <option value="Entrance Team">Entrance Team</option>
          </select>

          <button className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
