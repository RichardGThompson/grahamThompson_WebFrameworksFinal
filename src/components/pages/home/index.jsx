import './styles.css';
import {CreatePost} from './../../createPost';
import {Header} from '../../header';

import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

export const Home = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);

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
        });
    }, [])

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
            <Header logoutFunction={logoutFunction}/>
            <div className="home-container">
                <CreatePost/>
                <h2>Recent Posts</h2>
            </div>
        </div>
        
    );
}