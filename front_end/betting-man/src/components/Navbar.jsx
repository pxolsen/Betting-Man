import { Link } from "react-router-dom"

export default function Navbar(props) {
    const { user, logOut } = props
    return (
        <nav className="nav">
            <Link to="bets">My Bets</Link>
            <Link to="/"><h1 className="text-3xl font-bold">BETTING MAN</h1></Link>
            <Link to="profile">Profile</Link>
        </nav>
    )
}