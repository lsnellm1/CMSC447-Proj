"use client"
import 'bootstrap/dist/css/bootstrap.css'
import "../../styles/globals.css"
import UMBCSHIELD from "../../../../public/imgs/UMBC-justSHIELD-color-for-black-backgrounds.png"
import Image from 'next/image';
import type { FormEvent } from "react"
import { Amplify } from "aws-amplify"
import { signIn } from "aws-amplify/auth"
import {resendSignUpCode} from 'aws-amplify/auth';
import { confirmSignUp } from "aws-amplify/auth";
import outputs from "../../../../amplify_outputs.json"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { signOut } from 'aws-amplify/auth';



Amplify.configure(outputs)

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signinStatus, setSigninStatus] = useState(false);
    const [signinMsg, setSigninMsg] = useState('');
    const [callFunction, setCallFunction] = useState(false);
    const [code, setCode] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const router = useRouter();
    async function fetchSession() {
        await signOut({ global: true });
    }
    fetchSession();


    async function handleLogin(event: FormEvent<HTMLFormElement>){

        event.preventDefault()
        try{
            const {nextStep} = await signIn({   
                username: email,
                password: password,
            })
            setSigninStatus(true);
            console.log("Sign In Successful.");
            console.log(nextStep.signInStep);
            if(String(nextStep.signInStep) === "CONFIRM_SIGN_UP"){
                setCallFunction(true);
            }
            else{
                setSigninMsg("Sign In Successful. Redirecting to User Page...");
                setTimeout(() => {
                    router.push('/userpage');
                }, 5000);
            }
        }
        catch (error) {
            setSigninStatus(false);
            console.log(String(error));
            setSigninMsg(String(error).split(":")[1]);   
        }
    }

    async function handleConfirmSignIn(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        try{
            const {} = await confirmSignUp({
                username: email,
                confirmationCode: code,
            });
            setCodeSent(true);
            setTimeout(() => {
                router.push('/userpage');
            }, 5000);
        }
        catch (error) {
            setSigninStatus(false);
            console.log(String(error));
            setSigninMsg(String(error).split(":")[1]);   
        }
    }
    async function handleVerificationCode(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>){
        event.preventDefault();
        try {
			const { destination, deliveryMedium } = await resendSignUpCode({
				username: email,
			});
            console.log("Verification code sent to:", destination, "via", deliveryMedium);
        }
        catch (error) {
            console.error("Error retrieving current user:", error);
        }
    }

    const submitHandler = callFunction ? handleConfirmSignIn : handleLogin;

    return(
        <>

            <form onSubmit={submitHandler} className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="rounded border border-2 w-100 h-100 p-5 bg-light" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;", minWidth: "100px", minHeight: "100px", maxWidth: "600px", maxHeight: "600px"}}>
                    {callFunction && (
                        <>
                            {codeSent && (
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <div className={`alert alert-success`} role="alert">
                                            {signinMsg}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="row mt-2 justify-content-center align-items-center">
                                <div className="col-md-8">
                                    <label htmlFor="code" className="form-label ms-2">Verfication Code</label>
                                    <input onChange={(e) => setCode(e.target.value)} type="text" className="form-control" id="code" name="code"/>
                                </div>
                            </div>
                            <div className="row mt-4 justify-content-center align-items-center">
                                <div className="col-md-8 text-center">
                                    <button type="submit" className="btn btnStyle w-75 rounded-pill">Sign In</button>
                                </div>
                            </div>

                            <div className="row mt-4 justify-content-center align-items-center">
                                <div className="col-md-8 text-center">
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleVerificationCode(e); }} className="text-decoration-none">Resend Verification Code</a>
                                </div>
                            </div>
                        
                        </>
                    )}


                    {!callFunction && (
                        <>
                        {/* Display Sign-in messages */}
                        {signinMsg && (
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <div className={`alert ${signinStatus ? 'alert-success' : 'alert-danger'}`} role="alert">
                                        {signinMsg} 
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sign-in heading */}
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <p className="fs-2">Sign-In</p>
                            </div>
                        </div>

                        {/* UMBC logo */}
                        <div className="row">
                            <div className="col-md-12 text-center align-items-center justify-content-center">
                                <Image
                                    src={UMBCSHIELD} // Adjusted path to the local image
                                    alt="UMBC logo"
                                    className="img-fluid d-block mx-auto"
                                    width={100}  // Set width
                                    height={100}  // Set height (or adjust to auto if needed, but width/height are required by Next.js Image component)
                                />    
                            </div>
                        </div>

                        {/* Email input */}
                        <div className="row mt-2 justify-content-center align-items-center">
                            <div className="col-md-8">
                                <label htmlFor="email" className="form-label ms-2">Email address</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" name="email"/>
                            </div>
                        </div>
                        
                        {/* Password input */}
                        <div className="row mt-2 justify-content-center align-items-center">
                            <div className="col-md-8">
                                <label htmlFor="password" className="form-label ms-2">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" name="password"/>
                            </div>
                        </div>

                        <div className="row mt-4 justify-content-center align-items-center">
                            <div className="col-md-8 text-center">
                                <button type="submit" className="btn btnStyle w-75 rounded-pill">Sign In</button>
                            </div>
                        </div>

                        {/* Link to Sign Up page */}
                        <div className="row mt-4 justify-content-center align-items-center">
                            <div className="col-md-8 text-center">
                                <a href="/signup" className="text-decoration-none">Don&apos;t have an account? Sign Up</a>
                            </div>
                        </div>
                        </>
                    )}
                </div>
            </form>
        </>
    );


}