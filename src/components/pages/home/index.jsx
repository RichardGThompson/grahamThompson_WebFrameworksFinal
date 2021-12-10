import './styles.css';
import {CreatePost} from './../../createPost';
import {Header} from '../../header';

import React, {useEffect, useState} from 'react';

import {getAuth, onAuthStateChanged} from 'firebase/auth';

export const Home = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);

    // Get the current login state of the user.
    useEffect( () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(!user){
                setLoggedIn(false);
            }
            else{
                setLoggedIn(true);
            }
        });
    }, [])
    
    return(
        <div>
            <Header/>
            <div className="home-container">
                <CreatePost/>
                <h2>Recent Posts</h2>
            </div>
        </div>
        
    );
}