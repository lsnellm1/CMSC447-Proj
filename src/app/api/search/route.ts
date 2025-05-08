import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { className, subject, catalogNumber, units } = body;

        const mockResults = [
            {
                id: 1,
                subject: "CMSC",
                catalog: "447",
                name: "Software Engineering I",
                units: 3,
                attributes: ["Writing Intensive"],
                prerequisites: ["CMSC 341", "CMSC 313"]
            },
            {
                id: 2,
                subject: "CMSC",
                catalog: "341",
                name: "Data Structures",
                units: 3,
                attributes: [],
                prerequisites: ["CMSC 203", "MATH 152"]
            }
        ];

        await new Promise(resolve => setTimeout(resolve, 500));
        return NextResponse.json(mockResults);
    } catch (error) {
        console.error('Search failed:', error);
        return NextResponse.json(
            { error: 'Failed to process search request' }, 
            { status: 500 }
        );
    }
}