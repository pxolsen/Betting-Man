import { Link } from "react-router-dom"

export default function Navbar(props) {
    const { user, logOut } = props
    return (
        <nav>
            {
            user ?
            <>
            <Link to="bets">My Bets</Link>
            <Link to="home"><h1>BETTING MAN</h1></Link>
            <Link onClick={logOut}>Logout</Link>
            </>
            :
            <Link to="/"><h1>BETTING MAN</h1></Link>
            }
        </nav>
    )
}