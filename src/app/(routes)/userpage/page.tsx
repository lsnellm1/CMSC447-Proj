import 'bootstrap/dist/css/bootstrap.css'
import "../../styles/globals.css"
import UMBCSHIELD from "../../../../public/imgs/UMBC-primary-logo-RGB.png"
import Image from 'next/image';
import { getSession } from '@auth0/nextjs-auth0';
import { neon } from '@neondatabase/serverless';
import LogOutButton from '../features/userpage/logout';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import  CreateUser  from '../../api/sql/userRole';
async function getUserRole(){
    const session = await getSession();
    if (!session) { 
        redirect('/api/auth/login');
    }

    const sql = neon(`${process.env.DATABASE_URL}`);
    //check if the user is admin
    const adminUser = await sql`SELECT * FROM counselors WHERE email = ${session.user.email}`;
    if (adminUser.length > 0) {
        redirect('/adminpage');
    }

    //get student information from the database
    let studentUser = await sql`SELECT * FROM students WHERE email = ${session.user.email}`;
    if (studentUser.length === 0) {
        await CreateUser(session);
        studentUser = await sql`SELECT * FROM students WHERE email = ${session.user.email}`;
    }
    
    //get student classes from the database
    const Counselor = await sql `
        SELECT * FROM counselors WHERE counselor_id = ${studentUser[0].counselor_id};
    `;

    const recommendations = await sql`
        SELECT * FROM classes WHERE class_name = ANY(${studentUser[0].class_recommendations});
    `;

    return {session: session,userInformation: studentUser[0],counselor: Counselor[0], recommendations: recommendations};
}

export default async function UserPage() {
        


    //check if the user is admin
    const getUser = await getUserRole();
    const session = getUser.session;
    const studentUser = getUser.userInformation;
    const counselor = getUser.counselor;
    const recommendations = getUser.recommendations;
    return (
        <>
            <nav className="navbar bg-light shadow-sm py-3 navsettings" style={{ borderBottom: "2px solid #dee2e6" }}>
                <div className="container d-flex justify-content-between align-items-center">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <Image
                            src={UMBCSHIELD}
                            alt="UMBC logo"
                            className="d-inline-block align-text-top"
                            width={120}
                            height={0}
                            style={{ maxHeight: "50px", objectFit: "contain" }}
                        />
                    </a>
                    <span className="text-center" style={{ color: "#343a40", fontSize: "1.1rem", fontWeight: "500" }}>
                        Welcome, <strong>{studentUser.student_name}</strong>
                    </span>
                    <LogOutButton />
                </div>
            </nav>

            <div className="container w-100 rounded" style={{ maxWidth: '800px', background: "white", boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                <div className="row justify-content-center align-items-center mt-4 p-3" style={{borderRadius: "10px"}}>
                    <div className="col-lg-9">
                        <div className="d-flex align-items-center">
                            <Image
                                src={session.user.picture}
                                alt="User Profile"
                                className="p-2 rounded-circle border"
                                width={90}
                                height={90}
                                style={{ objectFit: "cover", border: "2px solid #dee2e6" }}
                            />
                            <div className="ms-3">
                                <h2 className="mb-1" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#343a40" }}>Undergraduate CMSC</h2>
                                <p className="mb-0" style={{ fontSize: "0.9rem", color: "#6c757d" }}>User Profile</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 text-lg-end text-center mt-3 mt-lg-0">
                        <Link href="/search" className="btnStyle btn btn-primary rounded-pill px-4 py-2" style={{ fontSize: "1rem", fontWeight: "500" }}>
                            Class Search
                        </Link>
                    </div>
                </div>

                <div className="row mt-3 p-3">
                    <div className="col-lg-12">
                        <h5 className="mb-3" style={{ fontWeight: "bold"}}>Advisor Alert</h5>
                        {studentUser.alerts && studentUser.alerts.length > 0 ? (
                            <div 
                                className="alert text-center" 
                                role="alert" 
                                style={{ 
                                    fontSize: "1rem", 
                                    padding: "20px", 
                                    borderRadius: "10px", 
                                    backgroundColor: "#d1ecf1", 
                                    color: "#0c5460" 
                                }}
                            >
                                <p className="mb-0">{studentUser.alerts}</p>
                            </div>
                        ) : (
                            <div 
                                className="alert text-center" 
                                role="alert" 
                                style={{ 
                                    fontSize: "1rem", 
                                    padding: "20px", 
                                    borderRadius: "10px", 
                                    backgroundColor: "#d1ecf1", 
                                    color: "#0c5460" 
                                }}
                            >
                                <p className="mb-0">No alerts at the moment. Check back with us soon!</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="row mt-2 justify-content-center p-3 rounded ">

                    <h5 className="mb-3" style={{ fontWeight: "bold"}}>Academic Advisor</h5>
                    <div className="col-md-6">
                        <div>
                            <h6 className="mb-1">Name</h6>
                            <p className="mb-0">{counselor.name}</p>
                        </div>
                    </div>   
                    <div className='col-md-6'>
                        <div>
                            <h6 className="mb-1">Email</h6>
                            <p className="mb-0">{counselor.email}</p>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-2 p-3">
                    <div className="col-lg-12">
                        <h5 className="mb-3" style={{ fontWeight: "bold"}}>Degree Progress</h5>
                        <div 
                            className="progress shadow-sm" 
                            style={{ height: "35px", borderRadius: "20px", overflow: "hidden", backgroundColor: "#e9ecef" }}
                        >
                            <div
                                className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                                style={{ 
                                    width: `${(studentUser.total_credits / 120) * 100}%`, 
                                    fontSize: "1rem", 
                                    fontWeight: "500" 
                                }}
                                role="progressbar"
                                aria-valuenow={(studentUser.total_credits / 120) * 100}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                {Math.round((studentUser.total_credits / 120) * 100)}% Complete
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row mt-3 p-2 text-center'>
                    <div className="col-md-3">
                        <h6 className="mb-1">Grade</h6>
                        <p>{studentUser.current_status}</p>
                    </div>
                    <div className="col-md-3">
                        <h6 className="mb-1">GPA</h6>
                        <p>{studentUser.gpa}</p>
                    </div>
                    <div className="col-md-3">
                        <h6 className="mb-1">Credits Taken</h6>
                        <p>{studentUser.total_credits}</p>
                    </div>
                    <div className="col-md-3">
                        <h6 className="mb-1">Credits Left</h6>
                        <p>{studentUser.credits_left}</p>
                    </div>  
                </div>

                <div id="searchResults" className="mt-3"></div>
                    <h5 className="mb-3" style={{ fontWeight: "bold"}}>Class Recommendations</h5>
                    {recommendations.length > 0 ? (
                        <ul className="list-group">
                            {recommendations
                                .filter((recommendation, index, self) => 
                                    self.findIndex(r => r.class_name === recommendation.class_name) === index
                                )
                                .map((recommendation, index) => (
                                    <li 
                                        className="list-group-item border d-flex justify-content-between align-items-center rounded" 
                                        key={index} 
                                        style={{ backgroundColor: "white", marginBottom: "10px", padding: "15px" }}
                                    >
                                        <div>
                                            <strong>{recommendation.class_name}</strong>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <span className="badge pillStyle rounded-pill me-2">{recommendation.class_credits} Credits</span>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <div className="alert alert-warning text-center" role="alert" style={{ fontSize: "1rem", padding: "20px", borderRadius: "10px" }}>
                            No class recommendations available at the moment.
                        </div>
                    )}
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