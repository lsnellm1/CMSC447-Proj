"use client";

import 'bootstrap/dist/css/bootstrap.css'
import "../../styles/globals.css"
import "./searchbar.tsx"
import SearchBar from './searchbar.tsx'
  //needed to disable temp to run on prod server

//import NumberSpinner from './spinner.tsx';

export default function SearchPage() {
    return (
        <>
            <div className='top-bar'>
            </div>
            <div className='search-group min-vh-40 h-100 ml-2 fs-4'>
                <SearchBar
                    className='search mr-2 h-10 mt-1 ml-2 border-2 border grey'
                    defaultText='Class Name'
                    onSearch={function (searchTerm: string): void {
                        console.log(searchTerm);
                    }}
                    width='30'
                ></SearchBar>
                <SearchBar
                    className='subject mr-2 h-10 mt-1 ml-2 border-2 border grey'
                    defaultText='Subject'
                    onSearch={function (searchTerm: string): void {
                        console.log(searchTerm);
                    }}
                ></SearchBar>
            </div>
        </>
    )
}