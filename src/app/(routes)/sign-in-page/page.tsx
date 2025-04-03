import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

export default function SignInPage() {

    return(
        <>
            <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className='rounded border border-2' style={{minWidth: "400px", minHeight: "400px"}}>
                    <div className='row'>
                        <div className='col-md-12 mt-5 text-center justify-content-center'>
                            <strong>Sign-In</strong>
                        </div>
                    </div>

                    <div className='row mt-2 justify-content-center align-items-center'>
                        <div className='col-8 text-center'>
                            <FontAwesomeIcon icon={faCircleUser} style={{width: "60px", height: "65px"}} />
                        </div>
                    </div>
                    
                    <div className='row mt-2 justify-content-center align-items-center'>
                        <div className='col-8'>
                            <label htmlFor="exampleFormControlInput1" className="form-label ms-2">Email address</label>
                            <input type={"email"} className="form-control" id="exampleFormControlInput1"/>
                        </div>
                    </div>
                    
                    <div className='row mt-2 justify-content-center align-items-center'>
                        <div className='col-8'>
                            <label htmlFor="exampleFormControlInput1" className="form-label ms-2">Password</label>
                            <input type={"text"} className="form-control" id="exampleFormControlInput1"/>
                        </div>
                    </div>

                    <div className='row mt-3 justify-content-center align-items-center'>
                        <div className='col-8'>
                            <button type="button" className="btn btn-primary">Sign In</button>
                            <small className='text-center'>&nbsp;&nbsp; or &nbsp;</small>
                            <small><a href="#">Sign Up</a></small>
                        </div>
                    </div>
                </div>
            </div>
        
        
        
        </>
    );


}