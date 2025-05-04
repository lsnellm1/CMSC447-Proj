/* eslint-disable @next/next/no-sync-scripts */
"use client";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import "../../styles/globals.css"
import { Dropdown } from './dropdown';
import { ResultsPage, type SearchResult } from './resultspage';
import { SemesterPlanner } from './semesterplanner';
// import Dropdown from "./dropdown.tsx"
// import SearchBar from './searchbar.tsx'
//   //needed to disable temp to run on prod server

//import NumberSpinner from './spinner.tsx';
import "../../styles/globals.css"
import UMBCSHIELD from "../../../../public/imgs/UMBC-justSHIELD-color-for-black-backgrounds.png"
import Image from 'next/image';

/*
interface SearchParams {
    className: string;
    subject: string;
    catalog: string;
    units: number;
    attributes: string[];
}
*/

export default function SearchPage() {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {
        // 1. Get form values
        const className = (document.getElementById('class-name-input') as HTMLInputElement).value;
        const subject = (document.getElementById('subject-input') as HTMLSelectElement).value;
        const catalogNumber = (document.getElementById('catalog-input') as HTMLInputElement).value;
        const units = parseInt((document.getElementById('units-input') as HTMLInputElement).value);
        const attrs = document.getElementById('attributes-input')?.getAttribute('data-selected-attributes')?.split(',');
        
        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    className,
                    subject,
                    catalogNumber,
                    units,
                    attributes: attrs // Include attributes in the search
                })
            });

            if (!response.ok) {
                throw new Error(`Search failed: ${response.statusText}`);
            }

            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Search failed:', error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
            setHasSearched(true);
        }
    };

    return (
        <>
            <nav className="navbar bg-body-tertiary" style={{ backgroundColor: "gray" }} >
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
                    <span className='text-center'>Welcome User</span>
                    Sign out
                </div>

            </nav>

            <div className="container-fluid pt-3"
                style={{
                    paddingTop: "5px",
                    paddingLeft: "20px",
                }}>
                <script src='https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js'></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js"></script>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='row' style={{ paddingLeft: "10px", paddingBottom: "15px" }}>
                            <label htmlFor='class-name-input' className='form-label' style={{ paddingLeft: "0px" }}>Class Name</label>
                            <input type='text' className='form-control' id='class-name-input'></input>
                        </div>
                        <div className='row'>
                            <div className='col-md-3 mb-3'>
                                <label htmlFor='subject-input' className='form-label'>Subject</label>
                                <select className='form-control form-select' id='subject-input'>
                                    {/* This will need to be dynamic in the future */}
                                    <option value={1}>CMSC - Computer Science</option>
                                    <option value={2}>CMPE - Computer Engineering</option>
                                    <option value={3}>MATH - Mathematics</option>
                                </select>
                            </div>

                            <div className='col-md-2 mb-3'>
                                <label htmlFor="catalog-input" className='form-label'>Catalog #</label>
                                {/* TODO: Make sure that this works if non-numbers are entered */}
                                <input type='text' className='form-control' id='catalog-input'></input>
                            </div>

                            <div className='col-md-2 mb-3'>
                                {/* TODO: This needs to revert to the closest number in the range when A higher/lower number is input into the box */}
                                {/* TODO: Some classes have variable amounts of units. How should this be dealt with? */}
                                <label htmlFor="units-input" className='form-label'>Units</label>
                                <input type='number' min={0} max={4} className='form-control' id='units-input'></input>
                            </div>

                            <div className='col-md-3 mb-3'>
                                <label htmlFor="attributes-input" className='form-label'>Attributes</label>
                                <Dropdown></Dropdown>
                            </div>

                            <div className='col-md-2 mb-3'>
                                <label htmlFor="search-button" className='form-label'>&nbsp;</label>
                                <button
                                    type='button'
                                    className='btn btn-primary form-control'
                                    id='search-button'
                                    onClick={handleSearch}
                                    style={{
                                        display: "block",
                                    }}
                                >Search</button>
                            </div>
                        </div>
                        <div className='row'>
                            <ResultsPage
                                isLoading={isLoading}
                                results={searchResults}
                                hasSearched={hasSearched}
                            />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className="sticky-top pt-3">
                            <SemesterPlanner/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

