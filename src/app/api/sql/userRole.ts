import { neon } from '@neondatabase/serverless';
import { Session } from '@auth0/nextjs-auth0';
const gradeStatus = ["Freshman", "Sophomore", "Junior", "Senior"];





export default async function createUser(session: Session) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const gpa:number = 3.5 + Math.random() * (4 - 3.5);
    const creditsTaken:number = Math.floor(Math.random() * 120) + 20;
    const creditsNeeded:number = 120 - creditsTaken;
    const userResult = await sql`SELECT * FROM students`;
    const email:string = session.user.email;
    const student_name:string = session.user.name;
    const current_status:string = gradeStatus[Math.floor(creditsTaken / 30)];
    const umbc_id:string = "TEST";
    const student_id:number = userResult.length + 1;

    const counselors = await sql`SELECT * FROM counselors`;
    const randomIndex = Math.floor(Math.random() * counselors.length) + 1;
    const counselor = counselors[randomIndex - 1];
    const counselor_id:number = counselor.counselor_id;
    await sql`INSERT INTO students (student_id, email, gpa, current_status, total_credits, umbc_id, credits_left, student_name, counselor_id) 
    VALUES (${student_id}, ${email}, ${gpa}, ${current_status}, ${creditsTaken}, ${umbc_id}, ${creditsNeeded}, ${student_name}, ${counselor_id})`;
    
}