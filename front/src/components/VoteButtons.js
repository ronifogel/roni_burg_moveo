
import React from 'react';


export default function VoteButtons({ section, votes, handleVote }) {
    // Helper function for styling, extracted for cleaner JSX
    const getButtonStyle = (value) => ({
        // Check if the current vote for the section matches the button's value (1 or -1)
        backgroundColor: votes[section] === value ? 'darkgray' : 'lightgray',
        padding: '8px 12px',
        border: '1px solid #ccc',
        cursor: 'pointer',
        margin: '0 5px',
        borderRadius: '4px'
    });

    return (
        <div className="actions">
            {/*If The same button is pressed again toggle it OFF (set to 0)*/}
            <button
                onClick={() => handleVote(section, 1)}
                style={getButtonStyle(1)}
            >
                👍
            </button>
            {/*Check if the current vote for 'news' is -1 (downvote)*/}
            <button
                onClick={() => handleVote(section, -1)}
                style={getButtonStyle(-1)}
            >
                👎
            </button>
        </div>
    );
}