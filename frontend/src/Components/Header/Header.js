import { Link, Redirect } from "react-router-dom";

export default function Header(props){
    return(
    <div className='header'>
        <div className='header-link-box'>
        <Link className="links" to='/home'>Home | </Link>
        <Link className="links" to='/mytrips'>My Trips</Link>
        <Link className="links" to='/login' onClick={props.handleClick}>Logout</Link> 
        </div>
        <h1>City Tours Traveling App</h1>
    </div>  
    )
}