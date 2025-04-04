"use client"
import 'bootstrap/dist/css/bootstrap.css'
import "../../styles/globals.css"
import UMBCSHIELD from "../../../../public/imgs/UMBC-justSHIELD-color-for-black-backgrounds.png"
import Image from 'next/image';
import type { FormEvent } from "react"
import { Amplify } from "aws-amplify"
import { signIn } from "aws-amplify/auth"
import outputs from "../../../../amplify_outputs.json"
import { useState } from "react";
import { useRouter } from 'next/navigation';

Amplify.configure(outputs)


export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signinStatus, setSigninStatus] = useState(false);
    const [signinMsg, setSigninMsg] = useState('');
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>){

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
                router.push("/confirm-sign-in")
            }
        }
        catch (error) {
            setSigninStatus(false);
            console.log(String(error));
            setSigninMsg(String(error).split(":")[1]);   
        }
    }
    return(
        <>
            <form onSubmit={handleSubmit} className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className='rounded border border-2 w-100 h-100 p-5 bg-light' style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px;",minWidth: "100px",minHeight: "100px",maxWidth: "600px", maxHeight: "600px"}}>

                    {!signinStatus && signinMsg != '' && (
                        <div className='row'>
                            <div className='col-md-12 text-center'>
                                <div className="alert alert-danger" role="alert">
                                    {signinMsg}
                                </div>
                            </div>
                        </div>
                    )}

                    {signinStatus && signinMsg != '' && (
                        <div className='row'>
                            <div className='col-md-12 text-center'>
                                <div className="alert alert-success" role="alert">
                                   {signinMsg}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className='row'>
                        <div className='col-md-12 text-center'>
                            <p className='fs-2'>Sign-In</p>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-12 text-center align-items-center justify-content-center'>
                            <Image
                            src={UMBCSHIELD}  // Adjusted path to the local image
                            alt="UMBC logo"
                            className="img-fluid d-block mx-auto"
                            width={100}  // Set width
                            height={100}  // Set height (or adjust to auto if needed, but width/height are required by Next.js Image component)
                            />    
                        </div>
                    </div>

                    <div className='row mt-2 justify-content-center align-items-center'>
                        <div className='col-md-8'>
                            <label htmlFor="exampleFormControlInput1" className="form-label ms-2">Email address</label>
                            <input onChange={(e)=> setEmail(e.target.value)} type={"email"} className="form-control" id="exampleFormControlInput1"/>
                        </div>
                    </div>
                    
                    <div className='row mt-2 justify-content-center align-items-center'>
                        <div className='col-md-8'>
                            <label htmlFor="exampleFormControlInput1" className="form-label ms-2">Password</label>
                            <input  onChange={(e)=> setPassword(e.target.value)} type={"password"} className="form-control" id="exampleFormControlInput1"/>
                        </div>
                    </div>

                    <div className='row mt-4 justify-content-center align-items-center'>
                        <div className='col-md-8 text-center'>
                            <button type="submit" className="btn btnStyle w-75 rounded-pill">Sign In</button>
                        </div>
                    </div>

                    <div className='row mt-4 justify-content-center align-items-center'>
                        <div className='col-md-8 text-center'>
                            <a href="/signup" className='text-decoration-none'>Don&apos;t have an account? Sign Up</a>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );


}