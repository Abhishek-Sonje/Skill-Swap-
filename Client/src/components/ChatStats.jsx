import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import './ChatStats.css';

const ChatStats = () => {
  const { userData, backendUrl } = useContext(AppContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChatStats();
  }, []);

  const fetchChatStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/messages/stats`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStats(data.stats);
        } else {
          setError('Failed to load chat statistics');
        }
      } else {
        setError('Failed to load chat statistics');
      }
    } catch (error) {
      console.error('Error fetching chat stats:', error);
      setError('Failed to load chat statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="chat-stats">
        <h3>Chat Statistics</h3>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chat-stats">
        <h3>Chat Statistics</h3>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="chat-stats">
      <h3>💬 Chat Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats?.totalMessages || 0}</div>
          <div className="stat-label">Total Messages</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats?.todayMessages || 0}</div>
          <div className="stat-label">Today's Messages</div>
        </div>
      </div>

      {stats?.topUsers && stats.topUsers.length > 0 && (
        <div className="top-users">
          <h4>🏆 Top Contributors</h4>
          <div className="users-list">
            {stats.topUsers.map((user, index) => (
              <div key={user._id} className="user-item">
                <div className="user-rank">#{index + 1}</div>
                <div className="user-name">{user.userName}</div>
                <div className="user-messages">{user.messageCount} messages</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatStats; 