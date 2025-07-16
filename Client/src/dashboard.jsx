import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function Dashboard() {
  let { id } = useParams();
  let [matches, setMatches] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/match/${id}`
        );
        console.log("Matches fetched successfully:", response.data);
        setMatches(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching matches:", error);
        setLoading(false);
      }
    };
    fetchMatches();
  }, [id]);
    
    if (loading) {
      return <h1>Loading...</h1>;
    }

    return (
        <>
            <h1>Dashboard</h1>
            {matches.map((match) => (<div key={match._id}>
                <h2>{match.name}</h2>
                <p>Role: {match.role}</p>
                <p>Teach Skills: {match.teachSkills.join(", ")}</p>
                <p>Learn Skills: {match.learnSkills.join(", ")}</p>
            </div>))}
        </>
  );
}

export default Dashboard;
