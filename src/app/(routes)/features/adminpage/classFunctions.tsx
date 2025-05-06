'use server'
import 'bootstrap/dist/css/bootstrap.css'
import { neon } from '@neondatabase/serverless';


export async function getUserInfo(email:any){
    const sql = neon(`${process.env.DATABASE_URL}`);
    const classes = await sql`SELECT * FROM students WHERE email = ${email}`;
    return classes;
}

// Function to search for a class
export async function classAdd(className: string, classInstructor: string, classCredits: number, prerequisite: string[]) {
    const sql = neon(`${process.env.DATABASE_URL}`);

    for (const element of prerequisite) {
        console.log("element", element);
        const classLength = await sql`SELECT * FROM classes WHERE class_name = ${element}`;
        if (classLength.length === 0) {
            return false;
        }
    }
    if(prerequisite.length === 0) {
        prerequisite = ['0'];
    
    }
    await sql`INSERT INTO classes (class_name, class_credits, teacher_name, prerequisites) VALUES (${className}, ${classCredits}, ${classInstructor}, ${prerequisite})`;
    return true;
}

export async function sendAlert(email: string, alert: string) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    // Log the alert being sent
    const UserSearch = await sql`SELECT * FROM students WHERE email = ${email}`;
    console.log("UserSearch", UserSearch);

    if (UserSearch.length === 0) {
        return false;
    }

    await sql`UPDATE students SET alerts = ${alert} WHERE email = ${email}`;
    return true;
}

export async function sendRecommendation(email: string,recommendation: string[]) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    for (const element of recommendation) {
        console.log("element", element);
        const classLength = await sql`SELECT * FROM classes WHERE class_name = ${element}`;
        console.log("classLength", classLength);
        if (classLength.length === 0) {
            return false;
        }
    }
    const UserSearch = await sql`SELECT * FROM students WHERE email = ${email}`;
    if (UserSearch.length === 0) {
        return false;
    }
    await sql`UPDATE students SET class_recommendations = ${recommendation} WHERE email = ${email}`;
    return true;
}

export async function deleteClassById(classId: number) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    await sql`DELETE FROM classes WHERE class_id = ${classId}`;
    return true;
}
