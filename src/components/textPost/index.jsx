import './styles.css';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import React, {useState, useEffect} from 'react';


export const TextPost = (props) => {

    const [likeCount, setLikeCount] = useState(0);
    const [userLiked, setUserLiked] = useState(false);

    useEffect( () => {
        // Set the like count when the component loads.
        setLikeCount(props.usersLiked.arrayValue.values.length);

        // Check to see if the user has already liked the post.
    }, []);

    const likePost = () => {
        // Check if the user has already liked the post.
        if(!userLiked){

        }
    }
    
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

            <div className="post-interactions-container">
                {/* If your ID doesn't like then show RegHeart, else Heart */}
                <FaRegHeart/>
                <span onClick={() => likePost()} className="like-count-text">{likeCount}</span>
            </div>
        </div>
    );
}