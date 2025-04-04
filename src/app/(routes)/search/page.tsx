"use client";

import 'bootstrap/dist/css/bootstrap.css'
import "../../styles/globals.css"
import "./searchbar.tsx"
import SearchBar from './searchbar.tsx'

export default function SearchPage() {
    return (
        <>
            <div className="search-container d-flex align-items-vertical px-8 py-3 min-vh-50">
                <div className="header rounded border border-2 w-100 fs-3 min-vh-30">
                    <div className="header-text px-2">
                        <h2>
                            Class Search
                            <SearchBar onSearch={function (searchTerm: string): void {
                                console.log(searchTerm);
                                throw new Error('Function not implemented.')
                            }}>
                            </SearchBar>
                        </h2>
                    </div>
                </div>

                <div className="search-box"></div>
            </div>
        </>
    )
}