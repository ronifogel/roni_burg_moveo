import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";


export default function Login({ onLogin }) {
    // State variables for email, password, error message
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send login request to backend
        const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        // Parse response data
        const data = await res.json();

        // Handle errors
        if (!res.ok) {
            setError(data.message || "Login failed");
            return;
        }
        // Redirect to quiz if not yet completed
        if (!data.user.preferencesCompleted) {
            navigate("/preference");
            // Redirect to dashboard if quiz is completed
        } else {
            navigate("/dashboard");
        }
        // Save JWT to localStorage and notify parent component
        localStorage.setItem("token", data.token);
        onLogin && onLogin(data.user);
    };


    return (
        <div className="login-page">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="text-2xl font-bold mb-4 text-center" >Login</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {/* If no error exists, show input fields */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    required
                />
                {/* Login button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    Login
                </button>
                {/* Create account button */}
                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="w-full bg-gray-500 text-white py-2 rounded mt-2 hover:bg-gray-600 transition"
                >
                    Create an account
                </button>
            </form>

        </div>
    );
}