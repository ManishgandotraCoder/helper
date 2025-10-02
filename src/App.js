import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('personal');
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    coverLetter: ''
  });
  const [customInfo, setCustomInfo] = useState([]);
  const [newCustomInfo, setNewCustomInfo] = useState({ key: '', value: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const API_BASE = 'http://localhost:3001';

  // Load data on component mount
  useEffect(() => {
    loadProfile();
    loadCustomInfo();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await axios.get(`${API_BASE}/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error loading profile:', error);
      setMessage('Error loading profile data');
    }
  };

  const loadCustomInfo = async () => {
    try {
      const response = await axios.get(`${API_BASE}/customInfo`);
      setCustomInfo(response.data);
    } catch (error) {
      console.error('Error loading custom info:', error);
    }
  };

  const saveProfile = async () => {
    try {
      await axios.put(`${API_BASE}/profile`, profile);
      setMessage('Profile saved successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage('Error saving profile');
    }
  };

  const addCustomInfo = async () => {
    if (newCustomInfo.key && newCustomInfo.value) {
      try {
        const response = await axios.post(`${API_BASE}/customInfo`, {
          ...newCustomInfo,
          id: Date.now()
        });
        setCustomInfo([...customInfo, response.data]);
        setNewCustomInfo({ key: '', value: '' });
        setMessage('Custom info added successfully!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error adding custom info:', error);
        setMessage('Error adding custom info');
      }
    }
  };

  const deleteCustomInfo = async (id) => {
    try {
      await axios.delete(`${API_BASE}/customInfo/${id}`);
      setCustomInfo(customInfo.filter(item => item.id !== id));
      setMessage('Custom info deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting custom info:', error);
      setMessage('Error deleting custom info');
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setMessage(`${label} copied to clipboard!`);
      setTimeout(() => setMessage(''), 2000);
    });
  };

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const renderPersonalInfo = () => (
    <div className="tab-content">
      {!isEditing ? (
        <div className="profile-display">
          <div className="profile-item">
            <label>Full Name:</label>
            <span>{profile.fullName}</span>
            <button onClick={() => copyToClipboard(profile.fullName, 'Name')}>Copy</button>
          </div>

          <div className="profile-item">
            <label>Email:</label>
            <span>{profile.email}</span>
            <button onClick={() => copyToClipboard(profile.email, 'Email')}>Copy</button>
          </div>

          <div className="profile-item">
            <label>LinkedIn:</label>
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
              {profile.linkedinUrl}
            </a>
            <button onClick={() => copyToClipboard(profile.linkedinUrl, 'LinkedIn URL')}>Copy</button>
          </div>

          <div className="profile-item">
            <label>GitHub:</label>
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
              {profile.githubUrl}
            </a>
            <button onClick={() => copyToClipboard(profile.githubUrl, 'GitHub URL')}>Copy</button>
          </div>

          <div className="profile-item">
            <label>Portfolio:</label>
            <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer">
              {profile.portfolioUrl}
            </a>
            <button onClick={() => copyToClipboard(profile.portfolioUrl, 'Portfolio URL')}>Copy</button>
          </div>

          <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Information</button>
        </div>
      ) : (
        <div className="profile-edit">
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>LinkedIn URL:</label>
            <input
              type="url"
              value={profile.linkedinUrl}
              onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>GitHub URL:</label>
            <input
              type="url"
              value={profile.githubUrl}
              onChange={(e) => handleInputChange('githubUrl', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Portfolio URL:</label>
            <input
              type="url"
              value={profile.portfolioUrl}
              onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
            />
          </div>

          <div className="edit-buttons">
            <button className="save-btn" onClick={saveProfile}>Save</button>
            <button className="cancel-btn" onClick={() => {
              setIsEditing(false);
              loadProfile();
            }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );

  const renderCoverLetter = () => (
    <div className="tab-content">
      <div className="cover-letter-section">
        <div className="cover-letter-display">
          <h3>Cover Letter</h3>
          <div className="cover-letter-text">{profile.coverLetter}</div>
          <div className="cover-letter-actions">
            <button onClick={() => copyToClipboard(profile.coverLetter, 'Cover Letter')}>
              Copy Cover Letter
            </button>
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Cover Letter
            </button>
          </div>
        </div>

        {isEditing && (
          <div className="cover-letter-edit">
            <div className="form-group">
              <label>Cover Letter:</label>
              <textarea
                value={profile.coverLetter}
                onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                rows="10"
                placeholder="Write your cover letter here..."
              />
            </div>

            <div className="edit-buttons">
              <button className="save-btn" onClick={saveProfile}>Save</button>
              <button className="cancel-btn" onClick={() => {
                setIsEditing(false);
                loadProfile();
              }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCustomInfo = () => (
    <div className="tab-content">
      <div className="custom-info-section">
        <h3>Custom Information</h3>

        <div className="add-custom-info">
          <input
            type="text"
            placeholder="Key (e.g., 'Phone')"
            value={newCustomInfo.key}
            onChange={(e) => setNewCustomInfo({ ...newCustomInfo, key: e.target.value })}
          />
          <input
            type="text"
            placeholder="Value (e.g., '+1-234-567-8900')"
            value={newCustomInfo.value}
            onChange={(e) => setNewCustomInfo({ ...newCustomInfo, value: e.target.value })}
          />
          <button onClick={addCustomInfo}>Add</button>
        </div>

        <div className="custom-info-list">
          {customInfo.length === 0 ? (
            <p className="no-data">No custom information added yet. Add some above!</p>
          ) : (
            customInfo.map((item) => (
              <div key={item.id} className="custom-info-item">
                <label>{item.key}:</label>
                <span>{item.value}</span>
                <button onClick={() => copyToClipboard(item.value, item.key)}>Copy</button>
                <button className="delete-btn" onClick={() => deleteCustomInfo(item.id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      <div className="container">
        <h1>Personal Helper - Manish Gandotra</h1>

        {message && <div className="message">{message}</div>}

        <div className="tabs-container">
          <div className="tabs-header">
            <button
              className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('personal');
                setIsEditing(false);
              }}
            >
              Personal Information
            </button>
            <button
              className={`tab-button ${activeTab === 'coverletter' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('coverletter');
                setIsEditing(false);
              }}
            >
              Cover Letter
            </button>
            <button
              className={`tab-button ${activeTab === 'custom' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('custom');
                setIsEditing(false);
              }}
            >
              Custom Information
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'coverletter' && renderCoverLetter()}
            {activeTab === 'custom' && renderCustomInfo()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
