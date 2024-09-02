import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "../Halls/Halls";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:4000/users";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log('Data fetched:', response.data); // Log the data fetched
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error); // Log any errors
    return { users: [] }; // Return an empty array to avoid undefined errors
  }
};

function Home() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => {
      setUsers(data.users || []); // Use an empty array if data.users is undefined
    });
  }, []); // Empty dependency array to fetch data only on component mount

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      Object.values(user).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setUsers(filteredUsers);
    setNoResults(filteredUsers.length === 0);
  };

  const handleAddUserClick = () => {
    navigate("/adduser");
  };

  return (
    <div className="user-details-container">
      <h1>Details About Halls</h1>
      <div className="search-add-container">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search User details"
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>

        <div className="add-user-container">
          <button className="add-user-btn" onClick={handleAddUserClick}>
            Add New Hall
          </button>
        </div>
      </div>

      {noResults ? (
        <div>
          <p>No Users Found</p>
        </div>
      ) : (
        <div className="user-list">
          {users && users.map((user, i) => <User key={i} user={user} />)}
        </div>
      )}
    </div>
  );
}

export default Home;
