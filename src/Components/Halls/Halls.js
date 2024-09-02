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

  return (
    <div className="volunteer-card">
      <p><strong>Hall Name:</strong> {Hall_Name}</p>
      <p><strong>Capacity:</strong> {Capacity}</p>
      <p><strong>Location:</strong> {Location}</p>
      <p><strong>Price:</strong> {Price}</p>
      <p><strong>Photos:</strong> {Photos}</p>
      <p><strong>Hall Type:</strong> {Hall_Type}</p>

      <div className="action-buttons">
        <Link to={`/userdetails/${_id}`} className="update-btn">Update</Link>
        <button onClick={deleteHandler} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

export default Halls;
