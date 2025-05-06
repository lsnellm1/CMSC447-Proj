"use server";

import { getSession } from '@auth0/nextjs-auth0';
import { neon } from '@neondatabase/serverless';
import PlanSemester from '../features/search/SemesterPlanning'; // Ensure PlanSemester is a valid React component
// Removed unused import
let classes: any[] = [];






export default async function SearchPage() {
   
    const userData = await getSession();
    console.log(userData?.user.email);
    

    return (
        <>
            <PlanSemester email={userData?.user.email}   />
        </>
    );
}

