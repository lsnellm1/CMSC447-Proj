
import 'bootstrap/dist/css/bootstrap.css'
import "../../styles/globals.css"
import UMBCSHIELD from "../../../../public/imgs/UMBC-primary-logo-RGB.png"
import NAVSHIELD from "../../../../public/imgs/UMBC-vertical-logo-1C-black.png"
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getSession } from '@auth0/nextjs-auth0';
import LogOutButton from '../features/userpage/logout';
import { neon } from '@neondatabase/serverless';
import Link from 'next/link';

export default async function UserPage() {
    const session = await getSession();
    if (!session) {
        return (
            <div className="container text-center mt-5">
                <h1>Loading...</h1>
            </div>
        );
    }
    const sql = neon(`${process.env.DATABASE_URL}`);

    //get student information from the database
    const userResult = await sql`SELECT * FROM students WHERE email = ${session.user.email}`;

    //get student classes from the database
    const userClasses = await sql `
        SELECT c.*
        FROM student_classes sc
        JOIN students s USING (student_id)
        JOIN classes c USING (class_id)
        WHERE sc.student_id = ${userResult[0].student_id};
    `;

    console.log(userClasses[0].class_name);

    return (
        <>
            <nav className="navbar bg-body-tertiary navsettings"  >
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <Image
                            src={UMBCSHIELD} // Adjusted path to the local image
                            alt="UMBC logo"
                            className="d-inline-block align-text-top p-2"
                            width={150}  // Set width
                            height={0}  // Set height (or adjust to auto if needed, but width/height are required by Next.js Image component)
                        />  
                    </a>
                    <span className='text-center' style={{color:"black"}}>Welcome <strong>{userResult[0].student_name}</strong></span>
                    <LogOutButton></LogOutButton>
                </div>
            </nav>

            <div className="container w-100" style={{ maxWidth: '800px' }}>

                <div className="row justify-content-center align-items-center mt-3 p-2 border rounded" style={{background: "white", boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}} >
                    <div className="col-lg-9">
                        <div className='d-flex align-items-center'>
                            <FontAwesomeIcon className='p-2'  icon={faUserCircle}  style={{ maxWidth: '90px',width: '100%', height: '100%', maxHeight: '90px' }} />
                            <h2 className='ms-3'>Undergraduate CMSC</h2>
                        </div>
                    </div>  
                    <div className="col-lg-3">
                        <Link href="/search" className="btn rounded-pill btnStyle">Class Search</Link>
                    </div>
                </div>

                <div className="row justify-content-center mt-2 p-2 border rounded" style={{background: "white", boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                    <div className="col-lg-12 h-100">
                        <h5 className="">Advisor Alerts</h5>
                        None at the moment... Check back with us soon!
                    </div>   
                </div>   

                
                <div className="row mt-2 justify-content-center p-2 border rounded" style={{background: "white", boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                    <div className="col-lg-12">
                        <h5 className="">Academic Advisor</h5>
                        {userResult[0].counselor_name}
                    </div>   
                </div>

                <div className="row justify-content-center mt-2 p-2 border rounded" style={{background: "white", boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                    <div className="col-lg-12 h-100">
                        <h5 className="">Degree</h5>
                        <small>75% Complete</small>
                        <div className="progress" role="progressbar">
                            <div className="progress-bar progress-bar-striped bg-success progress-bar-animated" style={{width: "75%"}}></div>
                        </div>
                    </div>   
                </div> 

                <div className='row justify-content-center mt-2 p-2 border rounded' style={{background: "white", boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                    <div className="col-md-3">
                        <strong>Grade</strong> {userResult[0].current_status}
                    </div>
                    <div className="col-md-3">
                        <strong>GPA</strong> {userResult[0].gpa}
                    </div>
                    <div className="col-md-3">
                        <strong>Credits Taken</strong> {userResult[0].total_credits} 
                    </div>
                    <div className="col-md-3">
                        <strong>Credits Remaining</strong> {userResult[0].credits_left}
                    </div>  
                </div>


                <div className="row mt-2 justify-content-center p-2 border rounded" style={{background: "white", boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                    <div className="col-lg-12 h-100">
                        <h5>Current Courses</h5>
                        <ul className="list-group list-group-flush">
                            {userClasses.map((userClass,index) => (
                                <li className="list-group-item" key={index}>{userClass.class_name} With Professor {userClass.teacher_name} For {userClass.class_credits} Credits</li>))
                            }
                        </ul>
                    </div>   
                </div> 

                <div className="row mt-2 justify-content-center p-2 border rounded" style={{background: "white", boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                    <div className="col-lg-12">
                        <h5 className="">Course Recommendations</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">CMSC 341</li>
                            <li className="list-group-item">CMSC 313</li>
                            <li className="list-group-item">CMSC 331</li>
                        </ul>                                        
                    </div>   
                </div>
            </div>

            <footer className="mt-2">
                <nav className="navbar navbar-expand pb-4">
                    <div className="container rtform-navbar-container d-flex align-items-end flex-wrap" style={{maxWidth: '800px'}}>
                        <div className="me-auto" style={{fontSize:"12px",marginTop:"4px"}}>© 2025 University of Maryland, Baltimore County.</div>
                        <ul className="navbar-nav ms-md-auto" style={{fontSize:"12px",marginTop:"4px"}}>
                            <li className="nav-item">
                                <a className="nav-link py-0" href="https://my3.my.umbc.edu/about/studentdata">Use of Student Data</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link py-0" href="https://umbc.edu/go/equal-opportunity">Equal Opportunity</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link py-0" href="https://umbc.edu/go/safety">Safety Resources</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link py-0" href="https://forms.gle/PcYUQZDVsyzf4xFx5">Feedback</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </footer>


        </>

    );
}