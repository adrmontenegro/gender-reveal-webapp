import { useState } from "react";
import './HomePage.css'
import { Link } from "react-router-dom";

function HomePage() {
    const [result, setResult] = useState('');

    function revealGender() {
        console.log("Reveal clicked");
        const gender = Math.random() < 0.5 ? '¡Es un niño!' : '¡Es una niña!';
        setResult(gender);
    };

    return (
        <div className="container">
            <h1>¿Seré niño o niña?</h1>
            <Link to="/result">
                <button>¡Averiguemoslo!</button>
            </Link>
        </div>
    );
}

export default HomePage;