import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import UserCard from "../components/card";
import AppContext from "../context/AppContext.jsx";
import { Users, BookOpen, Zap, Target, Filter, Sparkles } from "lucide-react";
import "../styles/dashboard.css";

function Dashboard() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [currentHero, setCurrentHero] = useState(0);
  const { userData,backendUrl } = useContext(AppContext);
  const id = userData?._id;

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
        `${backendUrl}/api/users/match/${id}`,
        { withCredentials: true }
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
    if (id) {
      fetchMatches();
    } else {
      setError("User ID is not available. Please log in.");
      setLoading(false);
    }
  }, [fetchMatches, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroMessages]);

  const roleCounts = useMemo(
    () => ({
      total: matches.length,
      teachers: matches.filter((match) => match.role === "teacher").length,
      mentors: matches.filter((match) => match.role === "both").length,
    }),
    [matches]
  );

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
      <div className="dashboard-container">
        <div className="dashboard-loading">
          <ScaleLoader
            height={45}
            margin={5}
            radius={7}
            width={6}
            color="#667eea"
          />
          <p className="dashboard-loading-text">Loading your matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-error-outer">
          <div className="dashboard-error">
            <div className="dashboard-error-icon">⚠️</div>
            <h3 className="dashboard-error-title">
              Oops! Something went wrong
            </h3>
            <p className="dashboard-error-desc">{error}</p>
            <button className="retry-btn" onClick={handleRetry}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <section className="dashboard-hero">
        <div className="floating-elements">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`dashboard-floater floater${i}`}
              style={{
                top: `${20 + i * 20}%`,
                left: `${10 + i * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i}s`,
              }}
            />
          ))}
        </div>

        <div className="dashboard-hero-content">
          <h1 className="dashboard-hero-title">
            <Sparkles className="dashboard-hero-icon" />
            Welcome to SkillSwap
          </h1>
          <p className="dashboard-hero-subtitle">{heroMessages[currentHero]}</p>

          <div className="dashboard-stats">
            <div className="dashboard-stat-card">
              <Users size={32} className="dashboard-stat-icon" />
              <span className="dashboard-stat-num">{roleCounts.total}</span>
              <span className="dashboard-stat-label">Total Matches</span>
            </div>
            <div className="dashboard-stat-card">
              <BookOpen size={32} className="dashboard-stat-icon" />
              <span className="dashboard-stat-num">{roleCounts.teachers}</span>
              <span className="dashboard-stat-label">Teachers</span>
            </div>
            <div className="dashboard-stat-card">
              <Zap size={32} className="dashboard-stat-icon" />
              <span className="dashboard-stat-num">{roleCounts.mentors}</span>
              <span className="dashboard-stat-label">Mentors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="dashboard-main">
        <h2 className="dashboard-section-title">Your Skill Swap Matches</h2>
        <p className="dashboard-section-subtitle">
          Connect with amazing people to teach and learn new skills
        </p>

        <div className="dashboard-filter-section">
          <div className="dashboard-filter-btns">
            {["all", "teacher", "learner", "both"].map((filterType) => (
              <button
                key={filterType}
                className={`filter-btn${
                  filter === filterType ? " active" : ""
                }`}
                onClick={() => setFilter(filterType)}
              >
                <Filter size={16} style={{ marginRight: "0.5rem" }} />
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
          <div className="dashboard-empty-state">
            <Target
              size={64}
              color="#667eea"
              style={{ marginBottom: "1.5rem" }}
            />
            <h3 className="dashboard-empty-title">No matches found</h3>
            <p className="dashboard-empty-desc">
              Try adjusting your skills in your profile to find better matches,
              or check back later for new connections.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
