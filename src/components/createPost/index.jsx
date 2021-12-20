import './styles.css';
import React, {useState, useEffect} from 'react';
import {FaRegImage, FaQuoteRight, FaTimesCircle} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid'

import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';

export const CreatePost = (props) => {
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const fileName = uuidv4();
    const [payload, setPayload] = useState({});
    const [postUploading, setPostUploading] = useState(false);

    const storage = getStorage();

    const storageRef = ref(storage, fileName);

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

        const clearInputs = () => {
            const textInput = document.querySelector('#post-text');
            textInput.value = "";
            setImageURL("");
            setImage(null);
        }
        
        const uploadPayload = async() => {
            try{
                const response = await fetch(process.env.REACT_APP_POSTS_ENDPOINT, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(payload)
                });
                clearInputs();
                setPostUploading(false);
                props.getPostsFunction();
            }
            catch(err){
                console.log(err);
                clearInputs();
                setPostUploading(false);
            }
        }
        
        if(payload.fields){
            uploadPayload();
        }
    }, [payload]);

    const createPostPayload = (bodyText, imagePath) => {        
        if(imagePath){
            return({
                fields: {
                    body: {
                        stringValue: bodyText
                    },
                    userID: {
                        stringValue: props.userData[0].userID.stringValue
                    },
                    userImage: {
                        stringValue: props.userData[0].userImage.stringValue
                    },
                    userName: {
                        stringValue: (`${props.userData[0].userFirstName.stringValue} ${props.userData[0].userLastName.stringValue}`)
                    },
                    imageURL: {
                        stringValue: imagePath
                    },
                }
            });
        }
        else{
            return({
                fields: {
                    body: {
                        stringValue: bodyText
                    },
                    userID: {
                        stringValue: props.userData[0].userID.stringValue
                    },
                    userImage: {
                        stringValue: props.userData[0].userImage.stringValue
                    },
                    userName: {
                        stringValue: (`${props.userData[0].userFirstName.stringValue} ${props.userData[0].userLastName.stringValue}`)
                    },
                    imageURL: {
                        stringValue: ""
                    },
                }
            });
        }
    }

    
    const createPost = () => {
        // Check to see if there is an image present that needs to be uploaded.
        const bodyText = document.querySelector('#post-text').value;
        if(!bodyText){
            return;
        }

        setPostUploading(true);
        
        if(image){
            const imageRef = ref(storage, imageURL);
            let imagePATH;
            uploadBytes(storageRef, image).then((snapshot) => {
                getDownloadURL(ref(storage, fileName)).then((url)=>{
                    let tmpPayload = createPostPayload(bodyText, url);
                    setPayload(tmpPayload);
                });
            });
        }
        else{
            setPayload(createPostPayload(bodyText, null));
        }
    }

    const handleTypeChange = (type) => {
        if(type === 'image'){
            const imgUpload = document.querySelector('#img-upload');
            imgUpload.click();
        }
    }

    const onImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const removeImage = () => {
        setImage(null);
        setImageURL('');
        // Set the image container to be inactive.
        const imageContainer = document.querySelector(".image-container");
        imageContainer.classList.remove("active");
    }

    return(
        <div className="create-post-wrapper">
            {
                postUploading &&
                <div className="uploading-container">
                    <div className="loading-components">
                        <div className="loader"></div>
                        <p>Uploading...</p>
                    </div>
                    

                </div>
            }
            <h2>Create a Post!</h2>
            <div className="post-container">
                <div className="profile-picture-container">
                    {/* TODO Replace this image with the real profile picture */}
                    <Link to="me"><img src={props.userData[0].userImage && `${props.userData[0].userImage.stringValue}`} alt="" /></Link>
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