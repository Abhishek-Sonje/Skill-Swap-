import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import "./Dashboard.css";
import UserCard from "./components/card";

function Dashboard() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [currentHero, setCurrentHero] = useState(0);
  const { id } = useParams();

  const heroMessages = useMemo(
    () => [
      "Connect with skilled professionals",
      "Learn new skills from experts",
      "Share your expertise with others",
      "Grow your skillset and network",
    ],
    []
  );

  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://localhost:5000/api/users/match/${id}`
      );
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid data format received from the server.");
      }
      setMatches(response.data);
      setLoading(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load matches. Please try again."
      );
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroMessages]);

  // Memoize role counts
  const roleCounts = useMemo(
    () => ({
      total: matches.length,
      teachers: matches.filter((match) => match.role === "teacher").length,
      mentors: matches.filter((match) => match.role === "both").length,
    }),
    [matches]
  );

  // Filter matches
  const filteredMatches = useMemo(
    () =>
      matches.filter(
        (match) => filter === "all" || (match.role && match.role === filter)
      ),
    [matches, filter]
  );

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchMatches();
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <ScaleLoader height={45} margin={5} radius={7} width={6} />
        <p className="loading-text">Loading your matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        {error}
        <button
          className="retry-button"
          onClick={handleRetry}
          role="button"
          aria-label="Retry loading matches"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="floating-elements">
          <div className="floating-element floating-1"></div>
          <div className="floating-element floating-2"></div>
          <div className="floating-element floating-3"></div>
          <div className="floating-element floating-4"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">SkillSwap</h1>
          <p className="hero-subtitle">{heroMessages[currentHero]}</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">{roleCounts.total}</span>
              <span className="hero-stat-label">Matches</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">{roleCounts.teachers}</span>
              <span className="hero-stat-label">Teachers</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">{roleCounts.mentors}</span>
              <span className="hero-stat-label">Mentors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <h2 className="section-title">Your Skill Swap Matches</h2>
        <p className="section-subtitle">
          Connect with users to teach and learn new skills
        </p>
        <div className="filter-section">
          <div className="filter-buttons">
            {["all", "teacher", "learner", "both"].map((filterType) => (
              <button
                key={filterType}
                className={`filter-button ${
                  filter === filterType
                    ? "filter-button-active"
                    : "filter-button-inactive"
                }`}
                onClick={() => setFilter(filterType)}
                role="button"
                aria-label={`Filter by ${filterType} profiles`}
              >
                {filterType === "all"
                  ? "All Profiles"
                  : filterType === "both"
                  ? "Mentors"
                  : filterType.charAt(0).toUpperCase() +
                    filterType.slice(1) +
                    "s"}
              </button>
            ))}
          </div>
        </div>
        {filteredMatches.length > 0 ? (
          <div className="dashboard-grid">
            {filteredMatches.map((match) => (
              <UserCard key={match._id} match={match} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div
              className="empty-state-icon"
              role="img"
              aria-label="No Matches"
            >
              🎯
            </div>
            <h3 className="empty-state-title">No matches found</h3>
            <p className="empty-state-text">
              Try adjusting your skills in your profile to find better matches.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
