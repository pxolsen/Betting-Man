import { Link } from "react-router-dom"

export default function Navbar(props) {
    const { user, logOut } = props
    return (
        <nav className="nav">
            {
            user ?
            <>
            <Link to="bets">My Bets</Link>
            <Link to="home"><h1 className="text-3xl font-bold">BETTING MAN</h1></Link>
            <Link onClick={logOut}>Logout</Link>
            </>
            :
            <Link to="/"><h1>BETTING MAN</h1></Link>
            }
        </nav>
    )
}