/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const closeDropdown = () => {
        setIsOpen(false);
    }

    // Should add a way to change what requirements exist
    return (
        <div className="dropdown" id="attributes-input">
            <button 
                type="button" 
                className="btn btn-primary dropdown-toggle" 
                data-bs-toggle="dropdown" 
                aria-expanded="false" 
                data-bs-auto-close="outside"
                style={{
                    width: "200px",
                }}
            > Select Attributes
            </button>
            <form className="dropdown-menu p-4">
                <div className="mb-3">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="dropdownCheck1" />
                        <label className="form-check-label" htmlFor="dropdownCheck1">Writing Intensive</label>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="dropdownCheck2"></input>
                        <label className="form-check-label" htmlFor="dropdownCheck2">GEP</label>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="dropdownCheck3"></input>
                        <label className="form-check-label" htmlFor="dropdownCheck3">GFR</label>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Dropdown;