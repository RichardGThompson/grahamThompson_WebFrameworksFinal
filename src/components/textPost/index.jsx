import './styles.css';
import React from 'react';

export const TextPost = (props) => {
    return(
        <div className="text-post-container">
            <div className="author-container">
                <img src={props.userImage && `${props.userImage.stringValue}`} alt="" />
                {/* <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="" /> */}
                <span className="details">
                    <h2>{props.userName.stringValue}</h2>
                </span>
            </div>

            <div className="text-body">
                {props.body.stringValue}
            </div>

            {/* Check to see if there is an image on the post */}
            {
                props.postImage.stringValue && 

                <div className="post-image-container">
                    
                    <img src={props.postImage.stringValue} alt="" />
                </div>
            }
        </div>
    );
}