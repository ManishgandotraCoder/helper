import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BasicComponent from './screens/basic';
import CoverComponent from './screens/cover';
import CustomComponent from './screens/custom';
import Experience from './screens/experience';
import NavigationTabs from './components/NavigationTabs';

function App() {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    coverLetter: '',
    phone: ''
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



  return (
    <Router>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={3000}
      >
        <div className="App">
          <div className="container">
            <h1>Personal Helper - Manish Gandotra</h1>

            {message && <div className="message">{message}</div>}

            <div className="tabs-container">
              <div className="tabs-header">
                <NavigationTabs setIsEditing={setIsEditing} />
              </div>

              <div className="tabs-content">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <BasicComponent
                        profile={profile}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        copyToClipboard={copyToClipboard}
                        handleInputChange={handleInputChange}
                        loadProfile={loadProfile}
                        saveProfile={saveProfile}
                      />
                    }
                  />
                  <Route
                    path="/experience"
                    element={
                      <Experience
                        profile={profile}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        copyToClipboard={copyToClipboard}
                        handleInputChange={handleInputChange}
                        loadProfile={loadProfile}
                        saveProfile={saveProfile}
                      />
                    }
                  />
                  <Route
                    path="/cover"
                    element={
                      <CoverComponent
                        profile={profile}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        copyToClipboard={copyToClipboard}
                        handleInputChange={handleInputChange}
                        loadProfile={loadProfile}
                        saveProfile={saveProfile}
                      />
                    }
                  />
                  <Route
                    path="/custom"
                    element={
                      <CustomComponent
                        customInfo={customInfo}
                        newCustomInfo={newCustomInfo}
                        setNewCustomInfo={setNewCustomInfo}
                        addCustomInfo={addCustomInfo}
                        copyToClipboard={copyToClipboard}
                        deleteCustomInfo={deleteCustomInfo}
                      />
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </SnackbarProvider>
    </Router>
  );
}

export default App;
