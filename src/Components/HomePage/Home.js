import React, { useEffect, useState } from "react";
import axios from "axios";
import Halls from "../Halls/Halls";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:4000/users";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log('Data fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { users: [] };
  }
};

function Home() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => {
      setUsers(data.users || []);
    });
  }, []);

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

    const handleGenerateReport = async () => {
    try {
      const response = await axios.get(`${URL}/report`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'halls_report.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report. Please try again.');
    }
  };
  return (
    <div className="user-details-container">
      <h1>Details About Halls</h1>
      <div className="search-add-container">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Hall details"
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>

        <div className="add-user-container">
          <button className="add-user-btn" onClick={handleAddUserClick}>
            Add New Hall
          </button>
          <button className="generate-report-btn" onClick={handleGenerateReport}>
          🗒️ Generate Report
          </button>
        </div>
      </div>

      {noResults ? (
        <div>
          <p>No Halls Found</p>
        </div>
      ) : (
        <div className="user-list">
          {users && users.map((user, i) => <Halls key={i} user={user} />)}
        </div>
      )}
    </div>
  );
}

export default Home;