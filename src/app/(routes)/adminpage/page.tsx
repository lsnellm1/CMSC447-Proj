'use client'
import 'bootstrap/dist/css/bootstrap.css'
import "../../styles/globals.css"
import UMBCSHIELD from "../../../../public/imgs/UMBC-primary-logo-RGB.png"
import Image from 'next/image';
import LogOutButton from '../features/userpage/logout';
import ShowModalClass from '../features/adminpage/modal';
import classSearch from '../features/adminpage/searchClasses';
import {deleteClassById} from '../features/adminpage/classFunctions';
import { sendAlert } from '../features/adminpage/classFunctions';
import { sendRecommendation } from '../features/adminpage/classFunctions';



export default function AdminPage() {
    const handleSendAlert = () => {
        const email = (document.getElementById('student-email-input') as HTMLInputElement).value;
        const alertDetails = (document.getElementById('alert-description-input') as HTMLTextAreaElement).value;

        if (!email || !alertDetails) {
            alert("Please fill in all fields.");
            return;
        }

        sendAlert(email, alertDetails).then((response) => {
            if (response) {
                alert("Alert sent successfully!");
            } else {
                alert("Failed to send alert. Please check the email or try again.");
            }
        }).catch((error: unknown) => {
            alert("An error occurred while sending the alert. Please try again.");
        });
    };

    const handleDelete = (classId: number) => {
        deleteClassById(classId).then(() => {
            alert(`Class with ID: ${classId} deleted successfully.`);
        }).catch((error) => {
            console.error('Error deleting class:', error);
        });
    }

    const handleSearch = () => {
        const inputValue = (document.getElementById('searchInput') as HTMLInputElement).value;
        classSearch(inputValue).then((displayClasses) => {
            const resultsContainer = document.getElementById('searchResults');
            if (resultsContainer) {
                resultsContainer.innerHTML = '';
                const listGroup = document.createElement('ul');
                listGroup.className = 'list-group';

                displayClasses.forEach((classItem: { class_name: string, teacher_name: string, class_credits: number, class_id: number }) => {
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item border d-flex justify-content-between align-items-center rounded';
                    listItem.style.backgroundColor = 'white';
                    listItem.style.marginBottom = '10px';
                    listItem.style.padding = '15px';

                    const classInfo = document.createElement('div');

                    const className = document.createElement('strong');
                    className.textContent = classItem.class_name;

                    const teacherInfo = document.createElement('p');
                    teacherInfo.textContent = `With Professor ${classItem.teacher_name}`;
                    teacherInfo.className = 'mb-0';
                    teacherInfo.style.fontSize = '14px';
                    teacherInfo.style.color = '#6c757d';

                    classInfo.appendChild(className);
                    classInfo.appendChild(teacherInfo);

                    const actionContainer = document.createElement('div');
                    actionContainer.className = 'd-flex align-items-center';

                    const creditsBadge = document.createElement('span');
                    creditsBadge.className = 'badge pillStyle rounded-pill me-2';
                    creditsBadge.textContent = `${classItem.class_credits} Credits`;

                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'btn btn-danger btn-sm';
                    deleteButton.textContent = 'Delete';
                    deleteButton.onclick = () => {
                        handleDelete(classItem.class_id);
                        listItem.remove();
                    };

                    actionContainer.appendChild(creditsBadge);
                    actionContainer.appendChild(deleteButton);

                    listItem.appendChild(classInfo);
                    listItem.appendChild(actionContainer);
                    listGroup.appendChild(listItem);
                });

                resultsContainer.appendChild(listGroup);
            }
        }).catch((error) => {
            console.error('Error fetching classes:', error);
        });
    }

    const handleRecommendation = () => {
        const email = (document.getElementById('recommendation-email-input') as HTMLInputElement).value;
        const recommendationDetails = (document.getElementById('recommendation-description-input') as HTMLTextAreaElement).value;

        if (!email || !recommendationDetails) {
            alert("Please fill in all fields.");
            return;
        }

        const recommendations = recommendationDetails.split(',').map(item => item.trim());
        sendRecommendation(email, recommendations).then((response) => {
            if (response) {
                alert("Recommendation sent successfully!");
            } else {
                alert("Recommendation not sent successfully! Check if the classes or email exist.");
            }
        }).catch((error: unknown) => {
            alert("An error occurred while sending the recommendation. Please try again.");
        });
    }

    return (
        <>
        <nav
            className="navbar bg-light shadow-sm py-3 navsettings"
            style={{ borderBottom: "2px solid #dee2e6" }}
        >
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
                <span
                    className="text-center"
                    style={{ color: "#343a40", fontSize: "1.1rem", fontWeight: "500" }}
                >
                    <strong>Admin Page</strong>
                </span>
                <LogOutButton />
            </div>
        </nav>

        <div
            className="container w-100 mt-4 rounded p-4"
            style={{
                maxWidth: "800px",
                background: "white",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
        >
            <div className="row g-4 flex-column">
                {/* Manage Classes Section */}
                <div className="col-md-12">
                    <div className="card h-100 border-0">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Manage Classes</h5>
                            <div className="input-group mb-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search for classes"
                                    aria-label="Search for classes"
                                    id='searchInput'
                                    aria-describedby="search-button"
                                />
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={() => {
                                        handleSearch();
                                    }}
                                    id="search-button"
                                    style={{ borderRadius: "0 0.375rem 0.375rem 0" }}
                                >
                                    Search
                                </button>
                                <button
                                    className="btn btn-success ms-2 rounded-pill"
                                    type="button"
                                    id="add-class-button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addClassModal"
                                >
                                    + Add New Class
                                </button>
                            </div>
                            <div id="searchResults" className="mt-3"></div>
                        </div>
                    </div>
                </div>

                {/* Send Alerts Section */}
                <div className="col-md-12">
                    <div className="card h-100 border-0">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Send Alerts</h5>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Student email"
                                    aria-label="Recipient's email"
                                    id="student-email-input"
                                    aria-describedby="student-email-input"
                                />
                            </div>
                            <div className="mb-4">
                                <textarea
                                    className="form-control"
                                    placeholder="Enter alert details"
                                    aria-label="Alert details"
                                    id="alert-description-input"
                                    aria-describedby="alert-description-input"
                                    rows={4}
                                ></textarea>
                            </div>
                            <button
                                className="btn btn-danger w-100 rounded-pill"
                                type="button"
                                id="send-alert-button"
                                onClick={handleSendAlert}
                            >
                                Send Alert
                            </button>
                        </div>
                    </div>
                </div>

                {/* Send Class Recommendations Section */}
                <div className="col-md-12">
                    <div className="card h-100 border-0">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Send Class Recommendations</h5>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Student email"
                                    aria-label="Recipient's email"
                                    id="recommendation-email-input"
                                    aria-describedby="recommendation-email-input"
                                />
                            </div>
                            <div className="mb-4">
                                <textarea
                                    className="form-control"
                                    placeholder="Enter class recommendations (separated by commas)"
                                    aria-label="Recommendation details"
                                    id="recommendation-description-input"
                                    aria-describedby="recommendation-description-input"
                                    rows={4}
                                ></textarea>
                            </div>
                            <button
                                className="btn btn-info w-100 rounded-pill"
                                type="button"
                                id="send-recommendation-button"
                                onClick={handleRecommendation}
                            >
                                Send Recommendations
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Modal */}
        <ShowModalClass></ShowModalClass>

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
