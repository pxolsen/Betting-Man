import { Link } from "react-router-dom"

export default function Navbar(props) {
    const { user, logOut } = props
    return (
        <nav className="nav items-center">
            {
            user ?
            <>
            <div className="leftSide">
                <Link to="bets">My Bets</Link>
            </div>
            <div className="centerSide">
                <Link to="/"><h1 className="text-3xl font-bold">BETTING MAN</h1></Link>
            </div>
            <div className="rightSide">
                <Link to="profile">Profile</Link>
            </div>
            </>
            :
            <div className="centerSide">
                <Link className="text-3xl font-bold" to="/"><h1>BETTING MAN</h1></Link>
            </div>
            }
        </nav>
    )
}