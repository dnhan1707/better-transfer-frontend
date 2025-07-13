
export default function PairSelection({
    addNewPair,
    uniMajorPairs,
    updatePair,
    removePair,
    universities,
    majors,
    isCompact = false
}){
    const handleUniversityChange = (index, universityName) => {
        const university = universities.find(uni => uni.university_name === universityName);
        updatePair(index, { 
            ...uniMajorPairs[index], 
            university: universityName,
            university_id: university ? university.id : null
        });
    };

    const handleMajorChange = (index, majorName) => {
        const major = majors.find(maj => maj.major_name === majorName);
        updatePair(index, { 
            ...uniMajorPairs[index], 
            major: majorName,
            major_id: major ? major.id : null
        });
    };

    return (
        <div className="pair-selection">
            <label>Target Universities & Majors</label>
            
            {uniMajorPairs.map((pair, index) => (
                <div key={index} className="pair-row">
                    <div className="pair-inputs">
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

                        <select
                            value={pair.major || ""}
                            onChange={(e) => handleMajorChange(index, e.target.value)}
                            className="pair-select major-select"
                        >
                            <option value="">Select Major</option>
                            {majors.map((major, majorIndex) => (
                                <option key={majorIndex} value={major.major_name}>
                                    {major.major_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {uniMajorPairs.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removePair(index)}
                            className="remove-pair-btn"
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

                .pair-selection-section {
                    margin-bottom: 1.5rem;
                    font-family: 'Inter', sans-serif;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .section-title {
                    margin: 0;
                    font-size: 1rem;
                    font-weight: 500;
                    color: #1a1a1a;
                }

                .add-pair-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 0.75rem;
                    background: #ffffff;
                    border: 1px solid #d1d5db;
                    border-radius: 5px;
                    color: #374151;
                    font-size: 0.8rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .add-pair-btn:hover {
                    background: #f3f4f6;
                    border-color: #9ca3af;
                    transform: translateY(-1px);
                }

                .pairs-container {
                    max-height: 400px;
                    overflow-y: auto;
                    padding-right: 0.5rem;
                    margin-right: -0.5rem;
                }

                /* Custom scrollbar for pairs container */
                .pairs-container::-webkit-scrollbar {
                    width: 4px;
                }

                .pairs-container::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 2px;
                }

                .pairs-container::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 2px;
                }

                .pairs-container::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }

                .pair-item {
                    background: #f8f9fa;
                    border: 1px solid #e5e5e5;
                    border-radius: 6px;
                    padding: 1rem;
                    margin-bottom: 0.75rem;
                }

                .pair-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.75rem;
                }

                .pair-number {
                    font-size: 0.8rem;
                    font-weight: 500;
                    color: #666;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .remove-pair-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.25rem;
                    border-radius: 3px;
                    color: #ef4444;
                    transition: all 0.2s ease;
                }

                .remove-pair-btn:hover {
                    background: #fee2e2;
                    color: #dc2626;
                }

                .pair-inputs {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                }

                .input-label {
                    font-size: 0.8rem;
                    font-weight: 500;
                    color: #374151;
                    margin-bottom: 0.25rem;
                }

                .pair-select {
                    padding: 0.5rem;
                    border: 1px solid #d1d5db;
                    border-radius: 4px;
                    font-size: 0.85rem;
                    color: #1a1a1a;
                    background: #ffffff;
                    transition: all 0.2s ease;
                    font-family: 'Inter', sans-serif;
                }

                .pair-select:focus {
                    outline: none;
                    border-color: #6366f1;
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
                }

                .pair-select:hover {
                    border-color: #9ca3af;
                }

                @media (max-width: 768px) {
                    .section-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.5rem;
                    }

                    .add-pair-btn {
                        align-self: flex-end;
                    }

                    .pairs-container {
                        max-height: 350px;
                    }
                }
            `}</style>
        </div>
    );
}