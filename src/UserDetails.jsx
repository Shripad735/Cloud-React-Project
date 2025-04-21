import React, { useState } from 'react';
import axios from 'axios';
import './UserDetails.css'; // Make sure to create this CSS file

const UserDetails = () => {
    const [userId, setUserId] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchUserDetails = async () => {
        if (!userId.trim()) {
            setError('Please enter a User ID');
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await axios.get(`https://9yoywh6519.execute-api.us-east-1.amazonaws.com/dev/getuser/?username=${userId}`); 
            
            if (response.data.user) {
                setUserDetails(response.data.user);
                setError('');
            } else {
                setUserDetails(null);
                setError('User not found');
            }
        } catch (err) {
            console.error('Error fetching user:', err);
            setError('Failed to get user details. Please check the User ID.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchUserDetails();
        }
    };

    return (
        <div className="user-details-container">
            <div className="glass-card">
                <div className="card-header">
                    <h2>User Lookup</h2>
                    <p className="subtitle">Find detailed information about a user</p>
                </div>
                
                <div className="search-container">
                    <div className="input-group">
                        <input 
                            type="text"
                            placeholder="Enter User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="search-input"
                        />
                        <button 
                            onClick={fetchUserDetails}
                            className="search-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 
                                <span className="loading-spinner"></span> : 
                                <span>Search</span>
                            }
                        </button>
                    </div>
                    
                    {error && (
                        <div className="error-message">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/>
                            </svg>
                            <p>{error}</p>
                        </div>
                    )}
                </div>

                {userDetails && (
                    <div className="result-card">
                        <div className="user-avatar">
                            <span>{userDetails.username.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="user-info">
                            <h3>User Details</h3>
                            <div className="info-item">
                                <span className="info-label">User ID</span>
                                <span className="info-value">{userDetails.username}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Email</span>
                                <span className="info-value">{userDetails.email}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Date Joined</span>
                                <span className="info-value">{userDetails.dateJoined}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;