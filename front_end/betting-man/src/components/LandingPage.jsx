import { Link } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function LandingPage() {

    const { user } = useOutletContext()
    const navigate = useNavigate()


    return (
        <div>
            <div className="flex">
            <Link className="btn" to="/login"><button>Login</button></Link>
            <Link className="btn" to="/signup"><button>Sign Up</button></Link>
            </div>
        </div>
    )
}