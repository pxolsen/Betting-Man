import { Link } from "react-router-dom"

export default function LandingPage() {

    return (
        <div className="bet-card-holder">
            <div className="button-container">
            <Link to="/login"><button>Login</button></Link>
            <Link to="/signup"><button>Sign Up</button></Link>
            </div>
        </div>
    )
}