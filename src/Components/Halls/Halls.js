import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Halls.css';

function Halls(props) {
  const { _id, Hall_Name, Capacity, Location, Price, Hall_Type, Photos } = props.user;
  const navigate = useNavigate();

  const deleteHandler = async () => {
    const userConfirmed = window.confirm("Are you sure you want to delete this Hall from the list?");
    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/users/${_id}`);
        window.alert("Hall details deleted successfully!");
        navigate("/userdetails");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting hall details", error);
      }
    }
  };

  const photoSrc = Photos && Photos.data
    ? `data:${Photos.contentType};base64,${Photos.data}`
    : '/api/placeholder/300/350';

  return (
    <div className="hall-card">
      <div className="hall-image-container">
        <img src={photoSrc} alt={`${Hall_Name}`} className="hall-photo" />
        <div className="hall-type-badge">{Hall_Type}</div>
      </div>
      <div className="hall-details">
        <h2 className="hall-name">{Hall_Name}</h2>
        <div className="hall-info">
          <p><span className="info-label">Capacity:</span> {Capacity} people</p>
          <p><span className="info-label">Location:</span> {Location}</p>
          <p><span className="info-label">Price:</span> Rs.{Price}/day</p>
        </div>
        <div className="action-buttons">
          <Link to={`/userdetails/${_id}`} className="update-btn">Update</Link>
          <button onClick={deleteHandler} className="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Halls;