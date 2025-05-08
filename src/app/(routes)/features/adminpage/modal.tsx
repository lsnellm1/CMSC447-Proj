'use client';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { classAdd } from './classFunctions';
export default function ShowModalClass() {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    const handleAddClass = () => {
        const className = (document.getElementById('className') as HTMLInputElement).value;
        const classInstructor = (document.getElementById('classInstructor') as HTMLInputElement).value;
        const classCredits = parseInt((document.getElementById('classCredits') as HTMLInputElement).value);
        const prerequisites = (document.getElementById('prerequisites') as HTMLInputElement).value
            .split(',')
            .map((prerequisite) => prerequisite.trim())
            .filter((prerequisite) => prerequisite !== ''); // Remove empty strings

        console.log(prerequisites)
        if (!className || !classInstructor || !classCredits) {
            alert("Please fill in all fields.");
            return;
        }

        // Call the function to add the class
        classAdd(className, classInstructor, classCredits, prerequisites).then((success) => {
            if (success) {
                alert("Class added successfully!");
                window.location.reload(); // Refresh the page to see the new class
            } else {
                alert("Class already exists or Prerequisties not found.");
            }
        }).catch((error) => {
            console.error('Error adding class:', error);
        });
    };

    return (
        <>
            <div
                className="modal fade"
                id="addClassModal"
                tabIndex={-1}
                aria-labelledby="addClassModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title" id="addClassModalLabel">
                                Add Class
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="classInstructor"
                                            className="form-label fw-bold"
                                        >
                                            Instructor
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="classInstructor"
                                            placeholder="Enter instructor name"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="classCredits"
                                            className="form-label fw-bold"
                                        >
                                            Class Credits
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="classCredits"
                                            placeholder="Enter class credits"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="className"
                                        className="form-label fw-bold"
                                    >
                                        Class Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="className"
                                        placeholder="Enter class name"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="prerequisites"
                                        className="form-label fw-bold"
                                    >
                                        Prerequisites (comma-separated)
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="prerequisites"
                                        rows={2}
                                        placeholder="Enter prerequisites, separated by commas"
                                    ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" onClick={handleAddClass} className="btn btn-primary">
                                Save Class
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
