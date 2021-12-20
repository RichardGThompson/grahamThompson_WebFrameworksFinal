import './styles.css';
import {TextPost} from '../../textPost';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {useNavigate, Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {CreatePost} from './../../createPost';
import {v4 as uuidv4} from 'uuid';

export const MyAccount = () => {

    const [userPosts, setUserPosts] = useState([]);
    const [userData, setUserData] = useState([]);

    const navigate = useNavigate();

    useEffect( () => {
        const auth = getAuth();

        const getUserPosts = async(userData) => {
            try{
                const response = await fetch(process.env.REACT_APP_POSTS_ENDPOINT);
                const data = await response.json();

                const formattedData = data.documents.map( (post) => {
                    return post.fields;
                });

                // Filter through the posts to just get the ones from the user.
                const userID = userData.userID.stringValue;
                let filteredPosts = formattedData.filter(postData => postData.userID.stringValue === userID);
                setUserPosts(filteredPosts);
            }
            catch(err){
                console.log(err);
            }
        }

        if(!userData[0]){
            onAuthStateChanged(auth, (user) => {
                if(!user){
                    navigate('/login', {replace: true});
                }
                else{
                    const userEmail = auth.currentUser.email;
                    getUserData(userEmail).then(function(value) {
                        setUserData(value[0]);
                        getUserPosts(value[0]);
                    });
                }
            });
        }
    }, []);

    // Get the user's data from the DB based on their email address.
    const getUserData = async(userEmail) => {
        try{
            const response = await fetch(process.env.REACT_APP_USER_ENDPOINT);
            const data = await response.json();

            const formattedUsers = data.documents.map( (user) => {
                return user.fields;
            });
            const userData = formattedUsers.filter(user => user.userEmail.stringValue === userEmail);
            return userData;
        }
        catch(err){
            console.log(err);
        }
    }

    const getPosts = async() => {
        try{
            const response = await fetch(process.env.REACT_APP_POSTS_ENDPOINT);
            const data = await response.json();

            const formattedData = data.documents.map( (post) => {
                return post.fields;
            });

            const userID = userData.userID.stringValue;
            let filteredPosts = formattedData.filter(postData => postData.userID.stringValue === userID);
            setUserPosts(filteredPosts);
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div className="my-account-wrapper">
            {/* Show the user information */}
            <div className="account-info-wrapper">
                <div className="left">
                    <div className="name-picture-container">
                        <div className="user-image-container">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="" />
                        </div>
                        <div className="name-container">
                            {/* Make sure elements are defined before display */}
                            { userData.userFirstName && `${userData.userFirstName.stringValue} ${userData.userLastName.stringValue}`}
                        </div>
                    </div>
                </div>

                <div className="right">
                    <Link className="btn" to="/">Browse</Link>
                </div>
            </div>

            <CreatePost userData={[userData]} getPostsFunction={getPosts}/>

            <div className="user-posts-container">
                {userPosts.map( (post) => <TextPost key={uuidv4()} userData={userData} userID={post.userID} userName={post.userName} userImage={post.userImage} body={post.body} postImage={post.imageURL}/>)}
            </div>
        </div>
    );
}