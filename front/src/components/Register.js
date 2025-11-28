import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register({ onRegister }) {
    // State variables for name, email, password
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // State variables for error and success messages
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send registration request to backend
        const res = await fetch(process.env.REACT_APP_API_URL + "/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        // Parse response data
        const data = await res.json();

        // Handle errors
        if (!res.ok) {
            setError(data.message || "Registration failed");
            return;
        }

        // On success, show success message 
        setSuccess("Registration successful!");
        // Save JWT to localStorage and notify parent component
        localStorage.setItem("token", data.token);
        // Notify parent component
        onRegister && onRegister();
        //redirect to quiz after successful registration
        navigate("/preference");
    };


    return (
        <div className="register-page">
            <form onSubmit={handleSubmit} className="register-form">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

                {/*/ Input field*/}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    required
                />


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

                {/*/ Register button*/}
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                >
                    Register
                </button>
                {/*/ Back to Login button*/}
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full bg-gray-500 text-white py-2 rounded mt-2 hover:bg-gray-600 transition"
                >
                    Back to Login
                </button>
            </form>

        </div>
    );
}