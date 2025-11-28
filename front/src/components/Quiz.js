import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./quiz.css";
import CustomSelect from './CustomSelect';

export default function Quiz({ onDone }) {
    // assets for coin prices
    const [assets, setAssets] = useState([]);
    // investor type: HODLer, Day Trader, NFT Collector
    const [investorType, setInvestorType] = useState("");
    // content types: news, prices, insight, fun
    const [contentTypes, setContentTypes] = useState([]);
    // Options for content types
    const options = [
        { value: "news", label: "Market News" },
        { value: "prices", label: "Charts" },
        { value: "insight", label: "Social" },
        { value: "fun", label: "Fun" },
    ];

    const navigate = useNavigate();
    // Get JWT from localStorage
    const token = localStorage.getItem("token");

    // Handle form submission
    const handleSubmit = async () => {
        // Send preferences to backend
        const res = await fetch("http://localhost:3000/api/preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //add Authorization header with Bearer token
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ assets, investorType, contentTypes }),
        });
        // If successful, call onDone callback
        if (res.ok) {
            onDone();
        } else {
            alert(res.statusText);
            alert("Failed to save preferences");
        }
    };
    // Handle logout
    const handleLogout = () => {
        // Delete JWT
        localStorage.removeItem("token");
        // Redirect to login page
        navigate("/");
    };

    const handleToggleSelection = (clickedValue) => {
        // Check if the clickedValue is already in the array
        if (contentTypes.includes(clickedValue)) {
            // If it is, remove it (deselect)
            setContentTypes(contentTypes.filter(type => type !== clickedValue));
        } else {
            // If it's not, add it (select)
            setContentTypes([...contentTypes, clickedValue]);
        }
    };

    return (
        <div className="quiz-page">
            <div className="quiz-form">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Tell us about your interests</h2>
                    {/* Logout button */}
                    <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>
                {/* Text input for crypto assets */}
                <label>What crypto assets are you interested in?</label>
                <input
                    type="text"
                    placeholder="Bitcoin, Ethereum..."
                    onChange={(e) => setAssets(e.target.value.split(","))}
                />
                {/* Custom select for investor type */}
                <label>What type of investor are you?</label>
                <CustomSelect
                    options={[
                        { value: 'HODLer', label: 'HODLer' },
                        { value: 'Day Trader', label: 'Day Trader' },
                        { value: 'NFT Collector', label: 'NFT Collector' },
                    ]}
                    value={investorType}
                    onChange={(v) => setInvestorType(v)}
                    placeholder="Choose..."
                />
                {/* Checkboxes for content types */}
                <legend>What content do you want to see?</legend>
                <div style={{ display: 'flex', gap: '20px' }}>
                    {/*  Map over options to render checkboxes */}
                    {options.map((option) => (
                        <div key={option.value}>
                            <input
                                type="checkbox"
                                id={option.value}
                                name="content-type"
                                value={option.value}
                                // 'checked' determines the state based on what's in state array
                                checked={contentTypes.includes(option.value)}
                                // Call the handler on change/click
                                onChange={() => handleToggleSelection(option.value)}
                            />
                            <label className="choice" htmlFor={option.value}>
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
                {/* Submit button */}
                <button onClick={handleSubmit}>Finish</button>
            </div>
        </div>
    );
}
