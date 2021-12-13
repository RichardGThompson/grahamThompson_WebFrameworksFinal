import './styles.css';



export const TextPost = (props) => {
    
    return(
        <div className="text-post-container">
            <div className="author-container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="" />
                <span className="details">
                    <h2>{props.userName.stringValue}</h2>
                    <p>Placeholder</p>
                </span>
            </div>

            <div className="text-body">
                {props.body.stringValue}
            </div>
        </div>
    );
}