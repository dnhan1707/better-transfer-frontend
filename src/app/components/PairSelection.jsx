import { useState } from 'react';

export default function PairSelection({
    addNewPair,
    uniMajorPairs,
    updatePair,
    removePair,
    universities,
    majors,
    isCompact = false
}) {
    return (
        <div className="pair-selection-section">
            <div className="section-header">
                <h3 className="section-title">Target Universities & Majors</h3>
                <button className="add-pair-btn" onClick={addNewPair}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14"/>
                    </svg>
                    Add Option
                </button>
            </div>
            
            <div className="pairs-container">
                {uniMajorPairs.map((pair, index) => (
                    <div key={index} className="pair-item">
                        <div className="pair-header">
                            <span className="pair-number">Option {index + 1}</span>
                            {uniMajorPairs.length > 1 && (
                                <button 
                                    className="remove-pair-btn"
                                    onClick={() => removePair(index)}
                                    title="Remove this option"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 6L6 18M6 6l12 12"/>
                                    </svg>
                                </button>
                            )}
                        </div>
                        
                        <div className="pair-inputs">
                            <div className="input-group">
                                <label className="input-label">University</label>
                                <select
                                    value={pair.university || ''}
                                    onChange={(e) => updatePair(index, { ...pair, university: e.target.value })}
                                    className="pair-select"
                                >
                                    <option value="">Select University</option>
                                    {universities.map((uni, uniIndex) => (
                                        <option key={uniIndex} value={uni}>{uni}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="input-group">
                                <label className="input-label">Major</label>
                                <select
                                    value={pair.major || ''}
                                    onChange={(e) => updatePair(index, { ...pair, major: e.target.value })}
                                    className="pair-select"
                                >
                                    <option value="">Select Major</option>
                                    {majors.map((major, majorIndex) => (
                                        <option key={majorIndex} value={major}>{major}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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