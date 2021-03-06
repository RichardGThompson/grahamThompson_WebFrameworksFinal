import './styles.css';
import {CreatePost} from './../../createPost';
import {Header} from '../../header';
import {TextPost} from '../../textPost';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {v4 as uuidv4} from 'uuid';

export const Home = (props) => {
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState([]);
    const [userEmail, setUserEmail] = useState('');

    const navigate = useNavigate();

    // Get the current login state of the user.
    useEffect( () => {
        // Get the authorization status from the server.
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            // If the user is not signed in then send them to the login page.
            if(!user){
                navigate('/login', {replace: true});
            }
            else{
                // Get the current user's ID based on their email.
                if(auth.currentUser.email){
                        if(!userData[0]){
                        getUserData(auth.currentUser.email).then(function(value) {
                            setUserData(value);
                        });
                    } 
                }
                else{
                        if(!userData[0]){
                        getUserData(user.email).then(function(value) {
                            setUserData(value);
                        });
                    } 
                }
            }
        });
    }, [])

    // Get the user's data from the DB based on their email address.
    const getUserData = async(userEmail) => {
        try{
            const response = await fetch(process.env.REACT_APP_USER_ENDPOINT);
            const data = await response.json();

            const formattedUsers = data.documents.map( (user) => {
                return user.fields;
            });
            
            const userData = formattedUsers.filter(user => user.userEmail.stringValue.toLowerCase() === userEmail.toLowerCase());
            return userData;
        }
        catch(err){
            console.log(err);
        }
    }

    // Get the posts from the DB.
    useEffect( () => {
        getPosts();
    }, []);

    const getPosts = async() => {
        try{
            const response = await fetch(process.env.REACT_APP_POSTS_ENDPOINT);
            const data = await response.json();

            const formattedData = data.documents.map( (post) => {
                return post.fields;
            });
            setPosts(formattedData);
        }
        catch(err){
            console.log(err);
        }
    }

    // Log out the user.
    const logoutFunction = () => {
        const auth = getAuth();
        try{
            auth.signOut();
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            {
                userData[0] && 
                <div>
                    <Header logoutFunction={logoutFunction} userData={userData}/>
                    <div className="home-container">
                        <CreatePost userData={userData} getPostsFunction={getPosts}/>
                        <h2>Recent Posts</h2>
                        <div className="posts-container">
                            {posts.map( (post) => <TextPost key={uuidv4()} userData={userData} userID={post.userID} userName={post.userName} userImage={post.userImage} body={post.body} postImage={post.imageURL}/>)}
                        </div>
                    </div>
                </div>
                
            }
        </div>
        
    );
}