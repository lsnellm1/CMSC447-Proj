"use client";
import { useState } from 'react';
import type { SearchResult } from './resultspage';
import { CourseCard } from './CourseCard';

interface CourseSlot {
    id: string;
    course: SearchResult | null;
}

interface Semester {
    id: string;
    name: string;
    slots: CourseSlot[];
}

export const SemesterPlanner = () => {
    const [semesters, setSemesters] = useState<Semester[]>([]);

    const addSemester = () => {
        const newSemester: Semester = {
            id: `semester-${Date.now()}`,
            name: `Semester ${semesters.length + 1}`,
            slots: [{ id: `slot-${Date.now()}`, course: null }]
        };
        setSemesters([...semesters, newSemester]);
    };

    const addSlot = (semesterId: string) => {
        setSemesters(semesters.map(semester => {
            if (semester.id === semesterId) {
                return {
                    ...semester,
                    slots: [...semester.slots, { id: `slot-${Date.now()}`, course: null }]
                };
            }
            return semester;
        }));
    };

    const removeSlot = (semesterId: string, slotId: string) => {
        setSemesters(semesters.map(semester => {
            if (semester.id === semesterId) {
                return {
                    ...semester,
                    slots: semester.slots.filter(slot => slot.id !== slotId)
                };
            }
            return semester;
        }));
    };

    const handleDrop = (semesterId: string, slotId: string, course: SearchResult) => {
        setSemesters(semesters.map(semester => {
            if (semester.id === semesterId) {
                return {
                    ...semester,
                    slots: semester.slots.map(slot => {
                        if (slot.id === slotId) {
                            return { ...slot, course };
                        }
                        return slot;
                    })
                };
            }
            return semester;
        }));
    };

    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-grow-1 overflow-auto">
                {semesters.map(semester => (
                    <div 
                        key={semester.id} 
                        className="card mb-3"
                    >
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">{semester.name}</h5>
                            <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => setSemesters(semesters.filter(s => s.id !== semester.id))}
                            >
                                Remove Semester
                            </button>
                        </div>
                        <div className="card-body">
                            {semester.slots.map(slot => (
                                <div 
                                    key={slot.id}
                                    className="border rounded p-2 mb-2"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        try {
                                            const courseData = JSON.parse(e.dataTransfer.getData('course'));
                                            handleDrop(semester.id, slot.id, courseData);
                                        } catch (error) {
                                            console.error('Failed to parse course data:', error);
                                        }
                                    }}
                                >
                                    <div className="d-flex align-items-start gap-2">
                                        <div className="flex-grow-1">
                                            {slot.course ? (
                                                <CourseCard 
                                                    course={slot.course}
                                                    onRemove={() => handleDrop(semester.id, slot.id, null)}
                                                />
                                            ) : (
                                                <div className="text-center text-muted">
                                                    Drop course here
                                                </div>
                                            )}
                                        </div>
                                        <div className="d-flex flex-column gap-2">
                                            <button 
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => removeSlot(semester.id, slot.id)}
                                                title="Remove slot"
                                            >
                                                Remove Slot
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button 
                                className="btn btn-sm btn-outline-primary w-100 mt-2"
                                onClick={() => addSlot(semester.id)}
                            >
                                Add Course Slot
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button 
                className="btn btn-primary w-100 mt-3"
                onClick={addSemester}
            >
                Add Semester
            </button>
        </div>
    );
};