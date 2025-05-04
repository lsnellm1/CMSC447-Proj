"use client";
import { FC } from 'react';
import { CourseCard } from './CourseCard';

export interface SearchResult {
    id: number;
    subject: string;
    catalog: string;
    name: string;
    units: number;
    attributes: string[];
    prerequisites?: string[];
}

interface ResultsPageProps {
    isLoading: boolean;
    results: SearchResult[];
    hasSearched?: boolean;
}

export const ResultsPage: FC<ResultsPageProps> = ({ isLoading, results, hasSearched = false }) => {
    return (
        <div className='row mt-4'>
            <div className='col-12'>
                <h2 className='mb-3'>Search Results</h2>
                {isLoading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : hasSearched ? (
                    results.length > 0 ? (
                        <div className="list-group">
                            {results.map((result) => (
                                <CourseCard 
                                    key={result.id}
                                    course={result}
                                    isDraggable={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            No results found. Try adjusting your search criteria.
                        </div>
                    )
                ) : null}
            </div>
        </div>
    );
};