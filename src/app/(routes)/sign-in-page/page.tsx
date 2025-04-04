import 'bootstrap/dist/css/bootstrap.css'
import "../../styles/globals.css"
import UMBCSHIELD from "../../../../public/imgs/UMBC-justSHIELD-color-for-black-backgrounds.png"
import Image from 'next/image';

export default function SignInPage() {

    return(
        <>
            <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className='rounded border border-2 w-100 h-100 p-5 bg-light' style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px;",minWidth: "100px",minHeight: "100px",maxWidth: "600px", maxHeight: "600px"}}>
                    
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
                            <input type={"email"} className="form-control" id="exampleFormControlInput1"/>
                        </div>
                    </div>
                    
                    <div className='row mt-2 justify-content-center align-items-center'>
                        <div className='col-md-8'>
                            <label htmlFor="exampleFormControlInput1" className="form-label ms-2">Password</label>
                            <input type={"text"} className="form-control" id="exampleFormControlInput1"/>
                        </div>
                    </div>

                    <div className='row mt-4 justify-content-center align-items-center'>
                        <div className='col-md-8 text-center'>
                            <button type="button" className="btn btnStyle w-75 rounded-pill">Sign In</button>
                        </div>
                    </div>

                    <div className='row mt-4 justify-content-center align-items-center'>
                        <div className='col-md-8 text-center'>
                            <a href="/signup" className='text-decoration-none'>Don&apos;t have an account? Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );


}