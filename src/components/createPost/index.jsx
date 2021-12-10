import './styles.css';
import React, {useState, useEffect} from 'react';
import {FaRegImage, FaPollH, FaQuoteRight} from 'react-icons/fa';

export const CreatePost = (props) => {
    const [postType, setPostType] = useState('text');

    // Listen if the post type has been changed.
    useEffect( () => {
        //console.log(`Post type changed to: ${postType}`);
    }, [postType]);

    return(
        <div className="create-post-wrapper">
            <h2>Create a Post!</h2>
            <div className="post-container">
                <div className="profile-picture-container">
                    {/* TODO Replace this image with the real profile picture */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="" />
                </div>
                {/* TODO The styling of this needs to be refined */}
                <div className="post-attributes">
                    <textarea name="post-text" id="post-text" placeholder="Post a thing!" maxLength="255"></textarea>
                    <div className="post-actions">
                        <div className="post-types">
                            <FaQuoteRight onClick={() => setPostType('text')}/>
                            <FaRegImage onClick={() => setPostType('image')}/>
                            <FaPollH onClick={() => setPostType('poll')}/>
                        </div>
                        <button className="post-button btn btn-1">Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}