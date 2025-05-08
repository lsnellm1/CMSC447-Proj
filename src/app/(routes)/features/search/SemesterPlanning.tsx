'use client';
import 'bootstrap/dist/css/bootstrap.css';
import "../../../styles/globals.css";
import LogOutButton from '../../features/userpage/logout';
import UMBCSHIELD from "../../../../../public/imgs/UMBC-justSHIELD-color-for-black-backgrounds.png"
import Image from 'next/image';
import classSearch from '../adminpage/searchClasses';
import { getPrerequisites } from '../adminpage/classFunctions';
import { useState } from 'react';
import { getUserInfo } from '../adminpage/classFunctions';
import { useEffect } from 'react';
import Link from 'next/link';
interface Class {
    id: number;
    name: string;
    teacher: string;
    credits: number;
    prerequisites?: string[]; // Added prerequisites property
}

interface Semester {
    name: string;
    classes: Class[];
}

export default function PlanSemester(email: any) {
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [draggedClass, setDraggedClass] = useState<Class | null>(null);
    const [creditsTaken, setCreditsTaken] = useState<number>(0);
    const [creditsNeeded, setCreditsNeeded] = useState<number>(0);

    const handleAddSemester = () => {
        const newSemester: Semester = {
            name: `Semester ${semesters.length + 1}`,
            classes: []
        };
        setSemesters([...semesters, newSemester]);
    };

    const handleRemoveSemester = (index: number) => {
        const updatedSemesters = semesters.filter((_, i) => i !== index);
        setSemesters(updatedSemesters);
    };



    useEffect(() => {
        const getUser = async () => {
            const userData = await getUserInfo(email.email);
            setCreditsTaken(userData[0].total_credits);
            setCreditsNeeded(userData[0].credits_left);

            // Update semester names to include credits needed
            setSemesters((prevSemesters) =>
                prevSemesters.map((semester, index) => ({
                    ...semester,
                    name: `Semester ${index + 1} (${userData[0].credits_needed} Credits Needed)`
                }))
            );
        };

        getUser();
    }, []);

    const fetchPrerequisites = async (className: string): Promise<any[]> => {
        try {
            const prerequisites = await getPrerequisites(className);
            console.log(`Prerequisites for class ${className}:`, prerequisites);
            return prerequisites;
        } catch (error) {
            console.error(`Error fetching prerequisites for class ${className}:`, error);
            return [];
        }
    };


    const handleSearch = () => {
        const inputValue = (document.getElementById('searchBar') as HTMLInputElement).value;
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
                    listItem.draggable = true;

                    listItem.ondragstart = () => {
                        setDraggedClass({
                            id: classItem.class_id,
                            name: classItem.class_name,
                            teacher: classItem.teacher_name,
                            credits: classItem.class_credits
                        });
                    };

                    const classInfo = document.createElement('div');

                    const className = document.createElement('strong');
                    className.textContent = classItem.class_name;

                    const teacherInfo = document.createElement('p');
                    teacherInfo.textContent = `With Professor ${classItem.teacher_name}`;
                    teacherInfo.className = 'mb-0';
                    teacherInfo.style.fontSize = '14px';
                    teacherInfo.style.color = '#6c757d';

                    const prerequisitesInfo = document.createElement('p');
                    prerequisitesInfo.className = 'mb-0';
                    prerequisitesInfo.style.fontSize = '12px';
                    prerequisitesInfo.style.color = '#dc3545';

                    fetchPrerequisites(classItem.class_name).then((prerequisites) => {
                        if (prerequisites.length > 0) {
                            prerequisitesInfo.textContent = `Prerequisites: ${prerequisites.join(', ')}`;
                        } else {
                            prerequisitesInfo.textContent = 'No prerequisites';
                        }
                    }).catch((error) => {
                        console.error('Error fetching prerequisites:', error);
                        prerequisitesInfo.textContent = 'Error fetching prerequisites';
                    });

                    classInfo.appendChild(className);
                    classInfo.appendChild(teacherInfo);
                    classInfo.appendChild(prerequisitesInfo);

                    const actionContainer = document.createElement('div');
                    actionContainer.className = 'd-flex align-items-center';

                    const creditsBadge = document.createElement('span');
                    creditsBadge.className = 'badge pillStyle rounded-pill me-2';
                    creditsBadge.textContent = `${classItem.class_credits} Credits`;

                    actionContainer.appendChild(creditsBadge);

                    listItem.appendChild(classInfo);
                    listItem.appendChild(actionContainer);
                    listGroup.appendChild(listItem);
                });

                resultsContainer.appendChild(listGroup);
            }
        }).catch((error) => {
            console.error('Error fetching classes:', error);
        });
    };

    const handleDrop = async (semesterIndex: number) => {
        if (draggedClass) {
            // Check if the class already exists in any semester
            const classExists = semesters.some((semester) =>
                semester.classes.some((classItem) => classItem.id === draggedClass.id)
            );

            if (classExists) {
                alert("This class has already been added to a semester.");
            } else {
                const prerequisites = await fetchPrerequisites(draggedClass.name);
                const updatedSemesters = [...semesters];
                updatedSemesters[semesterIndex].classes.push({
                    ...draggedClass,
                    prerequisites: prerequisites.length > 0 ? prerequisites : ['None']
                });
                setSemesters(updatedSemesters);
            }
            setDraggedClass(null);
        }
    };

    const handleRemoveClass = (semesterIndex: number, classIndex: number) => {
        const updatedSemesters = [...semesters];
        updatedSemesters[semesterIndex].classes.splice(classIndex, 1);
        setSemesters(updatedSemesters);
    };

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
                        <strong>Search Page</strong>
                    </span>
                    <LogOutButton />
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row g-3 align-items-center shadow-sm p-4 rounded bg-light">
                    <div className="col-md-6">
                        <label htmlFor="searchBar" className="form-label visually-hidden">Search</label>
                        <input
                            type="text"
                            id="searchBar"
                            className="form-control form-control-lg"
                            placeholder="Enter search term..."
                            style={{ borderRadius: "0.5rem", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", fontSize: "1rem", padding: "0.5rem 1rem" }}
                        />
                    </div>
                    <div className="col-md-2">
                        <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={handleSearch}
                            style={{ borderRadius: "0.5rem", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", fontSize: "1rem", padding: "0.5rem 1rem" }}
                        >
                            Search
                        </button>
                    </div>
                    <div className="col-md-2">

                        <Link href="/userpage" className="btnStyle btn btn-primary rounded-pill px-4 py-2" style={{ fontSize: "1rem", fontWeight: "500" }}>
                            Back to User Page
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row">
                    {/* Left Side: Display Classes */}
                    <div className="col-md-6">
                        <h3>Classes</h3>
                        <div id="searchResults" className="mt-3">
                            <ul className="list-group">
                                {/* Classes will be dynamically added here */}
                            </ul>
                        </div>
                    </div>

                    {/* Right Side: Add Semester */}
                    <div className="col-md-6">
                        <h3>Add Semester</h3>
                        <div className="d-flex align-items-center mb-3">
                            <button
                                className="btn btn-primary me-3"
                                onClick={handleAddSemester}
                            >
                                Add Semester
                            </button>
                            <div>
                                <p className="mb-0"><strong>Credits Taken:</strong> {creditsTaken}</p>
                                <p className="mb-0"><strong>Credits Needed:</strong> {creditsNeeded}</p>
                            </div>
                        </div>
                        <h4 className="mt-4">Semesters</h4>
                        {semesters.length === 0 ? (
                            <p className="text-muted">Add a semester to get started!</p>
                        ) : (
                            semesters.map((semester, index) => (
                                <div
                                    key={index}
                                    className="border rounded p-3 mb-3"
                                    style={{
                                        backgroundColor: "#f8f9fa",
                                        fontSize: "1.1rem",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        minHeight: "200px"
                                    }}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => {
                                        if (
                                            draggedClass &&
                                            !semester.classes.some(
                                                (classItem) => classItem.id === draggedClass.id
                                            )
                                        ) {
                                            handleDrop(index);
                                        }
                                    }}
                                >
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <strong>
                                            Semester ({semester.classes.reduce((total, classItem) => total + classItem.credits, 0)} Credits)
                                        </strong>
                                        <div className="d-flex align-items-center">
                                            <select
                                                className="form-select form-select-sm me-2"
                                                style={{ width: "120px" }}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>
                                                    Select Term
                                                </option>
                                                <option value="Spring">Spring</option>
                                                <option value="Fall">Fall</option>
                                                <option value="Summer">Summer</option>
                                            </select>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleRemoveSemester(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    {semester.classes.reduce((total, classItem) => total + classItem.credits, 0) > 18 && (
                                        <p className="text-danger mt-2">
                                            Maximum credit limit of 18 exceeded!
                                        </p>
                                    )}
                                    <ul className="mt-2 list-group">
                                        {semester.classes.map((classItem, classIndex) => (
                                            <li
                                                key={classIndex}
                                                className="list-group-item border d-flex justify-content-between align-items-center rounded"
                                                style={{
                                                    backgroundColor: "white",
                                                    marginBottom: "10px",
                                                    padding: "15px"
                                                }}
                                            >
                                                <div>
                                                    <strong>{classItem.name}</strong>
                                                    <p
                                                        className="mb-0"
                                                        style={{
                                                            fontSize: "14px",
                                                            color: "#6c757d"
                                                        }}
                                                    >
                                                        With Professor {classItem.teacher}
                                                    </p>
                                                    <p
                                                        className="mb-0"
                                                        style={{
                                                            fontSize: "12px",
                                                            color: "#dc3545"
                                                        }}
                                                    >
                                                        Prerequisites: {classItem.prerequisites && classItem.prerequisites.length > 0 ? classItem.prerequisites.join(', ') : 'None'}
                                                    </p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <span className="badge pillStyle rounded-pill me-2">
                                                        {classItem.credits} Credits
                                                    </span>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleRemoveClass(index, classIndex)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
