"use client"
import 'bootstrap/dist/css/bootstrap.css'
import "../../styles/globals.css"
import type { FormEvent } from "react"
import { Amplify } from "aws-amplify"
import { signUp } from "aws-amplify/auth"
import outputs from "../../../../amplify_outputs.json"
import { useState } from "react";

Amplify.configure(outputs)



export default function SignInPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupStatus, setSignupStatus] = useState(false);
    const [signupMsg, setSignupMsg] = useState('');

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        try{
            const {} = await signUp({   
                username: email,
                password: password,
                options: {
                    userAttributes: {
                        email: email,
                        name: name,
                    },
                },
            })
            setSignupMsg("Sign Up Successful. Please check your email for a verification code.");
            setSignupStatus(true);

        }
        catch (error) {
            setSignupStatus(false);
            console.log(String(error));
            switch(String(error)) {
                case "UsernameExistsException: User already exists":
                    setSignupMsg("User already exists. Please log in instead.");
                    break;
                case "InvalidPasswordException: Password did not conform with policy: Password must have uppercase characters":
                    setSignupMsg("Password must have at least one uppercase letter.");
                    break;
                default:
                    setSignupMsg("An Unknown Error Occurred. Please try again.");
                    break;
            }
        }

        setTimeout(() => {
            setSignupMsg('');
          }, 5000); 
    }

    return(
        <>
            <form onSubmit={handleSubmit} className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className='rounded border border-2 w-100 h-100 p-5 bg-light' style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px;",minWidth: "100px",minHeight: "100px",maxWidth: "600px", maxHeight: "600px"}}>
                    
                    { !signupStatus && signupMsg != '' && (
                        <div className='row'>
                            <div className='col-md-12 text-center'>
                                <div className="alert alert-danger" role="alert">
                                   {signupMsg}
                                </div>
                            </div>
                        </div>
                    )}

                    { signupStatus && signupMsg != '' && (
                        <div className='row'>
                            <div className='col-md-12 text-center'>
                                <div className="alert alert-success" role="alert">
                                   {signupMsg}
                                </div>
                            </div>
                        </div>
                    )}


                    <div className='row'>
                        <div className='col-md-12 text-center'>
                            <p className='fs-2'>Sign-Up</p>
                        </div>
                    </div>

                    <div className='row mt-2 justify-content-center align-items-center'>
                        <div className='col-md-8'>
                            <label htmlFor="name" className="form-label ms-2">Full Name</label>
                            <input onChange={(e)=> setName(e.target.value)} type={"text"} className="form-control" id="name" required/>
                        </div>
                    </div>

                    <div className='row mt-2 justify-content-center align-items-center'>
                        <div className='col-md-8'>
                            <label htmlFor="email" className="form-label ms-2">Email address</label>
                            <input onChange={(e)=> setEmail(e.target.value)} type={"email"} className="form-control" id="email" required/>
                        </div>
                    </div>
                    
                    <div className='row mt-2 justify-content-center align-items-center'>
                        <div className='col-md-8'>
                            <label htmlFor="password" className="form-label ms-2">Password</label>
                            <input  onChange={(e)=> setPassword(e.target.value)} type={"password"} className="form-control" id="password" required/>
                        </div>
                    </div>

                    <div className='row mt-4 justify-content-center align-items-center'>
                        <div className='col-md-8 text-center'>
                            <button type="submit"  className="btn btnStyle w-75 rounded-pill">Sign Up</button>
                        </div>
                    </div>

                    <div className='row mt-4 justify-content-center align-items-center'>
                        <div className='col-md-8 text-center'>
                            <a href="/sign-in-page" className='text-decoration-none'>Log In</a>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );


}