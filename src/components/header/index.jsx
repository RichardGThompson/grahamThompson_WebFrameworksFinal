import './styles.css';
import{ Link } from 'react-router-dom';

export const Header = (props) => {
    
    return(
        <div className="header-wrapper">
            <div className="left-wrapper">
                <div className="profile-picture-container">
                    {/* TODO Replace this image with the real profile picture */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="" />
                </div>
                <div className="page-name">
                    <h1>Browse</h1>
                </div>
            </div>

            <div className="right-wrapper">
                <ul>
                    {/* <li className="header-link">My Account</li> */}
                    <Link to="/my-account"></Link>
                    <Link className="header-link" to="/login" onClick={() => props.logoutFunction()}>Logout</Link>
                    {/* <li >Logout</li> */}
                </ul>
            </div>
        </div>
    );
}