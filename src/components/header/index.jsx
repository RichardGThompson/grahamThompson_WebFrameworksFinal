import './styles.css';
import{ Link } from 'react-router-dom';

export const Header = (props) => {
    
    return(
        <div className="header-wrapper">
            <div className="left-wrapper">
                <div className="profile-picture-container">
                    {/* TODO Replace this image with the real profile picture */}
                    
                    <Link to="/me"><img src={props.userData[0].userImage && `${props.userData[0].userImage.stringValue}`} alt="" /></Link>
                </div>
                <div className="page-name">
                    <h1>Browse</h1>
                </div>
            </div>

            <div className="right-wrapper">
                <ul>
                    <Link className="header-link btn" to="/me">My Account</Link>
                    <Link className="header-link btn" to="/login" onClick={() => props.logoutFunction()}>Logout</Link>
                </ul>
            </div>
        </div>
    );
}