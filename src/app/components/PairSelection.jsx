'use client'

import { useEffect, useState } from "react";
import { fetchingMajorList } from "../service/fetchingFunctions";


export default function PairSelection({
    addNewPair,
    uniMajorPairs,
    updatePair,
    removePair,
    universities,
    chosenCollege,
    isCompact = false
}){
    const [pairMajors, setPairMajors] = useState({}); // Store majors for each pair
    const [loadingMajors, setLoadingMajors] = useState({}); // Track loading state

    const handleUniversityChange = async (index, universityName) => {
        const university = universities.find(uni => uni.university_name === universityName);
        updatePair(index, { 
            ...uniMajorPairs[index], 
            university: universityName,
            university_id: university ? university.id : null,
            major: "",  // reset major when uni changes
            major_id: null
        });

        if (university && chosenCollege?.id) {
            await fetchMajorsForPair(index, university.id, chosenCollege.id)
        } else {
            setPairMajors(prev => ({
                ...prev,
                [index]: []
            }))
        }
    };
    

    const handleMajorChange = (index, majorName) => {
        const currentPairMajors = pairMajors[index] || []
        const major = currentPairMajors.find(maj => maj.major_name === majorName)

        updatePair(index, { 
            ...uniMajorPairs[index], 
            major: majorName,
            major_id: major ? major.major_id : null
        });
    };

    const fetchMajorsForPair = async (pairIndex, universityId, collegeId) => {
        try {
            setLoadingMajors(prev => ({...prev, [pairIndex]: true}));
            const majors = await fetchingMajorList(universityId, collegeId)

            setPairMajors(prev => ({
                ...prev,
                [pairIndex]: majors
            }));
        } catch (error) {
            console.error(`Error fetching majors for pair ${pairIndex}:`, error)
            setPairMajors(prev => ({
                ...prev,
                [pairIndex]: []
            }))
        } finally {
            setLoadingMajors(prev => ({...prev, [pairIndex]: false}))
        }
    }

    // Effect to fetch majors when college changes for existing university selections
    useEffect(() => {   
        if (chosenCollege?.id) {
            uniMajorPairs.forEach((pair, index) => {
                if (pair.university_id && !pairMajors[index]) {
                    fetchMajorsForPair(index, pair.university_id, chosenCollege.id)
                }
            });
        } else {
            setPairMajors({});
        }

    }, [chosenCollege?.id])


    const canSelectMajor = (index) => {
        const pair = uniMajorPairs[index];
        return pair?.university_id && chosenCollege?.id;
    };

    const getMajorOptions = (index) => {
        return pairMajors[index] || [];
    };

    const isMajorLoading = (index) => {
        return loadingMajors[index] || false;
    };


    return (
        <div className="pair-selection">
            <label>Target Universities & Majors</label>
            
            {uniMajorPairs.map((pair, index) => (
                <div key={index} className="pair-row">
                    <div className="pair-inputs">
                        <div className="input-group">
                            <label className="input-label">University</label>
                            <select
                                value={pair.university || ""}
                                onChange={(e) => handleUniversityChange(index, e.target.value)}
                                className="pair-select university-select"
                            >
                                <option value="">Select University</option>
                                {universities.map((uni, uniIndex) => (
                                    <option key={uniIndex} value={uni.university_name}>
                                        {uni.university_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="input-group">
                            <label className="input-label">Major</label>
                            <select
                                value={pair.major || ""}
                                onChange={(e) => handleMajorChange(index, e.target.value)}
                                className="pair-select major-select"
                                disabled={!canSelectMajor(index)}
                            >
                                <option value="">
                                    {!chosenCollege ? "Select college first" :
                                     !pair.university ? "Select university first" :
                                     isMajorLoading(index) ? "Loading majors..." :
                                     "Select Major"}
                                </option>
                                {getMajorOptions(index).map((major, majorIndex) => (
                                    <option key={majorIndex} value={major.major_name}>
                                        {major.major_name}
                                    </option>
                                ))}
                            </select>
                            {isMajorLoading(index) && (
                                <div className="loading-indicator">
                                    <span className="loading-spinner"></span>
                                    Loading majors...
                                </div>
                            )}
                        </div>
                    </div>

                    {uniMajorPairs.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removePair(index)}
                            className="remove-pair-btn"
                            title="Remove this pair"
                        >
                            ×
                        </button>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={addNewPair}
                className="add-pair-btn"
            >
                + Add Another Combination
            </button>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

                .pair-selection {
                    margin-bottom: 2rem;
                    font-family: 'Inter', sans-serif;
                }

                .pair-selection > label {
                    display: block;
                    font-weight: 500;
                    margin-bottom: 1rem;
                    color: #2c3e50;
                    font-size: 1rem;
                }

                .pair-row {
                    background: #f8f9fa;
                    border: 1px solid #e5e5e5;
                    border-radius: 8px;
                    padding: 1.5rem;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                }

                .pair-inputs {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                }

                .input-label {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #374151;
                    margin-bottom: 0.5rem;
                }

                .pair-select {
                    padding: 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    font-size: 0.875rem;
                    color: #1a1a1a;
                    background: #ffffff;
                    transition: all 0.2s ease;
                    font-family: 'Inter', sans-serif;
                }

                .pair-select:focus {
                    outline: none;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }

                .pair-select:hover:not(:disabled) {
                    border-color: #9ca3af;
                }

                .pair-select:disabled {
                    background: #f9fafb;
                    color: #9ca3af;
                    cursor: not-allowed;
                    border-color: #e5e7eb;
                }

                .loading-indicator {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                    font-size: 0.75rem;
                    color: #6b7280;
                }

                .loading-spinner {
                    width: 12px;
                    height: 12px;
                    border: 2px solid #f3f4f6;
                    border-top: 2px solid #3b82f6;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                .remove-pair-btn {
                    background: #ef4444;
                    color: white;
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: all 0.2s ease;
                }

                .remove-pair-btn:hover {
                    background: #dc2626;
                    transform: scale(1.05);
                }

                .add-pair-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1rem;
                    background: #ffffff;
                    border: 2px dashed #d1d5db;
                    border-radius: 8px;
                    color: #374151;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    width: 100%;
                }

                .add-pair-btn:hover {
                    background: #f9fafb;
                    border-color: #9ca3af;
                    color: #1f2937;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @media (max-width: 768px) {
                    .pair-row {
                        flex-direction: column;
                        padding: 1.25rem;
                    }

                    .pair-inputs {
                        gap: 0.75rem;
                    }

                    .remove-pair-btn {
                        align-self: center;
                    }
                }
            `}</style>
        </div>
    );
}