import React, { useState, useEffect } from 'react';
import { FaPlus, FaHome, FaSearch, FaCommentDots } from 'react-icons/fa';
import { HiUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import './SearchPage.css';

const SearchPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      fetchUsers();
    }
  }, [searchQuery]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user/search?q=${searchQuery}`);
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        console.error('Failed to fetch users:', data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddUser = async (userId) => {
    try {
      const response = await fetch('/api/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, friendId: userId }), // Assuming current user ID is available
      });
      const data = await response.json();
      if (data.success) {
        alert('User added successfully');
      } else {
        alert('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  return (
    <div className="search-page">
      <header className="search-header">
        <h1>Search Users</h1>
        <input
          type="text"
          placeholder="Search for users..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </header>

      <div className="user-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-item">
              <img src={user.profileImage || '/images/default-profile.png'} alt={user.name} className="user-img" />
              <div className="user-info">
                <h2>{user.name}</h2>
                <p>@{user.username}</p>
              </div>
              <button className="add-btn" onClick={() => handleAddUser(user.id)}>
                <FaPlus />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer Navigation */}
      <footer className="footer-nav">
        <Link to="/profile"><FaHome className="nav-icon" /></Link>
        <Link to="/search"><FaSearch className="nav-icon active" /></Link>
        <Link to="/add"><FaPlus className="nav-icon" /></Link>
        <Link to="/messages"><FaCommentDots className="nav-icon" /></Link>
        <Link to="/user"><HiUserCircle className="nav-icon profile-icon" /></Link>
      </footer>
    </div>
  );
};

export default SearchPage;
