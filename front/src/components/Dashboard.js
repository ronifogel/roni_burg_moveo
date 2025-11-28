import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VoteButtons from "./VoteButtons";
import "./dashboard.css";

export default function Dashboard() {
    // State to hold dashboard data and user votes
    const [data, setData] = useState(null);
    const [votes, setVotes] = useState({});

    const navigate = useNavigate();

    // Fetch dashboard data on component mount
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/api/dashboard", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
            .then(res => res.json())
            .then(setData);
    }, []);

    // Handle voting on a section
    const handleVote = (section, value) => {
        // Get current vote (0 if none)
        const currentValue = votes[section] || 0;
        let newValue;

        if (currentValue === value) {
            newValue = 0;
        } else {
            //If A new vote (or opposing vote) is cast set to the new value
            newValue = value;
        }

        // Update local state with the new vote
        setVotes(prevVotes => ({
            ...prevVotes,
            [section]: newValue,
        }));

        //Send request to backend 
        fetch(process.env.REACT_APP_API_URL + "/api/dashboard/vote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //add Authorization header with Bearer token
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ section, value: newValue })
        });
    };

    if (!data) return <div>Loading...</div>;

    const handleLogout = () => {
        // Delete JWT
        localStorage.removeItem("token");
        // Redirect to login page
        navigate("/");
    };

    return (
        <div className="dashboard">
            <div className="header">
                <h1>My Dashboard</h1>
                <div className="header-actions">
                    {/* button to go back to change preferences */}
                    <button onClick={() => navigate("/preference")}>
                        Change My Preferences
                    </button>
                    {/* Logout button */}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            {/* Display market news */}
            {data.news && (
                <div className="dashboard-section">
                    <h2>Market News</h2>
                    {/*Map through the news pieces */}
                    {data.news.map((n, i) => (
                        <p key={i}>{n.title}</p>
                    ))}
                    <VoteButtons section="news" votes={votes} handleVote={handleVote} />
                </div>
            )}
            {/* Display coin prices */}
            {data.prices && (
                <div className="dashboard-section">
                    <h2>Coin Prices</h2>
                    {/* Iterate over prices object and display each coin's price */}
                    {Object.entries(data.prices).map(([coin, info]) => (
                        <p key={coin}>{coin}: ${info.usd}</p>
                    ))}
                    <VoteButtons section="prices" votes={votes} handleVote={handleVote} />
                </div>
            )}
            {/* Display AI Insight */}
            {data.insight && (
                <div className="dashboard-section">
                    <h2>AI Insight</h2>
                    <p>{data.insight}</p>
                    <VoteButtons section="insight" votes={votes} handleVote={handleVote} />
                </div>
            )}
            {/* Display Meme of the Day */}
            {data.meme && (
                <div className="dashboard-section meme-wrap">
                    <h2>Meme of the Day</h2>
                    <img src={data.meme.url} alt="Crypto Meme" />
                    <VoteButtons section="fun" votes={votes} handleVote={handleVote} />
                </div>
            )}
        </div>
    );
}
