import './styles.css';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import React, {useState, useEffect} from 'react';


export const TextPost = (props) => {
    const [likeCount, setLikeCount] = useState(0);
    const [currentUserLiked, setCurrentUserLiked] = useState(false);

    useEffect( () => {
        // Set the like count when the component loads.
        setLikeCount(props.usersLiked.arrayValue.values.length);

        // Check to see if the user has already liked the post.
        console.log('USER DATA: ', props.userData);

        // const matchingUser = props.usersLiked.arrayValue.values.filter(user => user.stringValue === props.userData.userID.stringValue)
        
        if(props.userData[0]){
            for(let i = 0; i < props.usersLiked.arrayValue.values.length; i++){
                console.log('Liked ID: ',props.usersLiked.arrayValue.values[i].stringValue);
                console.log('User ID: ', props.userData[0].userID.stringValue);
                if(props.usersLiked.arrayValue.values[i].stringValue === props.userData[0].userID.stringValue){
                    setCurrentUserLiked(true);
                    break;
                }
            }
        }
        
        
    }, [props.userData]);

    const toggleLikePost = () => {
        // Check if the user has already liked the post.
        if(!currentUserLiked){
            // Like the post
            
            // Change it on the DB
            
            // Temp change the count on the front-end and change the status
            setCurrentUserLiked(true);
            setLikeCount(likeCount + 1);
        }
        else{
            setCurrentUserLiked(false);
            setLikeCount(likeCount - 1);
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

            <div className="post-interactions-container" onClick={() => toggleLikePost()}>
                {/* If your ID doesn't like then show RegHeart, else Heart */}
                {
                    !currentUserLiked && <FaRegHeart/>
                }
                {
                    currentUserLiked && <FaHeart/>
                }
                <span  className="like-count-text">
                    {likeCount}
                </span>
            </div>
        </div>
    );
}