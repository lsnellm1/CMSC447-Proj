/* eslint-disable @next/next/no-sync-scripts */
"use client";

import 'bootstrap/dist/css/bootstrap.css'
import "../../styles/globals.css"
import Dropdown from './dropdown';
// import Dropdown from "./dropdown.tsx"
// import SearchBar from './searchbar.tsx'
//   //needed to disable temp to run on prod server

//import NumberSpinner from './spinner.tsx';
import "../../styles/globals.css"
import UMBCSHIELD from "../../../../public/imgs/UMBC-justSHIELD-color-for-black-backgrounds.png"
import Image from 'next/image';

export default function SearchPage() {
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
                    <span className='text-center'>Welcome User</span>
                    Sign out
                </div>

            </nav>

            <div className="container pt-5">
                <script src='https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js'></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js"></script>
                <div className='row'>
                    <div className='col-3 mb-3'>
                        <label htmlFor='class-name-input' className='form-label'>Class Name</label>
                        <input type='text' className='form-control' id='class-name-input'></input>
                    </div>

                    <div className='col-3 mb-3'>
                        <label htmlFor='subject-input' className='form-label'>Subject</label>
                        <select className='form-control form-select' id='subject-input'>
                            {/* This will need to be dynamic in the future */}
                            <option value={1}>CMSC - Computer Science</option>
                            <option value={2}>CMPE - Computer Engineering</option>
                            <option value={3}>MATH - Mathematics</option>
                        </select>
                    </div>

                    <div className='col mb-3'>
                        <label htmlFor="catalog-input" className='form-label'>Catalog #</label>
                        {/* TODO: Make sure that this works if non-numbers are entered */}
                        <input type='text' className='form-control' id='catalog-input'></input>
                    </div>

                    <div className='col mb-3'>
                        {/* TODO: This needs to revert to the closest number in the range when A higher/lower number is input into the box */}
                        {/* TODO: Some classes have variable amounts of units. How should this be dealt with? */}
                        <label htmlFor="units-input" className='form-label'>Units</label>
                        <input type='number' min={0} max={4} className='form-control' id='units-input'></input>
                    </div>

                    <div className='col-2 mb-3'>
                        <label htmlFor="attributes-input" className='form-label'>Attributes</label>
                        <Dropdown></Dropdown>
                    </div>
                    
                    <div className='col-2 mb-3'>
                        <label htmlFor="search-button" className='form-label'>&nbsp;</label>
                        <button 
                            type='button' 
                            className='btn btn-primary form-control' 
                            id='search-button' 
                            style={{
                                display: "block",
                            }}
                        >Search</button>
                    </div>
                </div>
            </div>
        </>
    )
}

