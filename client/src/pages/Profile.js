import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from '../components/common/Toast';
import Footer from '../components/Footer';
const API_URL = 'http://localhost:5000/api';

const Profile = ({ user, token }) => {
  const [profile, setProfile] = useState(null);
  const [recyclingHistory, setRecyclingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (user && token) {
      console.log('Token available:', token ? 'Yes' : 'No');
      console.log('User data:', user);
      fetchProfile();
      fetchRecyclingHistory();
    } else {
      console.log('No token or user data available');
      setLoading(false);
    }
  }, [user, token]);

  const fetchProfile = async () => {
    try {
      console.log('Fetching profile with token:', token);
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Profile response:', response.data);
      setProfile(response.data);
    } catch (err) {
      console.error('Profile fetch error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.config?.headers
      });
      setError('Failed to load profile information');
      setToastMessage(err.response?.data?.error || 'Failed to load profile information');
      setShowToast(true);
    }
  };

  const fetchRecyclingHistory = async () => {
    try {
      console.log('Fetching recycling history with token:', token);
      const response = await axios.get(`${API_URL}/recycling/history`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Recycling history response:', response.data);
      setRecyclingHistory(response.data || []);
    } catch (err) {
      console.error('Recycling history fetch error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.config?.headers
      });
      setError('Failed to load recycling history');
      setToastMessage(err.response?.data?.error || 'Failed to load recycling history');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  if (!user || !token) {
    return (
      <div className="profile-container">
        <h2>Please log in to view your profile</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {showToast && (
        <Toast
          message={toastMessage}
          type="error"
          onClose={() => setShowToast(false)}
        />
      )}
      
      <div className="profile-info">
        <h2>Profile Information</h2>
        {profile ? (
          <div>
            <p><strong>Name:</strong> {profile.name || 'N/A'}</p>
            <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
            <p><strong>Address:</strong> {profile.address || 'N/A'}</p>
          </div>
        ) : (
          <p>No profile information available</p>
        )}
      </div>

      <div className="recycling-history">
        <h2>Recycling History</h2>
        {Array.isArray(recyclingHistory) && recyclingHistory.length > 0 ? (
          <div className="history-list">
            {recyclingHistory.map((booking) => (
              <div key={booking?._id} className="history-item">
                <p><strong>Facility:</strong> {booking?.facilityId?.name || 'Unknown Facility'}</p>
                <p><strong>Device:</strong> {booking?.brand || 'N/A'} {booking?.modelName || ''} ({booking?.deviceType || 'Unknown Device'})</p>
                <p><strong>Pickup Address:</strong> {booking?.pickupAddress || 'N/A'}</p>
                <p><strong>Price:</strong> ₹{booking?.recyclingPrice || 0}</p>
                <p><strong>Status:</strong> {booking?.status || 'N/A'}</p>
                <p><strong>Date:</strong> {booking?.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'Unknown Date'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No recycling history available</p>
        )}
      </div>
      <section className="Footer-section">
        <Footer />
      </section>
    </div>
  );
};

export default Profile;
