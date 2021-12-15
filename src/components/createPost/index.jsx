import './styles.css';
import React, {useState, useEffect} from 'react';
import {FaRegImage, FaQuoteRight, FaTimesCircle} from 'react-icons/fa';

export const CreatePost = (props) => {
    const [postType, setPostType] = useState('text');
    const [image, setImage] = useState(null);
    const  [imageURL, setImageURL] = useState('');

    useEffect( () => {
        if(image){
            setImageURL(URL.createObjectURL(image));
            // Set the image container to be active.
            const imageContainer = document.querySelector(".image-container");
            // Make the image container active.
            imageContainer.classList.add("active");
        }
    }, [image]);

    useEffect( () => {
        console.log("post type changed!");
    }, [postType]);

    const createPost = () => {
        console.log('create post');
    }

    const handleTypeChange = (type) => {
        if(type === 'image'){
            const imgUpload = document.querySelector('#img-upload');
            imgUpload.click();
        }
        setPostType(type);
    }

    const onImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const removeImage = () => {
        setImage(null);
        setImageURL('');
        const imageContainer = document.querySelector(".image-container");
        imageContainer.classList.remove("active");

        // Set the image container to be inactive.
    }

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
                    <div className="image-container">
                        <FaTimesCircle className="clear-container" onClick={() => removeImage()}/>
                        <img src={imageURL} alt="" />
                    </div>
                    <input type="file" id='img-upload' className="fileupload" accept="image/*" onChange={onImageChange}/>
                    <div className="post-actions">
                        <div className="post-types">
                            <FaQuoteRight onClick={() => handleTypeChange('text')}/>
                            <FaRegImage onClick={() => handleTypeChange('image')}/>
                        </div>
                        <button onClick={() => createPost()} className="post-button btn btn-1">Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}