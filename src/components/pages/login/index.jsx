import './styles.css';
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


export const Login = (props) => {
    const {register, handleSubmit} = useForm();

    const navigate = useNavigate();

    const [loginMode, setLoginMode] = useState('login');
    const [pageTitle, setPageTitle] = useState('Login to your account!');
    const [pageSubtitle, setPageSubtitle] = useState('Welcome back to your favorite platform!');

    const loginUser = async(formValues) => {
        const auth = getAuth();
        try{
            const loginUser = await signInWithEmailAndPassword(auth, formValues.userEmail, formValues.userPassword);
            navigate('/', {replace: true});
        }
        catch(err){
            console.log(err);
        }
    }

    const signUpUser = async(formValues) => {
        try{
            const auth = getAuth();
            // Validate that the passwords are matching
            if(formValues.userPassword === formValues.userPasswordConfirm){
                const signUpUser = await createUserWithEmailAndPassword(auth, formValues.userEmail, formValues.userPassword);
                
                
                
                try{
                    const userID = signUpUser._tokenResponse.localId;

                    const formattedData = {
                        fields: {
                            userID: {
                                stringValue: userID
                            },
                            userFirstName: {
                                stringValue: formValues.userFirstName
                            },
                            userLastName: {
                                stringValue: formValues.userLastName
                            },
                        }
                        
                    }

                    const response = await fetch(process.env.REACT_APP_USER_ENDPOINT, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify(formattedData)
                    });

                    console.log(response);
                }
                catch(err){
                    console.log(err);
                }
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect( () => {
        switch(loginMode){
            case('login'):
                setPageTitle('Login to your account!');
                setPageSubtitle('Welcome back to your favorite platform!');
                break;
            case('signup'):
                setPageTitle('Create an account today!');
                setPageSubtitle('Connect with all of your friends today!');
                break;
            default:
                console.log("ERROR: Condition not expected!");
        }
    }, [loginMode])
    
    return(
        <div className="login-page-wrapper">
            {/* This goes on the left side of the screen (desktop) */}
            <div className="login-extras">
                <span>
                    <h1>{pageTitle}</h1>
                    <p>{pageSubtitle}</p>
                </span>
            </div>

            {/* This goes on the right side of the screen (desktop) */}
            <div className="login-body">
                <div className="login-box">
                    {
                        loginMode === 'login' && (
                            <span>
                                <div className="form-container">
                                    <form action="" onSubmit={handleSubmit(loginUser)}>
                                        <span className="input-fields">
                                            <input name='userEmail' required type="email" className="text-input" placeholder="Email" {...register('userEmail')} />
                                            <input name='userPassword' required type="password" className="text-input" placeholder="Password" {...register('userPassword')} />
                                        </span>
                                        <input type="submit" value="Login" className="btn btn-fw"/>
                                    </form>
                                </div>
                                <div className="alt-container">
                                    <button className="btn btn-2" onClick={() => setLoginMode('signup')}>Sign Up</button>
                                </div>
                            </span>
                        )
                    }

                    {
                        loginMode === 'signup' && (
                            <span>
                                <div className="form-container">
                            
                                    <form action="" onSubmit={handleSubmit(signUpUser)}>
                                        <span className="input-fields">
                                            <input name='userFirstName' required type="text" className="text-input" placeholder="First Name" {...register('userFirstName')} />
                                            <input name='userLastName' required type="text" className="text-input" placeholder="Last Name" {...register('userLastName')} />

                                            <input name='userEmail' required type="email" className="text-input" placeholder="Email" {...register('userEmail')} />
                                            <input name='userPassword' required type="password" className="text-input" placeholder="Password" {...register('userPassword')} />
                                            <input name='userPasswordConfirm' required type="password" className="text-input" placeholder="Confirm Password" {...register('userPasswordConfirm')} />
                                        </span>
                                        <input type="submit" value="Create Account" className="btn btn-fw"/>
                                    </form>
                                </div>
                                <div className="alt-container">
                                    <button className="btn btn-2" onClick={() => setLoginMode('login')}>Login</button>
                                </div>
                            </span>
                        )
                    }
                    
                </div>
            </div>
        </div>
    );
}