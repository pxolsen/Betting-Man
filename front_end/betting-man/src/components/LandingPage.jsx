import { Link } from "react-router-dom"

export default function LandingPage() {

    return (
        <div>
            <div className="flex">
            <Link className="btn" to="/login"><button>Login</button></Link>
            <Link className="btn" to="/signup"><button>Sign Up</button></Link>
            </div>
        </div>
    )
}