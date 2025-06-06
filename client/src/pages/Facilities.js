import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map';
import Toast from '../components/common/Toast';
import Footer from '../components/Footer';

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [bookingForm, setBookingForm] = useState({
    deviceType: '',
    brand: '',
    modelName: '',
    pickupAddress: '',
    phoneNumber: '',
    recyclingPrice: ''
  });

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation && searchQuery) {
      fetchFacilities(searchQuery);
    }
  }, [userLocation, searchQuery]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          // Only fetch if we have a search query
          if (searchQuery) {
            await fetchFacilities(searchQuery);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Failed to get your location. Please enter a city name.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser. Please enter a city name.');
    }
  };

  const searchLocation = async (query) => {
    try {
      setLoading(true);
      setError('');
      
      // First try to fetch facilities directly
      await fetchFacilities(query);
      
      // Then get the location for the map
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
      );
      
      if (response.data && response.data.length > 0) {
        const location = {
          lat: parseFloat(response.data[0].lat),
          lng: parseFloat(response.data[0].lon)
        };
        setUserLocation(location);
      } else {
        console.log('Location not found, but continuing with facility search');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search location. Please try again.');
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchLocation(searchQuery);
    }
  };

  const fetchFacilities = async (searchCity) => {
    try {
      setLoading(true);
      setError('');
      
      // Only fetch if we have a search query
      if (!searchCity && !searchQuery) {
        setFacilities([]);
        return;
      }

      console.log('Fetching facilities for:', searchCity || searchQuery);
      
      const response = await axios.get('http://localhost:5000/api/facilities', {
        params: {
          location: userLocation ? `${userLocation.lat},${userLocation.lng}` : null,
          city: searchCity || searchQuery
        }
      }).catch(error => {
        console.error('Axios error:', error.response || error);
        throw error;
      });

      console.log('Received facilities:', response.data);

      if (response.data.length === 0) {
        setError(`No facilities found in ${searchCity || searchQuery}`);
        setFacilities([]);
        return;
      }

      // Additional client-side filtering to ensure exact matches
      const filteredFacilities = response.data.filter(facility => {
        const cityMatch = facility.location.city.toLowerCase().includes((searchCity || searchQuery).toLowerCase());
        const stateMatch = facility.location.state.toLowerCase().includes((searchCity || searchQuery).toLowerCase());
        return cityMatch || stateMatch;
      });

      console.log('Filtered facilities:', filteredFacilities);

      if (filteredFacilities.length === 0) {
        setError(`No facilities found in ${searchCity || searchQuery}`);
        setFacilities([]);
        return;
      }

      setFacilities(filteredFacilities);
    } catch (err) {
      console.error('Fetch facilities error:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError('Failed to fetch facilities. Please try again later.');
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = (latlng) => {
    setUserLocation(latlng);
  };

  const formatHours = (hours) => {
    if (!hours) return 'Hours not available';
    
    const dayNames = {
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
      7: 'Sunday'
    };

    return hours.map(day => {
      const dayName = dayNames[day.day];
      return `${dayName}: ${day.open} - ${day.close}`;
    }).join(', ');
  };

  const handleBookingClick = (facility) => {
    setSelectedFacility(facility);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      setShowToast(true);
      setToastMessage('Please log in to book recycling');
      return;
    }

    try {
      // Decode the token to get user ID
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenData.id;

      // Convert recyclingPrice to a number
      const bookingData = {
        facilityId: selectedFacility._id,
        userId: userId,
        ...bookingForm,
        recyclingPrice: Number(bookingForm.recyclingPrice)
      };

      console.log('Submitting booking with data:', bookingData);

      const response = await axios.post('http://localhost:5000/api/recycling/book', bookingData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setShowToast(true);
      setToastMessage('Booking successful! Check your profile for details.');
      setShowBookingForm(false);
      setBookingForm({
        deviceType: '',
        brand: '',
        modelName: '',
        pickupAddress: '',
        phoneNumber: '',
        recyclingPrice: ''
      });
    } catch (err) {
      console.error('Booking error:', err);
      setShowToast(true);
      setToastMessage(err.response?.data?.error || 'Failed to book recycling. Please try again.');
    }
  };

  const handleBookingFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    
    <div className="facilities-container">
      <section className="search-section">
        <h2>Find E-Waste Facilities</h2>
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter city name (e.g., Madurai)"
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
            <button type="button" onClick={getUserLocation} className="location-button">
              Use My Location
            </button>
          </div>
        </form>
      </section>

      {error && <div className="error-message">{error}</div>}
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}

      <Map 
        facilities={facilities}
        userLocation={userLocation}
        onMapClick={handleMapClick}
      />

      <section className="facilities-list">
        {loading ? (
          <div className="loading">Loading facilities...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : facilities.length === 0 ? (
          <div className="no-results">No facilities found matching your criteria.</div>
        ) : (
          facilities.map(facility => (
            <div key={facility._id} className="facility-card">
              <h3>{facility.name}</h3>
              <p>{facility.location.address}</p>
              <div className="facility-details">
                <p>Hours: {formatHours(facility.operatingHours)}</p>
                {facility.distance && (
                  <p className="distance">Distance: {facility.distance.toFixed(1)} km</p>
                )}
                <p className="verification-status">
                  {facility.verified ? (
                    <span className="verified">✓ Verified Facility</span>
                  ) : (
                    <span className="unverified">⚠ Unverified Facility</span>
                  )}
                </p>
              </div>
              <div className="facility-actions">
                <button
                  className="button directions-button"
                  onClick={() => window.open(
                    `https://www.openstreetmap.org/directions?from=${userLocation?.lat},${userLocation?.lng}&to=${facility.location.coordinates[1]},${facility.location.coordinates[0]}`,
                    '_blank'
                  )}
                >
                  Get Directions
                </button>
                <button
                  onClick={() => handleBookingClick(facility)}
                  className="button"
                >
                  Book Recycling
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {showBookingForm && selectedFacility && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Book Recycling at {selectedFacility.name}</h3>
            <form onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label>Device Type:</label>
                <select
                  name="deviceType"
                  value={bookingForm.deviceType}
                  onChange={handleBookingFormChange}
                  required
                >
                  <option value="">Select Device Type</option>
                  <option value="mobile">Mobile</option>
                  <option value="laptop">Laptop</option>
                  <option value="tablet">Tablet</option>
                  <option value="ipad">iPad</option>
                  <option value="gadgets">Other Gadgets(TV, refrigirator)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Brand:</label>
                <input
                  type="text"
                  name="brand"
                  value={bookingForm.brand}
                  onChange={handleBookingFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Model Name:</label>
                <input
                  type="text"
                  name="modelName"
                  value={bookingForm.modelName}
                  onChange={handleBookingFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Pickup Address:</label>
                <textarea
                  name="pickupAddress"
                  value={bookingForm.pickupAddress}
                  onChange={handleBookingFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={bookingForm.phoneNumber}
                  onChange={handleBookingFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Recycling Price (₹):</label>
                <input
                  type="number"
                  name="recyclingPrice"
                  value={bookingForm.recyclingPrice}
                  onChange={handleBookingFormChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit">Book Recycling</button>
                <button type="button" onClick={() => setShowBookingForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <section className="Footer-section">
      <Footer/>
      </section>
    </div>
  );
};

export default Facilities; 