"use client";
import { useState } from "react";

export const Dropdown = () => {
    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const attribute = event.target.value;
        const isChecked = event.target.checked;

        setSelectedAttributes(prev => 
            isChecked 
                ? [...prev, attribute]
                : prev.filter(attr => attr !== attribute)
        );
    };

    return (
        <div className="dropdown" id="attributes-input">
            <button 
                type="button" 
                className="btn btn-primary dropdown-toggle" 
                data-bs-toggle="dropdown" 
                aria-expanded="false" 
                data-bs-auto-close="outside"
                style={{
                    width: "175px",
                }}
            > Select Attributes
            </button>
            <form className="dropdown-menu p-3">
                <div className="mb-2">
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="dropdownCheck1"
                            value="Writing Intensive"
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="dropdownCheck1">Writing Intensive</label>
                    </div>
                </div>
                <div className="mb-2">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="dropdownCheck2"></input>
                        <label className="form-check-label" htmlFor="dropdownCheck2">GEP</label>
                    </div>
                </div>
                <div className="mb-2">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="dropdownCheck3"></input>
                        <label className="form-check-label" htmlFor="dropdownCheck3">GFR</label>
                    </div>
                </div>
            </form>
        </div>
    )
}

// Add this to access the selected attributes in handleSearch
// document.getElementById('attributes-input')?.getAttribute('data-selected-attributes')?.split(',')