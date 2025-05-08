import { FC } from 'react';
import type { SearchResult } from './resultspage';

interface CourseCardProps {
    course: SearchResult;
    isDraggable?: boolean;
    onRemove?: () => void;
}

export const CourseCard: FC<CourseCardProps> = ({ 
    course, 
    isDraggable = false,
    onRemove 
}) => {
    return (
        <div
            className="list-group-item list-group-item-action"
            draggable={isDraggable}
            onDragStart={(e) => {
                // Ensure all course data is included in transfer
                e.dataTransfer.setData('course', JSON.stringify(course));
            }}
        >
            <div className="d-flex w-100 justify-content-between align-items-center">
                <h5 className="mb-1">
                    {course.subject} {course.catalog}: {course.name}
                </h5>
                <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-primary rounded-pill">
                        {course.units} units
                    </span>
                    {onRemove && (
                        <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={onRemove}
                            aria-label="Remove course"
                        >
                            ×
                        </button>
                    )}
                </div>
            </div>
            {(course.attributes?.length > 0 || course.prerequisites?.length) && (
                <div className="mt-2 d-flex flex-wrap gap-1">
                    {course.attributes?.map((attr, index) => (
                        <span
                            key={`attr-${index}`}
                            className="badge bg-secondary"
                        >
                            {attr}
                        </span>
                    ))}
                    {course.prerequisites?.map((prereq, index) => (
                        <span
                            key={`prereq-${index}`}
                            className="badge bg-warning text-dark"
                        >
                            Prereq: {prereq}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};