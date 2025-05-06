'use server'
import 'bootstrap/dist/css/bootstrap.css'
import { neon } from '@neondatabase/serverless';




function searchForClasses(classes: any[], input: string) {

    const searchValue = input.toLowerCase();
    let filteredClasses = new Array<any>();
    classes.forEach((element) => {
        console.log("Class Name: ", element.class_name);
        console.log("Search Value: ", searchValue);
        if(isAlmostMatch(element.class_name.toLowerCase(), searchValue)) {
            filteredClasses.push(element);
        }
    });

    // Return the filtered classes
    return filteredClasses;
}

function isAlmostMatch(text: string, searchValue: string): boolean {
    const maxMismatches = 2; // Allow up to 2 mismatched characters

    if (searchValue.length <= 2) {
        return false; // Avoid matching for very short search values
    }

    let mismatchCount = 0;
    let i = 0, j = 0;

    while (i < text.length && j < searchValue.length) {
        if (text[i] !== searchValue[j]) {
            mismatchCount++;
            if (mismatchCount > maxMismatches) {
                return false;
            }
        } else {
            j++; // Only advance the searchValue index on a match
        }
        i++;
    }

    // Ensure the entire searchValue was processed
    return j === searchValue.length;
}

async function GetClasses() {    

    const sql = neon(`${process.env.DATABASE_URL}`);
    const classes = await sql`SELECT * FROM classes`;
    return classes;
}


export default async function classSearch(input: string) {

    const classes = await GetClasses();
    return await searchForClasses(classes, input);;
}
