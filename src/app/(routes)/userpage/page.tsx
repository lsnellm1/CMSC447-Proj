import 'bootstrap/dist/css/bootstrap.css'
import "../../styles/globals.css"
import UMBCSHIELD from "../../../../public/imgs/UMBC-justSHIELD-color-for-black-backgrounds.png"
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getSession } from '@auth0/nextjs-auth0';

export default async function UserPage() {
    const session = await getSession();
    




    if (!session) {
        return (
            <div className="container text-center mt-5">
                <h1>Loading...</h1>
            </div>
        );
    }





    return (
        <>
        
            <nav className="navbar bg-body-tertiary" style={{backgroundColor: "gray" }} >
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <Image
                            src={UMBCSHIELD} // Adjusted path to the local image
                            alt="UMBC logo"
                            className="d-inline-block align-text-top"
                            width={30}  // Set width
                            height={24}  // Set height (or adjust to auto if needed, but width/height are required by Next.js Image component)
                        />  
                    </a>
                    <span className='text-center'>Welcome {session.user.name}</span>
                    <a href="/api/auth/logout">Sign out</a>
                </div>

            </nav>

            <div className="container min-vh-100 mt-4">
                <div className="row">
                    <div className="col-md-2 mb-4">
                        <div className="row mb-3">
                            <div className="col-md-12 align-items-center justify-content-center text-center">
                                <FontAwesomeIcon  icon={faUserCircle}  style={{ maxWidth: '125px',width: '100%', height: '100%', maxHeight: '125px' }} />
                            </div>   
                        </div>   

                        <div className='row'>
                            <div className='col-md-12'>
                                <p className=''><strong>Grade</strong> Junior</p>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-12'>
                                <p className=''><strong>GPA</strong> 3.87</p>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-12'>
                                <p className=''><strong>Credits Taken</strong> 80</p>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-12'>
                                <p className=''><strong>Credits Remaining</strong> 40</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7 text-center mb-4">
                        <div className="row mb-2">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        Counselor Alerts
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">None at the moment... Check back with us soon!</p>
                                    </div>
                                </div>
                            </div>   
                        </div>   
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="row mb-2">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        Course Recommendations
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">CMSC 341</li>
                                            <li className="list-group-item">CMSC 313</li>
                                            <li className="list-group-item">CMSC 331</li>
                                        </ul>                                        
                                    </div>
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}