import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddHalls.css'

function AddHalls() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    Hall_Name: "",
    Capacity: "",
    Location: "",
    Price: "",
    Hall_Type: ""
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Hall_Name', inputs.Hall_Name);
    formData.append('Capacity', inputs.Capacity);
    formData.append('Location', inputs.Location);
    formData.append('Price', inputs.Price);
    formData.append('Hall_Type', inputs.Hall_Type);
    formData.append('Photos', file);

    try {
      await axios.post("http://localhost:4000/users", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      window.alert("Hall added successfully!");
      history('/userdetails');
    } catch (error) {
      console.error("Error adding hall:", error);
      window.alert("Error adding hall. Please try again.");
    }
  }
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
          <input type="file" name="Photos" onChange={handleFileChange} required />

          <label>Hall Type:</label>
          <select name="Hall_Type" onChange={handleChange} value={inputs.Hall_Type} required>
            <option value="" disabled>Select the hall type</option>
            <option value="Banquet">Banquet</option>
            <option value="Conference">Conference</option>
            <option value="Meeting Room">Meeting Room</option>
            <option value="Ballroom">Ballroom</option>
          </select>

          <button className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddHalls;